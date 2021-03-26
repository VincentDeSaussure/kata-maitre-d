import Type from '../type/Type'
import { Unit } from '../unit/Unit'
import { DISCOUNT_TYPES } from '../../constants/DISCOUNT_TYPES'
import { Amount } from '../amount/Amount'
import Scale from '../scale/Scale'
import { ISlice } from '../scale/Slice'

export interface Strategy {
    type: Type
    unit: Unit
    value: any
    maxDiscount: number
}

export class StrategySimple implements Strategy {
    static type: Type = new Type(DISCOUNT_TYPES.SIMPLE)

    constructor(readonly amount: Amount, public readonly unit: Unit) {
    }

    get maxDiscount() {
        return this.amount.value
    }

    get value() {
        return this.amount.value
    }

    readonly type: Type = new Type(DISCOUNT_TYPES.SIMPLE)
}

export class StrategyOnRevenue implements Strategy {
    static type: Type = new Type(DISCOUNT_TYPES.ON_REVENUE)

    constructor(private readonly scale: Scale, public readonly unit: Unit) {
    }

    get maxDiscount() {
        return this.scale.highestDiscount
    }

    get value() {
        return this.scale.value
    }

    readonly type: Type = new Type(DISCOUNT_TYPES.ON_REVENUE)
}

export class StrategyQuantitative implements Strategy {
    static type: Type = new Type(DISCOUNT_TYPES.QUANTITATIVE)

    constructor(private readonly scale: Scale, public readonly unit: Unit) {
    }

    get maxDiscount() {
        return this.scale.highestDiscount
    }

    get value() {
        return this.scale.value
    }

    readonly type: Type = new Type(DISCOUNT_TYPES.QUANTITATIVE)
}

export const strategyBuilder = (scaleProps: ISlice[] | null, amountProps: number | null, type: Type, unit: Unit): Strategy => {
    if (StrategyOnRevenue.type.equal(type)) {
        const scale = new Scale(scaleProps, unit)
        return new StrategyOnRevenue(scale, unit)
    }
    if (StrategyQuantitative.type.equal(type)) {
        const scale = new Scale(scaleProps, unit)
        return new StrategyQuantitative(scale, unit)
    }
    if (StrategySimple.type.equal(type)) {
        const amount = new Amount(amountProps, unit)
        return new StrategySimple(amount, unit)
    }
    throw new Error('something bad with strategy')
}
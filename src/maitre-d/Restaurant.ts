import { Table } from '../../test/réserver-à-Haute-Cuisine.test'

export class Restaurant {
    constructor(public readonly nom: string, public readonly tables: Table[]) {
    }

    public capacitéTotal(): number {
        return this.tables.reduce((capacitéTotal, table) => capacitéTotal + table.capacité, 0)
    }

    public tablePour(capacité: number): number {
        return this.tables.filter(table => table.capacité >= capacité).length
    }
}
import { Table } from './Table'
import { Restaurant } from './Restaurant'
import { AjouteRestaurantCommand } from '../test/ajouter-un-restaurant.test'

export abstract class Évènement {
    constructor(public readonly date: string) {
    }
}

export class RéservationAcceptée extends Évènement{
    constructor(public readonly nombreDePersonne: number, date: string) {
        super(date)
    }
}

export class RéservationRejetée extends Évènement {
    constructor(public readonly nombreDePersonne: number, date: string) {
        super(date)
    }
}

export class DemandeDeRéservation {
    constructor(public readonly nombreDePersonne: number, public readonly date: string) {
    }
}

export class RestaurantStore {
    constructor(private readonly évènements: Évènement[]) {}

    public le(date: string): RéservationAcceptée[] {
        // @ts-ignore
        return this.évènements
            .filter(réservation => réservation.date === date && réservation instanceof RéservationAcceptée)
    }

    public enregistre(réservation: Évènement) {
        this.évènements.push(réservation)
    }

    public dernierÉvènement(): Évènement {
        return this.évènements[this.évènements.length - 1]
    }
}

export class RestaurantAjouté extends Évènement {
    constructor(public readonly tables: number[], public readonly nom: string) {
        super('today')
    }

}

export class MaitreD {
    private readonly tables: Table[]

    constructor(tables: number[], private readonly réservationStore: RestaurantStore) {
        this.tables = tables.map(table => new Table(table))
    }

    peutAccepter(demandeDeRéservation: DemandeDeRéservation) {
        const réservations = this.réservationStore.le(demandeDeRéservation.date)
        const restaurant = Restaurant.créer(this.tables, réservations)
        this.réservationStore.enregistre(
            restaurant.peutAccepter(demandeDeRéservation.nombreDePersonne) ?
            new RéservationAcceptée(demandeDeRéservation.nombreDePersonne, demandeDeRéservation.date) :
            new RéservationRejetée(demandeDeRéservation.nombreDePersonne, demandeDeRéservation.date)
        )
    }

    ajoute(command: AjouteRestaurantCommand) {
        this.réservationStore.enregistre(new RestaurantAjouté(command.tables, command.nom))
    }
}
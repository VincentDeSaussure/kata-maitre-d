import { Table } from './Table'
import { RéservationAcceptée, Évènement } from './MaitreD'

export class Restaurant {
    constructor(public readonly capacité: number) {
    }

    static créer(tables: Table[], réservations: RéservationAcceptée[]) {
        return new Restaurant(
            tables[0].capacité - réservations.reduce((a, réservation) => a + réservation.nombreDePersonne, 0)
        )
    }

    peutAccepter(nombreDePersonne: number) {
        return nombreDePersonne >= 0
    }
}
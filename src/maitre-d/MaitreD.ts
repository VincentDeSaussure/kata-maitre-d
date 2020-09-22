import { Restaurant } from './Restaurant'
import { TablePartagé } from '../../test/réserver-à-Haute-Cuisine.test'

export class Réservation {
    constructor(public readonly nombreDePersonne: number, public readonly date: string) {
    }
}

export class DemandeDeRéservation {
    constructor(public readonly nombreDePersonne: number, public readonly date: string) {
    }
}

export class Réservations {
    constructor(public readonly liste: Réservation[]) {}

    le(date: string): Réservations {
        return new Réservations(this.liste.filter(réservation => réservation.date === date))
    }

    pour(nombreDePersonne: number): Réservations {
        return new Réservations(this.liste.filter(réservation => réservation.nombreDePersonne >= nombreDePersonne))
    }

    get résultat(): Réservation[] {
        return this.liste
    }
}

export class MaitreD {
    constructor(public readonly restaurant: Restaurant, public readonly réservations: Réservations) {
    }

    peutAccepter(demandeDeRéservation: DemandeDeRéservation): boolean {
        const nombreDeTableParAuNombreDePersonne = this.restaurant.tablePour(demandeDeRéservation.nombreDePersonne)
        if (this.restaurant.tables[0] instanceof TablePartagé) {
            return this.réservations
                    .le(demandeDeRéservation.date).résultat
                    .reduce((total, reservation) => total + reservation.nombreDePersonne, 0) + demandeDeRéservation.nombreDePersonne
                <= this.restaurant.capacitéTotal()
        } else {
            return this.tableLibrePour(demandeDeRéservation.nombreDePersonne, demandeDeRéservation.date)
        }
    }

    private tableLibrePour(nombreDePersonne: number, date: string): boolean {
        return Boolean(this.restaurant.tablePour(nombreDePersonne) - this.réservations
                .le(date)
                .pour(nombreDePersonne)
                .résultat
                .length > 0)
    }

    private consulteLesRéservationsLe(date: string, réservations: Réservation[]) : Réservation[] {
        return réservations.filter(réservation => réservation.date === date)
    }
}
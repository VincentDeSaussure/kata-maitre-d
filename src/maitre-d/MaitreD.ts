import { Restaurant } from './Restaurant'

export class Réservation {
    constructor(public readonly nombreDePersonne: number, public readonly date: string) {
    }
}

export class DemandeDeRéservation {
    constructor(public readonly nombreDePersonne: number, public readonly date: string) {
    }
}

export class MaitreD {
    constructor(public readonly restaurant: Restaurant) {
    }

    peutAccepter(demandeDeRéservation: DemandeDeRéservation, réservations: Réservation[]): boolean {
        if (demandeDeRéservation.nombreDePersonne > this.restaurant.capacité) {
            return false
        }
        return réservations
                .filter(reservation => reservation.date === demandeDeRéservation.date)
                .reduce((total, reservation) => total + reservation.nombreDePersonne, 0) + demandeDeRéservation.nombreDePersonne
            <= this.restaurant.capacité
    }
}
import { DEMANDE_DE_RESERVATION, RestaurantName, RÉSERVATION_ACCEPTÉE, RÉSERVATION_REFUSÉE } from './constantes'

export interface Evènement {
    name: string
}

export interface Command {}

export class DemandeDeRéservation implements Command {
    public name:  string = DEMANDE_DE_RESERVATION
    public à: RestaurantName = 'La boutique'
    constructor(public readonly pour: number) {}
}

export class RéservationAccepté implements Evènement {
    name = RÉSERVATION_ACCEPTÉE

    constructor(public readonly pour: number) {
    }
}

export class RéservationRejeté implements Evènement {
    name = RÉSERVATION_REFUSÉE
}
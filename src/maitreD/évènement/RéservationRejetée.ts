import { Évènement } from '../Evénement'

export class RéservationRejetée extends Évènement {
    constructor(public readonly nombreDePersonne: number, date: string, nomDuRestaurant: string) {
        super(date, nomDuRestaurant)
    }
}
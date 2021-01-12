import { Évènement } from '../Evénement'

export class RéservationAcceptée extends Évènement {
    constructor(public readonly nombreDePersonne: number, date: string, nomDuRestaurant: string) {
        super(date, nomDuRestaurant)
    }
}
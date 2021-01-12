import { Évènement } from '../Evénement'

export class RestaurantAjouté extends Évènement {
    constructor(public readonly tables: number[], nom: string) {
        super('today', nom)
    }
}
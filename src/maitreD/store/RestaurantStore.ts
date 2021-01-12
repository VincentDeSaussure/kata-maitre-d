import { Restaurant } from '../Restaurant'
import { Évènement } from '../Evénement'

export class RestaurantStore {
    constructor(private readonly évènements: Évènement[]) {
    }

    public par(nom: string, date: string): Restaurant {
        const événements = this.évènements.filter(évènement => évènement.nomDuRestaurant === nom)
        return Restaurant.depuis(événements, date)
    }

    public enregistre(évènement: Évènement) {
        this.évènements.push(évènement)
    }

    public dernierÉvènement(): Évènement {
        return this.évènements[this.évènements.length - 1]
    }
}
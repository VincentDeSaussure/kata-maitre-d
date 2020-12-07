import { Restaurant } from './Restaurant'
import { Évènement } from './MaitreD'

export class RestaurantStore {
    constructor(private readonly évènements: Évènement[]) {
    }

    public par(nom: string): Évènement[] {
        return this.évènements
            .filter(évènement => évènement.nomDuRestaurant === nom)
    }

    public enregistre(évènement: Évènement) {
        this.évènements.push(évènement)
    }

    public dernierÉvènement(): Évènement {
        return this.évènements[this.évènements.length - 1]
    }

    retrieve(nom: string, date: string) {
        const évènements = this.évènements
            .filter(évènement => évènement.nomDuRestaurant === nom)
            .filter(évènement => évènement.date === 'today' || évènement.date === date)
        return Restaurant.depuisLesÉvènements(évènements)
    }
}
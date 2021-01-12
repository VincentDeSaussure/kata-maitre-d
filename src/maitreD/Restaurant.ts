import { RestaurantAjouté } from './évènement/RestaurantAjouté'
import { Évènement } from './Evénement'
import { RéservationAcceptée } from './évènement/RéservationAcceptée'
import { RéservationRejetée } from './évènement/RéservationRejetée'

export class Restaurant {
    constructor(public readonly capacité: number) {
    }

    static depuis(évènements: Évènement[], date: string) {
        let couvertsTotal = 0
        let couvertsRéservés = 0
        évènements.forEach(évènement => {
            if (évènement instanceof RestaurantAjouté) {
                couvertsTotal = évènement.tables.reduce((a, table) => a + table, 0)
            }
            if (évènement instanceof RéservationAcceptée && évènement.date === date) {
                couvertsRéservés += évènement.nombreDePersonne
            }
        })
        const capacité = couvertsTotal - couvertsRéservés
        return new Restaurant(
            capacité
        )
    }

    réserver(nombreDePersonne: number, date: string, nomDuRestaurant: string): RéservationAcceptée | RéservationRejetée {
        return this.capacité >= nombreDePersonne ?
            new RéservationAcceptée(
                nombreDePersonne,
                date,
                nomDuRestaurant
            ) :
            new RéservationRejetée(
                nombreDePersonne,
                date,
                nomDuRestaurant
            )
    }
}
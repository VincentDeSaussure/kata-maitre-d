import { RestaurantAjouté, RéservationAcceptée, Évènement } from './MaitreD'

const couvertsRéservés = (réservations) => {
   return réservations.reduce((a, réservation) => a + réservation.nombreDePersonne, 0)
}

export class Restaurant {
    constructor(public readonly capacité: number, public readonly nom: string) {
    }

    static depuisLesÉvènements(réservations: Évènement[]) {
        let couvertsTotal = 0
        let couvertsRéservés = 0
        réservations.forEach(évènement => {
            if (évènement instanceof RestaurantAjouté) {
                couvertsTotal = évènement.tables.reduce((a, table) => a + table, 0)
            }
            if (évènement instanceof RéservationAcceptée) {
                couvertsRéservés += évènement.nombreDePersonne
            }
        })
        const capacité = couvertsTotal - couvertsRéservés
        const nom = 'La boutique'
        return new Restaurant(
            capacité,
            nom
        )
    }

    peutAccepter(nombreDePersonne: number) {
        return this.capacité >= nombreDePersonne
    }
}
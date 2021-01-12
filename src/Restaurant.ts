import { RestaurantAjouté, RéservationAcceptée, RéservationRejetée, Évènement } from './MaitreD'

export class Restaurant {
    constructor(public readonly capacité: number, public readonly nom: string) {
    }

    static depuis(évènements: Évènement[], nom: string) {
        let couvertsTotal = 0
        let couvertsRéservés = 0
        évènements.forEach(évènement => {
            if (évènement instanceof RestaurantAjouté) {
                couvertsTotal = évènement.tables.reduce((a, table) => a + table, 0)
            }
            if (évènement instanceof RéservationAcceptée) {
                couvertsRéservés += évènement.nombreDePersonne
            }
        })
        const capacité = couvertsTotal - couvertsRéservés
        return new Restaurant(
            capacité,
            nom
        )
    }

    peutAccepter(demandeDeRéservation): RéservationAcceptée | RéservationRejetée {
        return this.capacité >= demandeDeRéservation.nombreDePersonne ?
            new RéservationAcceptée(
                demandeDeRéservation.nombreDePersonne,
                demandeDeRéservation.date,
                demandeDeRéservation.nomDuRestaurant) :
            new RéservationAcceptée(
            demandeDeRéservation.nombreDePersonne,
            demandeDeRéservation.date,
            demandeDeRéservation.nomDuRestaurant)
    }
}
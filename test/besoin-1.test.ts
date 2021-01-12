import {
    DemandeDeRéservation,
    MaitreD, RestaurantAjouté,
    RéservationAcceptée,
    RéservationRejetée
} from '../src/MaitreD'
import { RestaurantStore } from '../src/RestaurantStore'
import { Table } from '../src/Table'

describe('Besoin 1 : Maître d‘hôtel', () => {

    const nomDuRestaurant = 'La boutique'
    let maitreD

    describe('avec une table partagée pour douze personnes', () => {
        it('la demande est pour douze personnes, le 2024-06-07 = Réservation acceptée', () => {
            const restaurantStore = new RestaurantStore([
                new RestaurantAjouté([12], 'La boutique'),
            ])
            maitreD = new MaitreD([12], restaurantStore)
            maitreD.peutAccepter(
                new DemandeDeRéservation(12, '2024-06-07', nomDuRestaurant)
            )
            expect(restaurantStore.dernierÉvènement()).toBeInstanceOf(RéservationAcceptée)
        })
        it('la demande est pour treize personnes, le 2024-06-07 = Réservation rejetée', () => {
            const restaurantStore = new RestaurantStore([
                new RestaurantAjouté([12], 'La boutique')
            ])
            maitreD = new MaitreD([12], restaurantStore)
            maitreD.peutAccepter(
                new DemandeDeRéservation(13, '2024-06-07', nomDuRestaurant)
            )
            expect(restaurantStore.dernierÉvènement()).toBeInstanceOf(RéservationRejetée)
        })
    })

    describe('avec une table partagée pour quatre personnes', () => {

        describe('avec une réservations enregistré de trois personnes, par 2024-06-07', () => {
            it('la demande est pour deux personnes, le 2024-06-07 = Réservation rejetée', () => {
                const réservationStore = new RestaurantStore([
                    new RestaurantAjouté([4], 'La boutique'),
                    new RéservationAcceptée(3, '2024-06-07', nomDuRestaurant)
                ])
                maitreD = new MaitreD([4], réservationStore)
                maitreD.peutAccepter(
                    new DemandeDeRéservation(2, '2024-06-07', nomDuRestaurant)
                )
                expect(réservationStore.dernierÉvènement()).toBeInstanceOf(RéservationRejetée)
            })
        })
    })

    describe('avec une table partagée pour dix personnes', () => {
        describe('avec une réservations de deux personnes, par 2024-06-07', () => {
            it('la demande est pour 3 personnes, le 2024-06-07 = Réservation acceptée', () => {
                const réservationStore = new RestaurantStore([
                    new RestaurantAjouté([10], 'La boutique'),
                    new RéservationAcceptée(2, '2024-06-07', nomDuRestaurant)
                ])
                maitreD = new MaitreD([10], réservationStore)
                maitreD.peutAccepter(
                    new DemandeDeRéservation(3, '2024-06-07', nomDuRestaurant)
                )
                expect(
                    réservationStore.dernierÉvènement()
                ).toBeInstanceOf(RéservationAcceptée)
            })
        })
        describe('avec des réservations tel que :' +
            'trois personnes, par 2024-06-07,' +
            'deux personnes, par 2024-06-07,' +
            'trois personnes, par 2024-06-07', () => {
            it('la demande est pour trois personnes, le 2024-06-07 = Réservation rejetée', () => {
                const réservationStore = new RestaurantStore([
                    new RestaurantAjouté([10], 'La boutique'),
                    new RéservationAcceptée(3,'2024-06-07', nomDuRestaurant ),
                    new RéservationAcceptée(2,'2024-06-07', nomDuRestaurant ),
                    new RéservationAcceptée(3,'2024-06-07', nomDuRestaurant )
                ])
                maitreD = new MaitreD([10], réservationStore)
                maitreD.peutAccepter(
                    new DemandeDeRéservation(3, '2024-06-07', nomDuRestaurant)
                )
                expect(
                    réservationStore.dernierÉvènement()
                ).toBeInstanceOf(RéservationRejetée)
            })
        })
    })

    describe('avec une table partagée pour quatre personnes', () => {
        describe('avec une réservation de deux personnes, 2024-06-07', () => {
            it('la demande est pour trois personnes, le 2024-06-07 = demande accepté', () => {
                const réservationStore = new RestaurantStore([
                    new RestaurantAjouté([4], 'La boutique'),
                    new RéservationAcceptée(2, '2024-06-08', nomDuRestaurant)
                ])
                maitreD = new MaitreD([4], réservationStore)
                maitreD.peutAccepter(
                    new DemandeDeRéservation(3, '2024-06-07', nomDuRestaurant)
                )
                expect(
                    réservationStore.dernierÉvènement()
                ).toBeInstanceOf(RéservationRejetée)
            })
        })
    })
})

import { DemandeDeRéservation, MaitreD, RéservationAcceptée, RéservationRejetée } from '../src/MaitreD'
import { RestaurantStore } from '../src/RestaurantStore'

describe('Besoin 2 : Maitre D‘Hotel', () => {
    const nomDuRestaurant = 'Haute cuisine'
    let maitreD
    describe('avec deux capacité privées pour deux et deux capacité privés pour quatre, sans réservations enregistré', () => {
        const tables = [ 2, 2, 4, 4]
        it('réservé pour quatre personnes, par 2024-06-07 = la demande est accepté', () => {
            const restaurantStore = new RestaurantStore([])
            maitreD = new MaitreD(tables, restaurantStore)
            maitreD.peutAccepter(
                new DemandeDeRéservation(4, '2024-06-07', nomDuRestaurant)
            )
            expect(restaurantStore.dernierÉvènement()).toBeInstanceOf(RéservationAcceptée)
        })
        it('la demande est pour cinq personnes, par 2024-06-07 = Réservation rejeté', () => {
            const restaurantStore = new RestaurantStore([])
            maitreD = new MaitreD(tables, restaurantStore)
            maitreD.peutAccepter(
                new DemandeDeRéservation(5, '2024-06-07', nomDuRestaurant)
            )
            expect(restaurantStore.dernierÉvènement()).toBeInstanceOf(RéservationRejetée)
        })
    })

    describe('avec deux capacité privées et une table privée pour quatre personne', () => {

        const tables = [2, 2, 4]

        describe('avec une réservations enregistré de 2 personnes, par 2024-06-07', () => {

            const réservations = [new RéservationAcceptée(2, '2024-06-07', nomDuRestaurant)]
            const restaurantStore = new RestaurantStore(réservations)
            maitreD = new MaitreD(tables, restaurantStore)

            it('la demande est pour 2 personnes, par 2024-06-07 = la demande est accepté', () => {
                maitreD.peutAccepter(
                    new DemandeDeRéservation(2, '2024-06-07', nomDuRestaurant)
                )
                expect(restaurantStore.dernierÉvènement()).toBeInstanceOf(RéservationAcceptée)
            })
        })

        describe('avec une réservations enregistré de 3 personnes, par 2024-06-07', () => {

            const réservations = [new RéservationAcceptée(3, '2024-06-07', nomDuRestaurant)]
            const restaurantStore = new RestaurantStore(réservations)
            maitreD = new MaitreD(tables, restaurantStore)

            it('la demande est pour 3 personnes, par 2024-06-07 =  Réservation rejeté', () => {
                maitreD.peutAccepter(
                    new DemandeDeRéservation(3, '2024-06-07', nomDuRestaurant)
                )
                expect(restaurantStore.dernierÉvènement()).toBeInstanceOf(RéservationRejetée)
            })
        })
    })
})
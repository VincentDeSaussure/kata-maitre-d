import { Réserver } from '../src/maitreD/Réserver'
import { RestaurantStore } from '../src/maitreD/store/RestaurantStore'
import { RestaurantAjouté } from '../src/maitreD/évènement/RestaurantAjouté'
import { DemandeDeRéservation } from '../src/maitreD/DemandeDeRéservation'
import { RéservationAcceptée } from '../src/maitreD/évènement/RéservationAcceptée'
import { RéservationRejetée } from '../src/maitreD/évènement/RéservationRejetée'

describe('Besoin 2 : La boutique', () => {
    const nomDuRestaurant = 'Haute cuisine'
    let réserver
    describe('avec deux capacité privées pour deux et deux capacité privés pour quatre, sans réservations enregistré', () => {
        const tables = [ 2, 2, 4, 4]
        it('réservé pour quatre personnes, par 2024-06-07 = la demande est accepté', () => {
            const restaurantStore = new RestaurantStore([
                new RestaurantAjouté(tables, nomDuRestaurant)
            ])
            réserver = new Réserver(restaurantStore)
            réserver.execute(
                new DemandeDeRéservation(4, '2024-06-07', nomDuRestaurant)
            )
            expect(restaurantStore.dernierÉvènement()).toBeInstanceOf(RéservationAcceptée)
        })
        it('la demande est pour cinq personnes, par 2024-06-07 = Réservation rejeté', () => {
            const restaurantStore = new RestaurantStore([
                new RestaurantAjouté(tables, nomDuRestaurant)
            ])
            réserver = new Réserver(restaurantStore)
            réserver.execute(
                new DemandeDeRéservation(5, '2024-06-07', nomDuRestaurant)
            )
            expect(restaurantStore.dernierÉvènement()).toBeInstanceOf(RéservationRejetée)
        })
    })

    describe('avec deux capacité privées et une table privée pour quatre personne', () => {

        const tables = [2, 2, 4]

        describe('avec une réservations enregistré de 2 personnes, le 2024-06-07', () => {

            const réservations = [
                new RestaurantAjouté(tables, nomDuRestaurant),
                new RéservationAcceptée(2, '2024-06-07', nomDuRestaurant)
            ]
            const restaurantStore = new RestaurantStore(réservations)
            réserver = new Réserver(restaurantStore)

            it('la demande est pour 2 personnes, par 2024-06-07 = la demande est accepté', () => {
                réserver.execute(
                    new DemandeDeRéservation(2, '2024-06-07', nomDuRestaurant)
                )
                expect(restaurantStore.dernierÉvènement()).toBeInstanceOf(RéservationAcceptée)
            })
        })

        describe('avec une réservations enregistré de 3 personnes, le 2024-06-07', () => {

            const réservations = [
                new RestaurantAjouté(tables, nomDuRestaurant),
                new RéservationAcceptée(3, '2024-06-07', nomDuRestaurant)
            ]
            const restaurantStore = new RestaurantStore(réservations)
            réserver = new Réserver(restaurantStore)

            it('la demande est pour 3 personnes, par 2024-06-07 =  Réservation rejeté', () => {
                réserver.execute(
                    new DemandeDeRéservation(3, '2024-06-07', nomDuRestaurant)
                )
                expect(restaurantStore.dernierÉvènement()).toBeInstanceOf(RéservationRejetée)
            })
        })
    })
})

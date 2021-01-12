import { RestaurantStore } from './store/RestaurantStore'
import { DemandeDeRéservation } from './DemandeDeRéservation'

export class Réserver {
    constructor(private readonly restaurantStore: RestaurantStore) {}

    execute(demandeDeRéservation: DemandeDeRéservation) {
        const restaurant = this.restaurantStore.par(
            demandeDeRéservation.nomDuRestaurant, demandeDeRéservation.date
        )

        const réservationEvent = restaurant.réserver(
            demandeDeRéservation.nombreDePersonne,
            demandeDeRéservation.date,
            demandeDeRéservation.nomDuRestaurant
        )
        this.restaurantStore.enregistre(réservationEvent)
    }
}
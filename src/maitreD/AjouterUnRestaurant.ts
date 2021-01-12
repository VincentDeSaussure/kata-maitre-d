import { RestaurantStore } from './store/RestaurantStore'
import { RestaurantAjouté } from './évènement/RestaurantAjouté'
import { DemandeDAjout } from './DemandeDAjout'

export class AjouterUnRestaurant {
    constructor(private readonly restaurantStore: RestaurantStore) {}

    execute(command: DemandeDAjout) {
        this.restaurantStore.enregistre(
            new RestaurantAjouté(command.tables, command.nom)
        )
    }
}

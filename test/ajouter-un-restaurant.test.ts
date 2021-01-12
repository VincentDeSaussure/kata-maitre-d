import { RestaurantStore } from '../src/maitreD/store/RestaurantStore'
import { RestaurantAjouté } from '../src/maitreD/évènement/RestaurantAjouté'
import { DemandeDAjout } from '../src/maitreD/DemandeDAjout'
import { AjouterUnRestaurant } from '../src/maitreD/AjouterUnRestaurant'

describe('AjouterUnRestaurant un restaurant', () => {
    it('la boutique', () => {
        const restaurantStore = new RestaurantStore([])
        const ajouteRestaurantCommand = new DemandeDAjout([4], 'La boutique')
        const maitreD = new AjouterUnRestaurant(restaurantStore)
        maitreD.execute(ajouteRestaurantCommand)
        expect(
            restaurantStore.dernierÉvènement()
        ).toBeInstanceOf(RestaurantAjouté)
    })
})
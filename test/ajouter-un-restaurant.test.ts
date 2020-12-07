import { MaitreD, RestaurantAjouté} from '../src/MaitreD'
import { Restaurant } from '../src/Restaurant'
import { Table } from '../src/Table'
import { RestaurantStore } from '../src/RestaurantStore'

export class AjouteRestaurantCommand {
    constructor(public readonly tables: number[], public readonly nom: string) {}
}

describe('Ajouter un restaurant', () => {
    it('la boutique', () => {
        const restaurantStore = new RestaurantStore([])
        const ajouteRestaurantCommand = new AjouteRestaurantCommand([4], 'La boutique')
        const maitreD = new MaitreD([], restaurantStore)
        maitreD.ajoute(ajouteRestaurantCommand)
        expect(
            restaurantStore.dernierÉvènement()
        ).toBeInstanceOf(RestaurantAjouté)
        expect(
            restaurantStore.retrieve('La boutique', 'today')
        ).toEqual(
            new Restaurant(4, 'La boutique')
        )
    })
})
import { MaitreD, RestaurantAjouté, RestaurantStore } from '../src/MaitreD'

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
    })
})
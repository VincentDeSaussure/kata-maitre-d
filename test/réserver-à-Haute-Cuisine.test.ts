import { Restaurant } from '../src/maitre-d/Restaurant'
import { DemandeDeRéservation, MaitreD, Réservation } from '../src/maitre-d/MaitreD'

export class Table {
    constructor(public readonly capacité: number) {}
}

describe('Besoin 2 : Réserver au restaurant Haute Cuisine', () => {

    it('pour 4 personnes, quand il y a deux tables de 4 personnes dont une table réservé', () => {
        const tables = [new Table(4), new Table(4)]
        const hauteCuisine = new Restaurant('Haute Cuisne', tables)
        const maitreDHauteCuisine = new MaitreD(hauteCuisine)
        const évènements = [new Réservation(4, '15-09-2020')]
        expect(
            maitreDHauteCuisine.peutAccepter(
                new DemandeDeRéservation(4, '15-09-2020'),
                évènements
            )
        ).toEqual(true)
    })

    it('pour 4 personnes, quand il y a deux tables de deux', () => {
        const tables = [ new Table(2), new Table(2)]
        const hauteCuisine = new Restaurant('Haute Cuisne', tables)
        const maitreDHauteCuisine = new MaitreD(hauteCuisine)
        const évènements = []
        expect(
            maitreDHauteCuisine.peutAccepter(
                new DemandeDeRéservation(4, '15-09-2020'),
                évènements
            )
        ).toEqual(false)
    })
})
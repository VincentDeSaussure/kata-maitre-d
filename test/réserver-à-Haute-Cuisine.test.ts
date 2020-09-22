import { Restaurant } from '../src/maitre-d/Restaurant'
import { DemandeDeRéservation, MaitreD, Réservation, Réservations } from '../src/maitre-d/MaitreD'

export abstract class Table {
    constructor(public readonly capacité: number) {}
}

export class TablePrivé extends Table {
    constructor(capacité: number) {
        super(capacité);
    }
}

export class TablePartagé extends Table {
    constructor(capacité: number) {
        super(capacité);
    }
}

describe('Besoin 2 : Réserver au restaurant Haute Cuisine', () => {

    it('pour 4 personnes, quand le restaurant a deux tables de 4 personnes dont une table réservé', () => {
        const tables = [new TablePrivé(4), new TablePrivé(4)]
        const hauteCuisine = new Restaurant('Haute Cuisne', tables)
        const évènements = new Réservations([new Réservation(4, '15-09-2020')])
        const maitreDHauteCuisine = new MaitreD(hauteCuisine, évènements)
        expect(
            maitreDHauteCuisine.peutAccepter(
                new DemandeDeRéservation(4, '15-09-2020'),
            )
        ).toEqual(true)
    })

    it('pour 4 personnes, quand le restaurant a deux tables de deux', () => {
        const tables = [ new TablePrivé(2), new TablePrivé(2)]
        const hauteCuisine = new Restaurant('Haute Cuisne', tables)
        const évènements = new Réservations([])
        const maitreDHauteCuisine = new MaitreD(hauteCuisine, évènements)
        expect(
            maitreDHauteCuisine.peutAccepter(
                new DemandeDeRéservation(4, '15-09-2020'),
            )
        ).toEqual(false)
    })

    it('pour 4 personnes, quand le restaurant a deux tables de 2 et une table 4 déja réservé', () => {
        const tables = [ new TablePrivé(4), new TablePrivé(2), new TablePrivé(2)]
        const hauteCuisine = new Restaurant('Haute Cuisne', tables)
        const réservations = new Réservations([new Réservation(4, '15-09-2020')])
        const maitreDHauteCuisine = new MaitreD(hauteCuisine, réservations)
        expect(
            maitreDHauteCuisine.peutAccepter(
                new DemandeDeRéservation(3, '15-09-2020')
            )
        ).toEqual(false)
    })
})
import { DemandeDeRéservation, MaitreD, Réservation } from '../src/maitre-d/MaitreD'
import { Restaurant } from '../src/maitre-d/Restaurant'
import { Table } from './réserver-à-Haute-Cuisine.test'

describe('Besoin 1 : Réserver au restaurant La boutique', () => {

    const maitreDLaBoutique = new MaitreD(new Restaurant('La boutique', [new Table(12)]))

    it('pour douze personnes', () => {
        const réservations = []
        expect(
            maitreDLaBoutique.peutAccepter(
                new DemandeDeRéservation(12, '12-09-2020'),
                réservations
            )
        ).toEqual(true)
    })

    it('pour treize personnes', () => {
        const réservations = []
        expect(
            maitreDLaBoutique.peutAccepter(
                new DemandeDeRéservation(13, "12-09-2020"),
                réservations
            )
        ).toEqual(false)
    })

    it('quand la table est déjà réservé', () => {
        const réservations = [new Réservation(4, "12-09-2020")]
        expect(
            maitreDLaBoutique.peutAccepter(
                new DemandeDeRéservation(12, "12-09-2020"),
                réservations
            )
        ).toEqual(false)
    })

    it('quand la table est déjà réservé un jour différent de celui de la demande', () => {
        const réservations = [new Réservation(4, '12-09-2020')]
        expect(
            maitreDLaBoutique.peutAccepter(
                new DemandeDeRéservation(12, "13-09-2020"),
                réservations
            )
        ).toEqual(true)
    })

    it('pour 6 personnes quand la table est déjà réservé pour 6 personnes', () => {
        const réservations = [new Réservation(6, '12-09-2020')]
        expect(
            maitreDLaBoutique.peutAccepter(
                new DemandeDeRéservation(6, "12-09-2020"),
                réservations
            )
        ).toEqual(true)
    })

    it('pour 7 personnes quand la table est déjà réservé pour 6 personnes', () => {
        const réservations = [new Réservation(6, '12-09-2020')]
        expect(
            maitreDLaBoutique.peutAccepter(
                new DemandeDeRéservation(7, "12-09-2020"),
                réservations
            )
        ).toEqual(false)
    })

    it('pour 5 personnes quand la table est déjà réservé deux fois pour de 4 personnes respectivement', () => {
        const réservations = [
            new Réservation(4, '12-09-2020'),
            new Réservation(4, '12-09-2020')
        ]
        expect(
            maitreDLaBoutique.peutAccepter(
                new DemandeDeRéservation(5, "12-09-2020"),
                réservations
            )
        ).toEqual(false)
    })
})

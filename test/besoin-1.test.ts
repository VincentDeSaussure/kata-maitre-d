import {
    DemandeDeRéservation,
    MaitreD,
    RéservationAcceptée,
    RestaurantStore,
    RéservationRejetée
} from '../src/MaitreD'

describe('Besoin 1 : Maître d‘hôtel', () => {

    let maitreD

    describe('avec une table partagée pour douze personnes', () => {
        it('la demande est pour douze personnes, le 2024-06-07 = demande acceptée', () => {
            const réservationStore = new RestaurantStore([])
            maitreD = new MaitreD([12], réservationStore)
            maitreD.peutAccepter(
                new DemandeDeRéservation(12, '2024-06-07')
            )
            expect(réservationStore.dernierÉvènement()).toBeInstanceOf(RéservationAcceptée)
        })
        it('la demande est pour treize personnes, le 2024-06-07 = demande rejetée', () => {
            const réservationStore = new RestaurantStore([])
            maitreD = new MaitreD([12], réservationStore)
            maitreD.peutAccepter(
                new DemandeDeRéservation(13, '2024-06-07')
            )
            expect(réservationStore.dernierÉvènement()).toBeInstanceOf(RéservationRejetée)
        })
    })

    describe('avec une table partagée pour quatre personnes', () => {

        describe('avec une réservations enregistré de trois personnes, le 2024-06-07', () => {
            it('la demande est pour deux personnes, le 2024-06-07 = demande rejetée', () => {
                const réservationStore = new RestaurantStore([
                    new RéservationAcceptée(3, '2024-06-07')
                ])
                maitreD = new MaitreD([4], réservationStore)
                maitreD.peutAccepter(
                    new DemandeDeRéservation(2, '2024-06-07')
                )
                expect(réservationStore.dernierÉvènement()).toBeInstanceOf(RéservationRejetée)
            })
        })
    })

    describe('avec une table partagée pour dix personnes', () => {
        describe('avec une réservations de deux personnes, le 2024-06-07', () => {
            it('la demande est pour 3 personnes, le 2024-06-07 = demande acceptée', () => {
                const réservationStore = new RestaurantStore([
                    new RéservationAcceptée(2, '2024-06-07')
                ])
                maitreD = new MaitreD([10], réservationStore)
                maitreD.peutAccepter(
                    new DemandeDeRéservation(3, '2024-06-07')
                )
                expect(
                    réservationStore.dernierÉvènement()
                ).toBeInstanceOf(RéservationAcceptée)
            })
        })
        describe('avec des réservations tel que :' +
            'trois personnes, le 2024-06-07,' +
            'deux personnes, le 2024-06-07,' +
            'trois personnes, le 2024-06-07', () => {
            it('la demande est pour trois personnes, le 2024-06-07 = demande rejetée', () => {
                const réservationStore = new RestaurantStore([
                    new RéservationAcceptée(3,'2024-06-07' ),
                    new RéservationAcceptée(2,'2024-06-07' ),
                    new RéservationAcceptée(3,'2024-06-07' )
                ])
                maitreD = new MaitreD([10], réservationStore)
                maitreD.peutAccepter(
                    new DemandeDeRéservation(3, '2024-06-07')
                )
                expect(
                    réservationStore.dernierÉvènement()
                ).toBeInstanceOf(RéservationRejetée)
            })
        })
    })

    describe('avec une table partagée pour quatre personnes', () => {
        describe('avec une réservation de deux personnes, 2024-06-07', () => {
            it('la demande est pour trois personnes, le 2024-06-07 = demande accepté', () => {
                const réservationStore = new RestaurantStore([new RéservationAcceptée(2, '2024-06-08')])
                maitreD = new MaitreD([4], réservationStore)
                maitreD.peutAccepter(
                    new DemandeDeRéservation(3, '2024-06-07')
                )
                expect(
                    réservationStore.dernierÉvènement()
                ).toBeInstanceOf(RéservationAcceptée)
            })
        })
    })
})

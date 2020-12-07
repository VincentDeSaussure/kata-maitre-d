import { DemandeDeRéservation, MaitreD, RéservationAcceptée } from '../src/MaitreD'

describe('Besoin 2 : Maitre D‘Hotel', () => {
    describe('avec deux capacité privées pour deux et deux capacité privés pour quatre, sans réservations enregistré', () => {
        const tables = [ 2, 2, 4, 4]
        const maitreD = new MaitreD(tables, [])
        it('réservé pour quatre personnes, par 2024-06-07 = la demande est accepté', () => {
            expect(maitreD.peutAccepter(
                    new DemandeDeRéservation(4, '2024-06-07'
                )
            )).toEqual(true)
        })
        it('la demande est pour cinq personnes, par 2024-06-07 = la demande est rejeté', () => {
            expect(maitreD.peutAccepter(
                    new DemandeDeRéservation(5, '2024-06-07'
                )
            )).toEqual(false)
        })
    })

    describe('avec deux capacité privées et une table privée pour quatre personne', () => {

        const tables = [ 2, 2, 4]

        describe('avec une réservations enregistré de 2 personnes, par 2024-06-07', () => {

            const réservations = [new RéservationAcceptée(2, '2024-06-07')]
            const maitreD = new MaitreD(tables, réservations)

            it('la demande est pour 2 personnes, par 2024-06-07 = la demande est accepté', () => {
                expect(maitreD.peutAccepter(
                        new DemandeDeRéservation(2, '2024-06-07'
                    )
                )).toEqual(true)
            })
        })

        describe('avec une réservations enregistré de 3 personnes, par 2024-06-07', () => {

            const réservations = [new RéservationAcceptée(3, '2024-06-07')]
            const maitreD = new MaitreD(tables, réservations)

            it('la demande est pour 3 personnes, par 2024-06-07 =  la demande est rejeté', () => {
                expect(maitreD.peutAccepter(
                        new DemandeDeRéservation(3, '2024-06-07'
                    )
                )).toEqual(false)
            })
        })
    })
})
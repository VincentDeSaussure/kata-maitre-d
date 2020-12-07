import { RéservationAcceptée } from '../../src/MaitreD'
import { Table } from '../../src/Table'
import { Restaurant } from '../../src/Restaurant'

describe('Restaurant', () => {
    describe('créée', () => {
        it("avec une table de 4, et une réservation de 4, n'a plus de capacité", () => {
            const tables = [new Table(4)]
            const réservations = [new RéservationAcceptée(4, '2020-04-10')]
            expect(Restaurant.depuisLesÉvènements(réservations).capacité).toEqual([])
        })
    })
})
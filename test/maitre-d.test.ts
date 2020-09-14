class Réservation {
    constructor(public readonly nombreDePersonne: number, public readonly date: string) {}
}

class DemandeDeRéservation {
    constructor(public readonly nombreDePersonne: number, public readonly date: string) {}
}


class MaitreD {
    constructor(public readonly nomDuRestaurant: string, public readonly capacité: number) {}

    peutAccepter(demandeDeRéservation: DemandeDeRéservation, réservations: Réservation[]): boolean {
        if (demandeDeRéservation.nombreDePersonne > this.capacité) {
            return false
        }
        return réservations
            .filter(reservation => reservation.date === demandeDeRéservation.date)
            .reduce((total, reservation) => total + reservation.nombreDePersonne, 0) + demandeDeRéservation.nombreDePersonne
            <= this.capacité
    }
}

describe('Réserver au restaurant La boutique', () => {

    const capacité = 12
    const nomDuRestaurant = 'La boutique'
    const maitreDLaBoutique = new MaitreD(nomDuRestaurant, capacité)

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

    it('quand la table est déjà réservé et que le service est fini', () => {
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

    it('pour 5 personnes quand la table est déjà réservé deux fois par de groupe de 4 personnes', () => {
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

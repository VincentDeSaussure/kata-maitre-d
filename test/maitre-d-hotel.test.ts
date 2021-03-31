import { EventEmitter } from 'events'

export type restaurantId = 'La boutique'

export class DemandeDeRéservation implements Evènement {
    public name:  string = 'something'
    public à: restaurantId = 'La boutique'
    constructor(public readonly pour: number) {}
}

export const SIEGES_RESERVES = 'sièges-réservés'
export const DEMANDE_DE_RESERVATION_RECU = 'demande-de-réservation-reçu'

class Restaurant extends EventEmitter {
    public capacité: number = 4
    réponse: boolean = false
    constructor() {
        super()
        this.on(SIEGES_RESERVES, this.réduitLaCapacité)
            .on(DEMANDE_DE_RESERVATION_RECU, this.réponds)
    }

    réponds(demandeDeRéservation: DemandeDeRéservation) {
        this.réponse = demandeDeRéservation.pour <= this.capacité
    }

    private réduitLaCapacité(siègesRéservés: SiègesRéservés) {
        this.capacité -= siègesRéservés.nombre
    }
}

interface Evènement {
    name: string
}

class SiègesRéservés implements Evènement {
    public name: string = SIEGES_RESERVES
    constructor(readonly nombre: number) {}
}

class MaitreD {
    private readonly restaurant: Restaurant = new Restaurant()

    constructor(private readonly évènements: Evènement[]) {}

    reçoit(demandeDeRéservation: DemandeDeRéservation): MaitreD {
        this.évènements.forEach((évènement: Evènement) => {
            this.restaurant.emit(évènement.name, évènement)
        })
        this.restaurant.emit(DEMANDE_DE_RESERVATION_RECU, demandeDeRéservation)
        return this
    }

    réponds(): boolean {
        return this.restaurant.réponse
    }
}

describe('Maître d‘hôtel', () => {
    it("accepte", () => {
        const demandePour2 = new DemandeDeRéservation(4)
        const maitreD = new MaitreD([])
        expect(
            maitreD.reçoit(demandePour2).réponds()
        ).toEqual(true)
    })
    it("rejete", () => {
        const demandePour2 = new DemandeDeRéservation(2)
        const maitreD = new MaitreD([new SiègesRéservés(3)])
        expect(
            maitreD.reçoit(demandePour2).réponds()
        ).toEqual(false)
    })
})

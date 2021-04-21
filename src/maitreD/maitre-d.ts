import { DemandeDeRéservation, Evènement, RéservationAccepté, RéservationRejeté } from './evenements'

function réduit(capacité: number, évènement: RéservationAccepté) {
    return capacité -= évènement.pour
}

class Restaurant {
    private constructor(public capacité: number) {}

    static àPartirD(évènements: Evènement[]) : Restaurant {
        let capacité = 4
        évènements.forEach(évènement => {
            if(évènement instanceof RéservationAccepté) {
                capacité = réduit(capacité, évènement)
            }
        })

        return new Restaurant(capacité)
    }

    peutAccepter(demandeDeRéservation: DemandeDeRéservation): boolean {
        return demandeDeRéservation.pour <= this.capacité
    }
}

export class MaitreD {
    constructor(private readonly évènements: Evènement[]) {}

    répondsÀ(demandeDeRéservation: DemandeDeRéservation): void {
        this.évènements.push(
            Restaurant.àPartirD(this.évènements).peutAccepter(demandeDeRéservation) ?
                new RéservationAccepté(demandeDeRéservation.pour) :
                new RéservationRejeté()
        )
    }
}

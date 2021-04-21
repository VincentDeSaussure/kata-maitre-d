import { DemandeDeRéservation, Evènement, RéservationAccepté, RéservationRejeté } from '../src/maitreD/evenements'
import { MaitreD} from '../src/maitreD/maitre-d'

describe('Maître D', () => {

    it("accepte " +
        "une demande de réservation inférieur à la capacité du service" +
        "quand le restaurant n'a pas réservation", () => {

        const évènement: Evènement[] = []
        const demande = new DemandeDeRéservation(4)
        new MaitreD(évènement).répondsÀ(demande)
        expect(
            évènement.pop()
        ).toEqual(new RéservationAccepté(demande.pour))
    })

    it("rejete " +
        "une demande de réservation inférieur à la capacité du service" +
        "quand le restaurant est réservé et" +
        "que le service n'a plus assez de places disponibles", () => {

        const évènement: Evènement[] = [ new RéservationAccepté(3) ]
        new MaitreD(évènement).répondsÀ(
            new DemandeDeRéservation(2)
        )
        expect(
            évènement.pop()
        ).toEqual(new RéservationRejeté())
    })
})

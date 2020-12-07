import { Table } from './Table'
import { Restaurant } from './Restaurant'
import { AjouteRestaurantCommand } from '../test/ajouter-un-restaurant.test'
import { RestaurantStore } from './RestaurantStore'

export abstract class Évènement {
    constructor(public readonly date: string, public readonly nomDuRestaurant: string) {}
}

export class RéservationAcceptée extends Évènement{
    constructor(public readonly nombreDePersonne: number, date: string, nomDuRestaurant: string) {
        super(date, nomDuRestaurant)
    }
}

export class RéservationRejetée extends Évènement {
    constructor(public readonly nombreDePersonne: number, date: string, nomDuRestaurant: string) {
        super(date, nomDuRestaurant)
    }
}

export class DemandeDeRéservation {
    constructor(
        public readonly nombreDePersonne: number,
        public readonly date: string,
        public readonly nomDuRestaurant: string
    ) {}
}

export class RestaurantAjouté extends Évènement {
    constructor(public readonly tables: number[], nom: string) {
        super('today', nom)
    }
}

export class MaitreD {
    private readonly tables: Table[]

    constructor(tables: number[], private readonly restaurantStore: RestaurantStore) {
        this.tables = tables.map(table => new Table(table))
    }

    peutAccepter(demandeDeRéservation: DemandeDeRéservation) {
        const évènements = this.restaurantStore.par(demandeDeRéservation.nomDuRestaurant)
        const restaurant = Restaurant.depuisLesÉvènements(évènements)
        this.restaurantStore.enregistre(
            restaurant.peutAccepter(demandeDeRéservation.nombreDePersonne) ?
            new RéservationAcceptée(
                demandeDeRéservation.nombreDePersonne,
                demandeDeRéservation.date,
                demandeDeRéservation.nomDuRestaurant) :
            new RéservationRejetée(
                demandeDeRéservation.nombreDePersonne,
                demandeDeRéservation.date,
                demandeDeRéservation.nomDuRestaurant
            )
        )
    }

    ajoute(command: AjouteRestaurantCommand) {
        this.restaurantStore.enregistre(new RestaurantAjouté(command.tables, command.nom))
    }
}
export class DemandeDeRéservation {
    constructor(
        public readonly nombreDePersonne: number,
        public readonly date: string,
        public readonly nomDuRestaurant: string
    ) {}
}
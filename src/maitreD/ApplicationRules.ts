export class ApplicationRules {
    constructor(
        public readonly identifiant: Identifiant,
        public validityPeriod: ValidityPeriod,
        public readonly labeling: Labeling,
        public readonly product: Product,
        public readonly strategy: Strategy
    ) {}

    get highestDiscount(): number {
        return this.strategy.maxDiscount
    }
}
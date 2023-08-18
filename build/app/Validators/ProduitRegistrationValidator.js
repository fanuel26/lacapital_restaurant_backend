"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ProduitRegistrationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            libelle: Validator_1.schema.string({}, [Validator_1.rules.required(), Validator_1.rules.unique({ table: 'produits', column: 'libelle' })]),
        });
        this.messages = {
            'libelle.required': 'The libelle is required',
            'libelle.unique': 'The libelle is already registered',
        };
    }
}
exports.default = ProduitRegistrationValidator;
//# sourceMappingURL=ProduitRegistrationValidator.js.map
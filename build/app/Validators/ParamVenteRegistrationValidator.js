"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ParamVenteRegistrationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            id_produit: Validator_1.schema.number([Validator_1.rules.required(), Validator_1.rules.unique({ table: 'param_ventes', column: 'id_produit' })]),
            prix_vente_unique: Validator_1.schema.number([Validator_1.rules.required()]),
        });
        this.messages = {
            'prix_vente_unique.required': 'The prix_vente_unique is required',
            'id_produit.required': 'The id_produit is required',
            'id_produit.unique': 'The id_produit is already registered',
        };
    }
}
exports.default = ParamVenteRegistrationValidator;
//# sourceMappingURL=ParamVenteRegistrationValidator.js.map
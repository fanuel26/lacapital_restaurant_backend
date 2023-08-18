"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class LotProduitRegistrationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            id_produit: Validator_1.schema.number([Validator_1.rules.required()]),
            qte: Validator_1.schema.number([Validator_1.rules.required()]),
            prix_achat: Validator_1.schema.number([Validator_1.rules.required()]),
        });
        this.messages = {
            'id_produit.required': 'The qte is required',
            'qte.required': 'The qte is required',
            'prix_achat.required': 'The prix_achat is required',
        };
    }
}
exports.default = LotProduitRegistrationValidator;
//# sourceMappingURL=LotProduitRegistrationValidator.js.map
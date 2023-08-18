"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class DetailReservationRegistrationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            id_vente: Validator_1.schema.number([Validator_1.rules.required()]),
            id_user: Validator_1.schema.number([Validator_1.rules.required()]),
            id_produit: Validator_1.schema.number([Validator_1.rules.required()]),
            qte: Validator_1.schema.number([Validator_1.rules.required()]),
            prix_total: Validator_1.schema.number([Validator_1.rules.required()]),
        });
        this.messages = {
            'id_vente.required': 'The id_vente is required',
            'id_user.required': 'The id_user is required',
            'id_produit.required': 'The id_produit is required',
            'qte.required': 'The qte is required',
            'prix_total.required': 'The prix_total is required',
        };
    }
}
exports.default = DetailReservationRegistrationValidator;
//# sourceMappingURL=DetailReservationRegistrationValidator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class VenteRegistrationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            id_user: Validator_1.schema.number([Validator_1.rules.required()]),
            prix_total: Validator_1.schema.number([Validator_1.rules.required()]),
            prix_client: Validator_1.schema.number([Validator_1.rules.required()]),
            monais_client: Validator_1.schema.number([Validator_1.rules.required()]),
        });
        this.messages = {
            'id_user.required': 'The id_user is required',
            'prix_total.required': 'The prix_total is required',
            'prix_client.required': 'The prix_total is required',
            'monais_client.required': 'The prix_total is required',
        };
    }
}
exports.default = VenteRegistrationValidator;
//# sourceMappingURL=VenteRegistrationValidator.js.map
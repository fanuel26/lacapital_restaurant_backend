"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ReservationRegistrationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            id_user: Validator_1.schema.number([Validator_1.rules.required()]),
            prix_total: Validator_1.schema.number([Validator_1.rules.required()]),
            date: Validator_1.schema.string({}, [Validator_1.rules.required()]),
            heure: Validator_1.schema.string({}, [Validator_1.rules.required()]),
        });
        this.messages = {
            'id_user.required': 'The id_user is required',
            'prix_total.required': 'The prix_total is required',
            'date.required': 'The date is required',
            'heure.required': 'The heure is required',
        };
    }
}
exports.default = ReservationRegistrationValidator;
//# sourceMappingURL=ReservationRegistrationValidator.js.map
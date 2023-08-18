"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UserRegistrationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({}, [
                Validator_1.rules.email(),
                Validator_1.rules.unique({ table: 'users', column: 'email' }),
            ]),
            password: Validator_1.schema.string({}, [Validator_1.rules.minLength(8)]),
        });
        this.messages = {
            'email.required': 'The email is required',
            'email.email': 'The email format is invalid',
            'email.unique': 'The email is already registered',
            'password.required': 'The password is required',
            'password.minLength': 'The password should have at least 8 characters',
        };
    }
}
exports.default = UserRegistrationValidator;
//# sourceMappingURL=UserRegistrationValidator.js.map
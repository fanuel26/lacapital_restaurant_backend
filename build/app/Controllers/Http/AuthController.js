"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const ResponseBody_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResponseBody"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const UserRegistrationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/UserRegistrationValidator"));
class AuthController {
    async login({ auth, request, response }) {
        const email = request.body().email;
        const password = request.body().password;
        try {
            const user = await User_1.default
                .query()
                .where('email', email)
                .firstOrFail();
            if (!(await Hash_1.default.verify(user.password, password))) {
                return response.unauthorized('Invalid credentials');
            }
            const token = await auth.use('api').generate(user, {
                expiresIn: '7 days'
            });
            const responseBody = new ResponseBody_1.default();
            responseBody.status = true;
            responseBody.data = { token: token, infoUser: user };
            responseBody.message = 'Connexion effectuer avec success';
            return response.accepted(responseBody);
        }
        catch {
            const responseBody = new ResponseBody_1.default();
            responseBody.status = false;
            responseBody.data = {};
            responseBody.message = 'erreur lors de la connexion, compte inexistant';
            return response.accepted(responseBody);
        }
    }
    async register({ request, response }) {
        const data = await request.validate(UserRegistrationValidator_1.default);
        console.log(data);
        if (data.errors && data.errors?.length != 0) {
            return data;
        }
        const user = new User_1.default();
        user.email = request.body().email;
        user.password = request.body().password;
        user.role = request.body().role;
        try {
            await user.save();
            const responseBody = new ResponseBody_1.default();
            responseBody.status = true;
            responseBody.data = user;
            responseBody.message = 'Compte créé avec success';
            return response.accepted(responseBody);
        }
        catch {
            const responseBody = new ResponseBody_1.default();
            responseBody.status = false;
            responseBody.data = user;
            responseBody.message = 'erreur lors de l`\'enregistrement, email existe déjà';
            return response.accepted(responseBody);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map
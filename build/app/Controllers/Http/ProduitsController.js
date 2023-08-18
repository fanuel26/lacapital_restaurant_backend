"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Produit_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Produit"));
const ResponseBody_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResponseBody"));
const ProduitRegistrationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ProduitRegistrationValidator"));
class ProduitsController {
    async list({ response }) {
        const produit = await Produit_1.default.all();
        const responseBody = new ResponseBody_1.default;
        responseBody.status = true;
        responseBody.data = produit;
        responseBody.message = 'Liste des produit';
        return response.accepted(responseBody);
    }
    async listById({ request, response }) {
        try {
            const produit = await Produit_1.default.findOrFail(request.params().id);
            return response.accepted({ status: true, data: produit, message: 'produit par id' });
        }
        catch {
            return response.accepted({ status: false, message: 'erreur! id nom trouvez' });
        }
    }
    async save({ request, response }) {
        const data = await request.validate(ProduitRegistrationValidator_1.default);
        console.log(data);
        if (data.errors && data.errors?.length != 0) {
            return data;
        }
        const produit = new Produit_1.default();
        produit.libelle = request.body().libelle;
        try {
            await produit.save();
            return response.accepted({ status: true, data: produit, message: 'produit créé avec success' });
        }
        catch {
            return response.accepted({ status: false, data: produit, message: 'erreur lors de l`\'enregistrement!' });
        }
    }
    async update({ request, response }) {
        try {
            await Produit_1.default.query().where('id', request.params().id).update(request.body());
            const produit_value = await Produit_1.default.query().where('id', request.params().id);
            return response.accepted({ status: true, data: produit_value, message: 'Mise a jour effectuer avec success' });
        }
        catch {
            return response.accepted({ status: false, message: 'erreur lors de la mise a jour!' });
        }
    }
}
exports.default = ProduitsController;
//# sourceMappingURL=ProduitsController.js.map
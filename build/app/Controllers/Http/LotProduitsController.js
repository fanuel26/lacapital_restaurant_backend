"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const LotProduit_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/LotProduit"));
const Produit_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Produit"));
const ResponseBody_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResponseBody"));
const LotProduitRegistrationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/LotProduitRegistrationValidator"));
class LotProduitsController {
    async list({ response }) {
        const produit = await LotProduit_1.default.all();
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = produit;
        responseBody.message = "Liste des lot de produit";
        return response.accepted(responseBody);
    }
    async listState({ response }) {
        const produit = await Produit_1.default.all();
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = produit;
        responseBody.message = "Liste des lot de produit";
        return response.accepted(responseBody);
    }
    async listById({ request, response }) {
        try {
            const produit = await LotProduit_1.default.findOrFail(request.params().id);
            return response.accepted({
                status: true,
                data: produit,
                message: "produit par id",
            });
        }
        catch {
            return response.accepted({
                status: false,
                message: "erreur! id nom trouvez",
            });
        }
    }
    async getByIdProduit({ request, response }) {
        try {
            const produit = await Database_1.default.query()
                .from("lot_produits")
                .where("id_produit", request.params().idProduit);
            return response.accepted({
                status: true,
                data: produit,
                message: "produit par id",
            });
        }
        catch {
            return response.accepted({
                status: false,
                message: "erreur! id nom trouvez",
            });
        }
    }
    async getStateVente({ request, response }) {
        try {
            const nbrQte = await Database_1.default.query()
                .from("lot_produits")
                .where("id_produit", request.params().idProduit)
                .sum("qte", "qte");
            const nbrQteVente = await Database_1.default.query()
                .from("detail_ventes")
                .where("id_produit", request.params().idProduit)
                .sum("qte", "qte");
            let data = {
                nbrQte: nbrQte[0].qte,
                nbrQteVente: nbrQteVente[0].qte,
            };
            return response.accepted({
                status: true,
                data: data,
                message: "produit par id",
            });
        }
        catch {
            return response.accepted({
                status: false,
                message: "erreur! id nom trouvez",
            });
        }
    }
    async save({ request, response }) {
        const data = await request.validate(LotProduitRegistrationValidator_1.default);
        console.log(data);
        if (data.errors && data.errors?.length != 0) {
            return data;
        }
        const produit = new LotProduit_1.default();
        produit.id_produit = request.body().id_produit;
        produit.qte = request.body().qte;
        produit.prix_achat = request.body().prix_achat;
        try {
            await produit.save();
            return response.accepted({
                status: true,
                data: produit,
                message: "produit créé avec success",
            });
        }
        catch {
            return response.accepted({
                status: false,
                data: produit,
                message: "erreur lors de l`'enregistrement!",
            });
        }
    }
    async update({ request, response }) {
        try {
            await LotProduit_1.default.query()
                .where("id", request.params().id)
                .update(request.body());
            const produit_value = await LotProduit_1.default.query().where("id", request.params().id);
            return response.accepted({
                status: true,
                data: produit_value,
                message: "Mise a jour effectuer avec success",
            });
        }
        catch {
            return response.accepted({
                status: false,
                message: "erreur lors de la mise a jour!",
            });
        }
    }
}
exports.default = LotProduitsController;
//# sourceMappingURL=LotProduitsController.js.map
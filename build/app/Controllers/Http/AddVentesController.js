"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const AddVente_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/AddVente"));
const ResponseBody_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResponseBody"));
const AddVentesRegistrationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/AddVentesRegistrationValidator"));
class AddVentesController {
    async list({ response }) {
        const produit = await Database_1.default.from("add_ventes")
            .join("produits", "produits.id", "add_ventes.id_produit")
            .select("add_ventes.*", "produits.*");
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = produit;
        responseBody.message = "Liste des produit";
        return response.accepted(responseBody);
    }
    async listByIdProduit({ request, response }) {
        try {
            const produit = await Database_1.default.query()
                .from("add_ventes")
                .where("id_produit", request.params().id_produit);
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
    async listByIdUser({ request, response }) {
        try {
            const produit = await Database_1.default.from("add_ventes")
                .where("add_ventes.id_user", request.params().id_user)
                .join("produits", "produits.id", "add_ventes.id_produit")
                .select("add_ventes.*", "produits.libelle");
            return response.accepted({
                status: true,
                data: produit,
                message: "produit par id_user",
            });
        }
        catch {
            return response.accepted({
                status: false,
                message: "erreur! id nom trouvez",
            });
        }
    }
    async DeleteByIdUser({ request, response }) {
        try {
            const produit = await Database_1.default.query()
                .from("add_ventes")
                .where("id_user", request.params().id_user)
                .delete();
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
    async DeleteById({ request, response }) {
        console.log(request.params());
        try {
            const produit = await Database_1.default.query()
                .from("add_ventes")
                .where("id", request.params().id)
                .delete();
            console.log(produit);
            return response.accepted({
                status: true,
                data: produit,
                message: "suppression add vente par id",
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
        const data = await request.validate(AddVentesRegistrationValidator_1.default);
        console.log(data);
        if (data.errors && data.errors?.length != 0) {
            return data;
        }
        const produit = new AddVente_1.default();
        produit.id_produit = request.body().id_produit;
        produit.id_user = request.body().id_user;
        produit.qte = request.body().qte;
        produit.prix_total = request.body().prix_total;
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
            await AddVente_1.default.query()
                .where("id", request.params().id)
                .update(request.body());
            const produit_value = await AddVente_1.default.query().where("id", request.params().id);
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
exports.default = AddVentesController;
//# sourceMappingURL=AddVentesController.js.map
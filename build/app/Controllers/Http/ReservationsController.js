"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const DetailReservation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/DetailReservation"));
const Reservation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Reservation"));
const ResponseBody_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResponseBody"));
const ReservationRegistrationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ReservationRegistrationValidator"));
class ReservationsController {
    async list({ response }) {
        const produit = await Reservation_1.default.all();
        const responseBody = new ResponseBody_1.default();
        responseBody.status = true;
        responseBody.data = produit;
        responseBody.message = "Liste des ventes";
        return response.accepted(responseBody);
    }
    async listById({ request, response }) {
        try {
            const produit = await Reservation_1.default.findOrFail(request.params().id);
            return response.accepted({
                status: true,
                data: produit,
                message: "ventes par id",
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
            const produit = await Database_1.default.query()
                .from("reservations")
                .where("id_user", request.params().id_user);
            return response.accepted({
                status: true,
                data: produit,
                message: "reservations par id_user",
            });
        }
        catch {
            return response.accepted({
                status: false,
                message: "erreur! id nom trouvez",
            });
        }
    }
    async detailVenteByIdVente({ request, response }) {
        try {
            const produit = await Database_1.default.query()
                .from("detail_reservations")
                .where("id_vente", request.params().id_vente);
            return response.accepted({
                status: true,
                data: produit,
                message: "ventes par id_vente",
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
        const data = await request.validate(ReservationRegistrationValidator_1.default);
        console.log(data);
        if (data.errors && data.errors?.length != 0) {
            return data;
        }
        const addVentes = await Database_1.default.query()
            .from("add_ventes")
            .where("id_user", request.body().id_user);
        console.log(addVentes);
        if (addVentes.length != 0) {
            const produit = new Reservation_1.default();
            produit.id_user = request.body().id_user;
            produit.prix_total = request.body().prix_total;
            produit.date = request.body().date;
            produit.heure = request.body().heure;
            try {
                await produit.save();
                for (let i = 0; i < addVentes.length; i++) {
                    const av = new DetailReservation_1.default();
                    av.id_vente = produit.id;
                    av.id_produit = addVentes[i].id_produit;
                    av.id_user = addVentes[i].id_user;
                    av.qte = addVentes[i].qte;
                    av.prix_total = addVentes[i].prix_total;
                    try {
                        await av.save();
                    }
                    catch {
                        console.log("error add vente");
                    }
                }
                try {
                    await Database_1.default.query()
                        .from("add_ventes")
                        .where("id_user", request.body().id_user)
                        .delete();
                    return response.accepted({
                        status: true,
                        data: produit,
                        message: "vente créé avec success",
                    });
                }
                catch {
                    return response.accepted({
                        status: false,
                        message: "erreur! lors de la suppression de add vente",
                    });
                }
            }
            catch {
                return response.accepted({
                    status: false,
                    data: produit,
                    message: "erreur lors de l`'enregistrement!",
                });
            }
        }
        else {
            return response.accepted({
                status: false,
                message: "Add Vente inexistant",
            });
        }
    }
    async update({ request, response }) {
        try {
            await Reservation_1.default.query()
                .where("id", request.params().id)
                .update(request.body());
            const produit_value = await Reservation_1.default.query().where("id", request.params().id);
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
exports.default = ReservationsController;
//# sourceMappingURL=ReservationsController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.group(() => {
        Route_1.default.post('/login', 'AuthController.login');
        Route_1.default.post('/register', 'AuthController.register');
    }).prefix('/auth');
    Route_1.default.group(() => {
        Route_1.default.get('/list', 'ProduitsController.list');
        Route_1.default.get('/getById/:id', 'ProduitsController.listById');
        Route_1.default.post('/save', 'ProduitsController.save');
        Route_1.default.put('/update/:id', 'ProduitsController.update');
    }).prefix('/produit').middleware(['auth']);
    Route_1.default.group(() => {
        Route_1.default.get('/list', 'LotProduitsController.list');
        Route_1.default.get('/list/state', 'LotProduitsController.listState');
        Route_1.default.get('/getById/:id', 'LotProduitsController.listById');
        Route_1.default.get('/getByIdProduit/:idProduit', 'LotProduitsController.getByIdProduit');
        Route_1.default.get('/getStateVente/:idProduit', 'LotProduitsController.getStateVente');
        Route_1.default.post('/save', 'LotProduitsController.save');
        Route_1.default.put('/update/:id', 'LotProduitsController.update');
    }).prefix('/produit/lot').middleware(['auth']);
    Route_1.default.group(() => {
        Route_1.default.get('/list', 'ParamVentesController.list');
        Route_1.default.get('/getById/:id', 'ParamVentesController.listById');
        Route_1.default.get('/getByIdProduit/:idProduit', 'ParamVentesController.getByIdProduit');
        Route_1.default.post('/save', 'ParamVentesController.save');
        Route_1.default.put('/update/:id', 'ParamVentesController.update');
    }).prefix('/param/vente').middleware(['auth']);
    Route_1.default.group(() => {
        Route_1.default.get('/list', 'AddVentesController.list');
        Route_1.default.get('/getByIdProduit/:id_produit', 'AddVentesController.listByIdProduit');
        Route_1.default.get('/getByIdUser/:id_user', 'AddVentesController.listByIdUser');
        Route_1.default.post('/save', 'AddVentesController.save');
        Route_1.default.put('/update/:id', 'AddVentesController.update');
        Route_1.default.delete('/deleteByIsUser/:id_user', 'AddVentesController.DeleteByIdUser');
        Route_1.default.delete('/delete/:id', 'AddVentesController.DeleteById');
    }).prefix('/add/vente').middleware(['auth']);
    Route_1.default.group(() => {
        Route_1.default.get('/list', 'VentesController.list');
        Route_1.default.get('/getById/:id', 'VentesController.listById');
        Route_1.default.get('/getByIdUser/:id_user', 'VentesController.listByIdUser');
        Route_1.default.get('/getDetailVenteByIdUser/:id_vente', 'VentesController.detailVenteByIdVente');
        Route_1.default.post('/save', 'VentesController.save');
        Route_1.default.put('/update/:id', 'VentesController.update');
    }).prefix('/vente').middleware(['auth']);
    Route_1.default.group(() => {
        Route_1.default.get('/list', 'ReservationsController.list');
        Route_1.default.get('/getById/:id', 'ReservationsController.listById');
        Route_1.default.get('/getByIdUser/:id_user', 'ReservationsController.listByIdUser');
        Route_1.default.get('/getDetailVenteByIdUser/:id_vente', 'ReservationsController.detailVenteByIdVente');
        Route_1.default.post('/save', 'ReservationsController.save');
        Route_1.default.put('/update/:id', 'ReservationsController.update');
    }).prefix('/reservation').middleware(['auth']);
}).prefix('/api');
//# sourceMappingURL=routes.js.map
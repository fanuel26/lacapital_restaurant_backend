/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //// authetication route
  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
  }).prefix('/auth')


  Route.group(() => {
    Route.get('/list', 'AuthController.list')
    Route.get('/statistique', 'AuthController.stats')
    Route.put('/update/:id', 'AuthController.update')
  }).prefix('/auth').middleware(['auth'])

  /// route pour les produit
  Route.group(() => {
    Route.get('/list', 'ProduitsController.list')
    Route.get('/getById/:id', 'ProduitsController.listById')
    Route.post('/getByDate', 'ProduitsController.listByDate')
    Route.post('/save', 'ProduitsController.save')
    Route.put('/update/:id', 'ProduitsController.update')
  }).prefix('/produit').middleware(['auth'])


  /// route pour les Menu
  Route.group(() => {
    Route.get('/list', 'CategorieMenusController.list')
    Route.get('/getById/:id', 'CategorieMenusController.listById')
    Route.post('/getByDate', 'CategorieMenusController.listByDate')
    Route.post('/save', 'CategorieMenusController.save')
    Route.put('/update/:id', 'CategorieMenusController.update')
  }).prefix('/categorie').middleware(['auth'])

  /// route pour les Menu
  Route.group(() => {
    Route.get('/list', 'MenusController.list')
    Route.get('/getById/:id', 'MenusController.listById')
    Route.post('/getByDate', 'MenusController.listByDate')
    Route.post('/save', 'MenusController.save')
    Route.put('/update/:id', 'MenusController.update')
  }).prefix('/menu').middleware(['auth'])

  /// route pour les Cuisine
  Route.group(() => {
    Route.get('/list', 'CuisinesController.list')
    Route.get('/getById/:id', 'CuisinesController.listById')
    Route.post('/getByDate', 'CuisinesController.listByDate')
    Route.post('/save', 'CuisinesController.save')
    Route.put('/update/:id', 'CuisinesController.update')
  }).prefix('/cuisine').middleware(['auth'])


  /// route pour les Production
  Route.group(() => {
    Route.get('/list', 'ProductionsController.list')
    Route.get('/getById/:id', 'ProductionsController.listById')
    Route.post('/getByDate', 'ProductionsController.listByDate')
    Route.post('/save', 'ProductionsController.save')
    Route.put('/update/:id', 'ProductionsController.update')
  }).prefix('/production').middleware(['auth'])

  /// route pour les Reservation
  Route.group(() => {
    Route.get('/list', 'ReservationsController.list')
    Route.get('/getById/:id', 'ReservationsController.listById')
    Route.post('/getByDate', 'ReservationsController.listByDate')
    Route.post('/save', 'ReservationsController.save')
    Route.put('/update/:id', 'ReservationsController.update')
  }).prefix('/reservation').middleware(['auth'])

  /// route pour les Depense
  Route.group(() => {
    Route.get('/list', 'DepensesController.list')
    Route.get('/getById/:id', 'DepensesController.listById')
    Route.post('/getByDate', 'DepensesController.listByDate')
    Route.post('/save', 'DepensesController.save')
    Route.put('/update/:id', 'DepensesController.update')
  }).prefix('/depense').middleware(['auth'])

  /// route pour les Commande
  Route.group(() => {
    Route.get('/list', 'CommandesController.list')
    Route.get('/getById/:id', 'CommandesController.listById')
    Route.get('/commandeNotification/:id', 'CommandesController.commandeNotification')
    Route.get('/getByIdUser/:id', 'CommandesController.listByIdUser')
    Route.post('/getByDate', 'CommandesController.listByDate')
    Route.post('/getByDateAndUser', 'CommandesController.listByDateAndUser')
    Route.post('/save', 'CommandesController.save')
    Route.put('/update/:id', 'CommandesController.update')
  }).prefix('/commande').middleware(['auth'])
}).prefix('/api')



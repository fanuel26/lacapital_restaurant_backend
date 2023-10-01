
import Hash from '@ioc:Adonis/Core/Hash'
import Cuisine from 'App/Models/Cuisine';
import Depense from 'App/Models/Depense';
import Menu from 'App/Models/Menu';
import Production from 'App/Models/Production';
import Produit from 'App/Models/Produit';
import Reservation from 'App/Models/Reservation';
import ResponseBody from 'App/Models/ResponseBody'
import User from "App/Models/User"
import UserRegistrationValidator from 'App/Validators/UserRegistrationValidator'

export default class AuthController {
  public async list({ response }) {
    const user = await User.all();

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = user
    responseBody.message = 'Liste des utilisateurs'
    return response.accepted(responseBody)
  }

  public async stats({ response }) {
    const caisse = await User.query().where('role', 1);
    const commande = await Cuisine.all();
    const total_commande = await Cuisine.query().sum('prix_total as prix_total').first();
    const reservation = await Reservation.all();
    const production = await Production.all();
    const menu = await Menu.all();
    const produit = await Produit.all();
    const depense = await Depense.all();
    const total_depense = await Depense.query().sum('somme as somme').first();

    let data = {
      'caisse': caisse.length,
      'commande': commande.length,
      'reservation': reservation.length,
      'production': production.length,
      'menu': menu.length,
      'produit': produit.length,
      'depense': depense.length,
      'total_commande': total_commande?.prix_total,
      'total_depense': total_depense?.somme
    }

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = data
    responseBody.message = 'Statistique'
    return response.accepted(responseBody)
  }

  public async login({ auth, request, response }) {
    const email = request.body().email
    const password = request.body().password

    try {
      const user = await User
        .query()
        .where('email', email)
        .firstOrFail()

      // return user

      // Verify password
      if (!(await Hash.verify(user.password, password))) {
        return response.unauthorized('Invalid credentials')
      }

      const token = await auth.use('api').generate(user, {
        expiresIn: '7 days'
      })

      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = true
      responseBody.data = {token: token, infoUser: user}
      responseBody.message = 'Connexion effectuer avec success'
      return response.accepted(responseBody)
    } catch {
      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = false
      responseBody.data = {}
      responseBody.message = 'erreur lors de la connexion, compte inexistant'
      return response.accepted(responseBody)
    }
  }

  public async register({ request, response }) {
    const data = await request.validate(UserRegistrationValidator)

    console.log(data)
    if (data.errors && data.errors?.length != 0) {
      return data
    }

    const user = new User()
    user.username = request.body().username
    user.email = request.body().email
    user.password = request.body().password
    user.password_review = request.body().password_review
    user.role = request.body().role

    try {
      await user.save()

      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = true
      responseBody.data = user
      responseBody.message = 'Compte créé avec success'
      return response.accepted(responseBody)
    } catch {
      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = false
      responseBody.data = user
      responseBody.message = 'erreur lors de l`\'enregistrement, email existe déjà'
      return response.accepted(responseBody)
    }
  }

  public async update({ request, response }) {
    try {
      await User.query().where('id', request.params().id).update(request.body())
      const cuisine_value = await User.query().where('id', request.params().id)

      return response.accepted({ status: true, data: cuisine_value, message: 'Mise a jour effectuer avec success' })
    } catch {
      return response.accepted({ status: false, message: 'erreur lors de la mise a jour!' })
    }
  }
}

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Commande from "App/Models/Commande";
import ResponseBody from "App/Models/ResponseBody";
import CommandeRegistrationValidator from "App/Validators/CommandeRegistrationValidator";

export default class CommandesController {
  public async list({ response }) {
    const commande = await Commande.all();

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = commande
    responseBody.message = 'Liste des commande'
    return response.accepted(responseBody)
  }

  public async listById({ request, response }) {
    try {
      const commande = await Commande.findOrFail(request.params().id)
      return response.accepted({ status: true, data: commande, message: 'commande par id' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }


  public async listByIdUser({ request, response }) {
    try {
      const commande = await Commande.query().where('id_user', request.params().id)
      return response.accepted({ status: true, data: commande, message: 'commande par id' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async commandeNotification({ request, response }) {
    let now = new Date()
    let date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() < 10 ? '0'+now.getDate() : now.getDate()}`
    console.log(date)
    try {
      console.log(request.body());
      const commande = await Commande.query().where('created_at', 'LIKE', `%${date}%`).where('id_user', request.params().id).where('etat', 2)
      console.log(commande);
      return response.accepted({ status: true, data: commande.length, message: 'commande par date' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async listByDate({ request, response }) {
    try {
      console.log(request.body());
      const commande = await Commande.query().where('created_at', 'LIKE', `%${request.body().date}%`)
      console.log(commande);
      return response.accepted({ status: true, data: commande, message: 'commande par date' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async listByDateAndUser({ request, response }) {
    try {
      console.log(request.body());
      const commande = await Commande.query().where('created_at', 'LIKE', `%${request.body().date}%`).where('id_user', request.body().id_user)
      console.log(commande);
      return response.accepted({ status: true, data: commande, message: 'commande par date' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async save({ request, response }) {
    const data = await request.validate(CommandeRegistrationValidator)

    console.log(data)
    if (data.errors && data.errors?.length != 0) {
      return data
    }

    const commande = new Commande()
    commande.num_table = request.body().num_table
    commande.id_user = request.body().id_user
    commande.menus = request.body().menus
    commande.prix_total = request.body().prix_total

    try {
      await commande.save()
      return response.accepted({ status: true, data: commande, message: 'commande créé avec success' })
    } catch {
      return response.accepted({ status: false, data: commande, message: 'erreur lors de l`\'enregistrement!' })
    }
  }

  public async update({ request, response }) {
    try {
      await Commande.query().where('id', request.params().id).update(request.body())
      const commande_value = await Commande.query().where('id', request.params().id)

      return response.accepted({ status: true, data: commande_value, message: 'Mise a jour effectuer avec success' })
    } catch {
      return response.accepted({ status: false, message: 'erreur lors de la mise a jour!' })
    }
  }
}

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Cuisine from "App/Models/Cuisine";
import ResponseBody from "App/Models/ResponseBody";
import CuisineRegistrationValidator from "App/Validators/CuisineRegistrationValidator";

export default class CuisinesController {
  public async list({ response }) {
    const cuisine = await Database.from("cuisines").join("menus", "menus.id", "cuisines.id_menu").select("cuisines.*", "menus.libelle");

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = cuisine
    responseBody.message = 'Liste des cuisine'
    return response.accepted(responseBody)
  }

  public async listById({ request, response }) {
    try {
      const cuisine = await Cuisine.findOrFail(request.params().id)
      return response.accepted({ status: true, data: cuisine, message: 'cuisine par id' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async listByDate({ request, response }) {
    try {
      console.log(request.body());
      const cuisine = await Database.from("cuisines").where('cuisines.created_at', 'LIKE', `%${request.body().date}%`).join("menus", "menus.id", "cuisines.id_menu").select("cuisines.*", "menus.libelle")
      console.log(cuisine);
      return response.accepted({ status: true, data: cuisine, message: 'cuisine par date' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async save({ request, response }) {
    const data = await request.validate(CuisineRegistrationValidator)

    console.log(data)
    if (data.errors && data.errors?.length != 0) {
      return data
    }

    const cuisine = new Cuisine()
    cuisine.id_menu = request.body().id_menu
    cuisine.qte = request.body().qte
    cuisine.prix_total = request.body().prix_total

    try {
      await cuisine.save()
      return response.accepted({ status: true, data: cuisine, message: 'cuisine créé avec success' })
    } catch {
      return response.accepted({ status: false, data: cuisine, message: 'erreur lors de l`\'enregistrement!' })
    }
  }

  public async update({ request, response }) {
    try {
      await Cuisine.query().where('id', request.params().id).update(request.body())
      const cuisine_value = await Cuisine.query().where('id', request.params().id)

      return response.accepted({ status: true, data: cuisine_value, message: 'Mise a jour effectuer avec success' })
    } catch {
      return response.accepted({ status: false, message: 'erreur lors de la mise a jour!' })
    }
  }
}


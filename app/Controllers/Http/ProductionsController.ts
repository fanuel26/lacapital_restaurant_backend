// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Production from "App/Models/Production";
import ResponseBody from "App/Models/ResponseBody";
import ProductionRegistrationValidator from "App/Validators/ProductionRegistrationValidator";

export default class ProductionsController {
  public async list({ response }) {
    const production = await Database.from("productions").join("produits", "produits.id", "productions.id_produit").select("productions.*", "produits.libelle");

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = production
    responseBody.message = 'Liste des production'
    return response.accepted(responseBody)
  }

  public async listById({ request, response }) {
    try {
      const production = await Production.findOrFail(request.params().id)
      return response.accepted({ status: true, data: production, message: 'production par id' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async listByDate({ request, response }) {
    try {
      console.log(request.body());
      const production = await Database.from("productions").where('productions.created_at', 'LIKE', `%${request.body().date}%`).join("produits", "produits.id", "productions.id_produit").select("productions.*", "produits.libelle");
      console.log(production);
      return response.accepted({ status: true, data: production, message: 'production par date' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }


  public async save({ request, response }) {
    const data = await request.validate(ProductionRegistrationValidator)

    console.log(data)
    if (data.errors && data.errors?.length != 0) {
      return data
    }

    const production = new Production()
    production.id_produit = request.body().id_produit
    production.qte = request.body().qte

    try {
      await production.save()
      return response.accepted({ status: true, data: production, message: 'production créé avec success' })
    } catch {
      return response.accepted({ status: false, data: production, message: 'erreur lors de l`\'enregistrement!' })
    }
  }

  public async update({ request, response }) {
    try {
      await Production.query().where('id', request.params().id).update(request.body())
      const production_value = await Production.query().where('id', request.params().id)

      return response.accepted({ status: true, data: production_value, message: 'Mise a jour effectuer avec success' })
    } catch {
      return response.accepted({ status: false, message: 'erreur lors de la mise a jour!' })
    }
  }
}


// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Depense from "App/Models/Depense";
import ResponseBody from "App/Models/ResponseBody";
import DepenseRegistrationValidator from "App/Validators/DepenseRegistrationValidator";

export default class DepensesController {
  public async list({ response }) {
    const depense = await Depense.all();

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = depense
    responseBody.message = 'Liste des depense'
    return response.accepted(responseBody)
  }

  public async listById({ request, response }) {
    try {
      const depense = await Depense.findOrFail(request.params().id)
      return response.accepted({ status: true, data: depense, message: 'depense par id' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async listByDate({ request, response }) {
    try {
      console.log(request.body());
      const depense = await Database.from("depenses").where('depenses.created_at', 'LIKE', `%${request.body().date}%`);
      console.log(depense);
      return response.accepted({ status: true, data: depense, message: 'depense par date' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }


  public async save({ request, response }) {
    const data = await request.validate(DepenseRegistrationValidator)

    console.log(data)
    if (data.errors && data.errors?.length != 0) {
      return data
    }

    const depense = new Depense()
    depense.libelle = request.body().libelle
    depense.type = request.body().type
    depense.somme = request.body().somme

    try {
      await depense.save()
      return response.accepted({ status: true, data: depense, message: 'depense créé avec success' })
    } catch {
      return response.accepted({ status: false, data: depense, message: 'erreur lors de l`\'enregistrement!' })
    }
  }

  public async update({ request, response }) {
    try {
      await Depense.query().where('id', request.params().id).update(request.body())
      const depense_value = await Depense.query().where('id', request.params().id)

      return response.accepted({ status: true, data: depense_value, message: 'Mise a jour effectuer avec success' })
    } catch {
      return response.accepted({ status: false, message: 'erreur lors de la mise a jour!' })
    }
  }
}


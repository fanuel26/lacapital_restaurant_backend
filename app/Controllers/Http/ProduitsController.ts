import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produit from 'App/Models/Produit'
import ResponseBody from 'App/Models/ResponseBody';
import ProduitRegistrationValidator from 'App/Validators/ProduitRegistrationValidator';

export default class ProduitsController {
  public async list({ response }) {
    const produit = await Produit.all();

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = produit
    responseBody.message = 'Liste des produit'
    return response.accepted(responseBody)
  }

  public async listById({ request, response }) {
    try {
      const produit = await Produit.findOrFail(request.params().id)
      return response.accepted({ status: true, data: produit, message: 'produit par id' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async listByDate({ request, response }) {
    try {
      console.log(request.body());
      const produit = await Produit.query().where('created_at', 'LIKE', `%${request.body().date}%`)
      console.log(produit);
      return response.accepted({ status: true, data: produit, message: 'produit par date' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }


  public async save({ request, response }) {
    const data = await request.validate(ProduitRegistrationValidator)

    console.log(data)
    if (data.errors && data.errors?.length != 0) {
      return data
    }

    const produit = new Produit()
    produit.libelle = request.body().libelle
    // produit.qte = request.body().qte
    // produit.prix_achat = request.body().prix_achat
    // produit.prix_vente_unique = request.body().prix_vente_unique

    try {
      await produit.save()
      return response.accepted({ status: true, data: produit, message: 'produit créé avec success' })
    } catch {
      return response.accepted({ status: false, data: produit, message: 'erreur lors de l`\'enregistrement!' })
    }
  }

  public async update({ request, response }) {
    try {
      await Produit.query().where('id', request.params().id).update(request.body())
      const produit_value = await Produit.query().where('id', request.params().id)

      return response.accepted({ status: true, data: produit_value, message: 'Mise a jour effectuer avec success' })
    } catch {
      return response.accepted({ status: false, message: 'erreur lors de la mise a jour!' })
    }
  }
}

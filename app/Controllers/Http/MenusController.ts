// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Menu from "App/Models/Menu";
import ResponseBody from "App/Models/ResponseBody";
import MenuRegistrationValidator from "App/Validators/MenuRegistrationValidator";

export default class MenusController {
  public async list({ response }) {
    const menu = await Menu.all();

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = menu
    responseBody.message = 'Liste des menu'
    return response.accepted(responseBody)
  }

  public async listById({ request, response }) {
    try {
      const menu = await Menu.findOrFail(request.params().id)
      return response.accepted({ status: true, data: menu, message: 'menu par id' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async listByDate({ request, response }) {
    try {
      console.log(request.body());
      const menu = await Menu.query().where('created_at', 'LIKE', `%${request.body().date}%`)
      console.log(menu);
      return response.accepted({ status: true, data: menu, message: 'menu par date' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }


  public async save({ request, response }) {
    const data = await request.validate(MenuRegistrationValidator)

    console.log(data)
    if (data.errors && data.errors?.length != 0) {
      return data
    }

    const menu = new Menu()
    menu.libelle = request.body().libelle
    // menu.qte = request.body().qte
    menu.prix = request.body().prix
    // menu.prix_vente_unique = request.body().prix_vente_unique

    try {
      await menu.save()
      return response.accepted({ status: true, data: menu, message: 'menu créé avec success' })
    } catch {
      return response.accepted({ status: false, data: menu, message: 'erreur lors de l`\'enregistrement!' })
    }
  }

  public async update({ request, response }) {
    try {
      await Menu.query().where('id', request.params().id).update(request.body())
      const menu_value = await Menu.query().where('id', request.params().id)

      return response.accepted({ status: true, data: menu_value, message: 'Mise a jour effectuer avec success' })
    } catch {
      return response.accepted({ status: false, message: 'erreur lors de la mise a jour!' })
    }
  }
}

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CategorieMenu from "App/Models/CategorieMenu";
import ResponseBody from "App/Models/ResponseBody";
import CategorieMenuRegistrationValidator from "App/Validators/CategorieMenuRegistrationValidator";

export default class CategorieMenusController {
  public async list({ response }) {
    const menu = await CategorieMenu.all();

    /// generation de response
    const responseBody = new ResponseBody()
    responseBody.status = true
    responseBody.data = menu
    responseBody.message = 'Liste des menu'
    return response.accepted(responseBody)
  }

  public async listById({ request, response }) {
    try {
      const menu = await CategorieMenu.findOrFail(request.params().id)
      return response.accepted({ status: true, data: menu, message: 'menu par id' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async listByDate({ request, response }) {
    try {
      console.log(request.body());
      const menu = await CategorieMenu.query().where('created_at', 'LIKE', `%${request.body().date}%`)
      console.log(menu);
      return response.accepted({ status: true, data: menu, message: 'menu par date' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }


  public async save({ request, response }) {
    const data = await request.validate(CategorieMenuRegistrationValidator)

    console.log(data)
    if (data.errors && data.errors?.length != 0) {
      return data
    }

    const menu = new CategorieMenu()
    menu.libelle = request.body().libelle

    try {
      await menu.save()
      return response.accepted({ status: true, data: menu, message: 'categorie menu créé avec success' })
    } catch {
      return response.accepted({ status: false, data: menu, message: 'erreur lors de l`\'enregistrement!' })
    }
  }

  public async update({ request, response }) {
    try {
      await CategorieMenu.query().where('id', request.params().id).update(request.body())
      const menu_value = await CategorieMenu.query().where('id', request.params().id)

      return response.accepted({ status: true, data: menu_value, message: 'Mise a jour effectuer avec success' })
    } catch {
      return response.accepted({ status: false, message: 'erreur lors de la mise a jour!' })
    }
  }
}

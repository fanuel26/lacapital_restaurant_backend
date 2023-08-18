// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Reservation from "App/Models/Reservation";
import ResponseBody from "App/Models/ResponseBody";
import ReservationRegistrationValidator from "App/Validators/ReservationRegistrationValidator";

export default class ReservationsController {
  public async list({ response }) {
    const reservation = await Database.from("reservations").join("menus", "menus.id", "reservations.id_menu").select("reservations.*", "menus.libelle");

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = reservation
    responseBody.message = 'Liste des reservation'
    return response.accepted(responseBody)
  }

  public async listById({ request, response }) {
    try {
      const reservation = await Reservation.findOrFail(request.params().id)
      return response.accepted({ status: true, data: reservation, message: 'reservation par id' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }

  public async listByDate({ request, response }) {
    try {
      console.log(request.body());
      const reservation = await Database.from("reservations").where('reservations.date', 'LIKE', `%${request.body().date}%`).join("menus", "menus.id", "reservations.id_menu").select("reservations.*", "menus.libelle");
      console.log(reservation);
      return response.accepted({ status: true, data: reservation, message: 'reservation par date' })
    } catch {
      return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
    }
  }


  public async save({ request, response }) {
    const data = await request.validate(ReservationRegistrationValidator)

    console.log(data)
    if (data.errors && data.errors?.length != 0) {
      return data
    }

    const reservation = new Reservation()
    reservation.nom = request.body().nom
    reservation.date = request.body().date
    reservation.id_menu = request.body().id_menu
    reservation.qte = request.body().qte
    reservation.prix_total = request.body().prix_total

    try {
      await reservation.save()
      return response.accepted({ status: true, data: reservation, message: 'reservation créé avec success' })
    } catch {
      return response.accepted({ status: false, data: reservation, message: 'erreur lors de l`\'enregistrement!' })
    }
  }

  public async update({ request, response }) {
    try {
      await Reservation.query().where('id', request.params().id).update(request.body())
      const reservation_value = await Reservation.query().where('id', request.params().id)

      return response.accepted({ status: true, data: reservation_value, message: 'Mise a jour effectuer avec success' })
    } catch {
      return response.accepted({ status: false, message: 'erreur lors de la mise a jour!' })
    }
  }
}


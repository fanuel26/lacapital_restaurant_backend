import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Commande extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public num_table: number

  @column()
  public id_user: number

  @column()
  public menus: string

  @column()
  public prix_total: number

  @column()
  public etat: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

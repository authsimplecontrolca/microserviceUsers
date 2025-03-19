// models/TypeDocument.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { getDateTime } from '../utils/dateUtil';
import { User } from './user';

@Table({ tableName: 'type_documents', timestamps: false })
export class TypeDocument extends Model<TypeDocument> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string; // Nombre del tipo de documento (Ej: DNI, Pasaporte, etc.)

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean; // Define si el tipo de documento está activo o no

  @Default(getDateTime)
  @Column(DataType.DATE) // Cambiar de STRING a DATE
  declare createdAt?: Date;

  @Default(getDateTime)
  @Column(DataType.DATE) // Cambiar de STRING a DATE
  declare updatedAt?: Date;

  @HasMany(() => User) // Relación inversa: Un TypeDocument tiene muchos Users
  users!: User[];
}

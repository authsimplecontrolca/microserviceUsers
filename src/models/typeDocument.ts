// models/TypeDocument.ts
import { Table, Column, Model, DataType, Default, AllowNull, HasMany } from 'sequelize-typescript';
import { User } from './user';

@Table({ tableName: 'type_documents', timestamps: true })
export class TypeDocument extends Model<TypeDocument> {
  @AllowNull(false)
  @Column(DataType.STRING)
  typeDocumentName!: string; // Nombre del tipo de documento (Ej: DNI, Pasaporte, etc.)

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean; // Define si el tipo de documento está activo o no

  @HasMany(() => User) // Relación inversa: Un TypeDocument tiene muchos Users
  users!: User[];
}

import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
  Unique,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { InferCreationAttributes } from 'sequelize';
import { Role } from './role';
import { TypeDocument } from './typeDocument';
// TODO: sql para que las tablas tomen el create y update por defecto al crear y modificar por sql
@Table({ tableName: 'users', timestamps: true })
export class User extends Model<InferCreationAttributes<User>> {
  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  documentNumber!: string;

  @ForeignKey(() => TypeDocument)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  typeDocumentId!: number;

  @BelongsTo(() => TypeDocument) // Relación inversa: Un Usuario tiene un TypeDocument
  typeDoc?: TypeDocument;

  @AllowNull(false)
  // @Unique TODO: pensar bien si quiero que por bd no sea unico
  @Column(DataType.STRING)
  phoneNumber!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  companyId!: number;

  @Column(DataType.STRING)
  password?: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isGoogle?: boolean;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive?: boolean;

  @Default(0)
  @Column(DataType.INTEGER)
  reputation?: number; // from 0 to 5

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  roleId!: number;

  @BelongsTo(() => Role) // Relación inversa: Un Usuario tiene un Role
  role?: Role;

  @Column(DataType.INTEGER)
  createdBy!: number;

  @Column(DataType.INTEGER)
  updatedBy?: number;
}

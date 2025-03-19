import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  Unique,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { getDateTime } from '../utils/dateUtil';
import { InferCreationAttributes } from 'sequelize';
import { Role } from './role';
import { TypeDocument } from './typeDocument';
// TODO: sql para que las tablas tomen el create y update por defecto al crear y modificar por sql 
@Table({ tableName: 'users', timestamps: false })
export class User extends Model<InferCreationAttributes<User>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT )
  declare id?: number;

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
  typeDocument!: number;

  @BelongsTo(() => TypeDocument) // Relación inversa: Un Usuario tiene un TypeDocument
  typeDoc?: TypeDocument;

  @AllowNull(false)
  @Unique
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

  @Default(getDateTime)
  @Column(DataType.DATE) // Cambiar de STRING a DATE
  declare createdAt?: Date;

  @Default(getDateTime)
  @Column(DataType.DATE) // Cambiar de STRING a DATE
  declare updatedAt?: Date;
}

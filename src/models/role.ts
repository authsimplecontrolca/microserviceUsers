// models/Role.ts
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

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model<Role> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  deactivateUsersOnDisable!: boolean;

  @Default(getDateTime)
  @Column(DataType.DATE) // Cambiar de STRING a DATE
  declare createdAt?: Date;

  @Default(getDateTime)
  @Column(DataType.DATE) // Cambiar de STRING a DATE
  declare updatedAt?: Date;

  @HasMany(() => User) // Relación inversa: Un Role tiene muchos Users
  users!: User[];
}

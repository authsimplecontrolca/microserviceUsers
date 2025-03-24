// models/Role.ts
import { Table, Column, Model, DataType, Default, AllowNull, HasMany } from 'sequelize-typescript';
import { User } from './user';

@Table({ tableName: 'roles', timestamps: true })
export class Role extends Model<Role> {
  @AllowNull(false)
  @Column(DataType.STRING)
  roleName!: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  deactivateUsersOnDisable!: boolean;

  @HasMany(() => User) // Relación inversa: Un Role tiene muchos Users
  users!: User[];
}

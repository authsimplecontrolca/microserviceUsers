import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user';
import { Role } from '../models/role';
import { activeModels } from './activeModel';
import { TypeDocument } from '../models/typeDocument';

const models: any[] = [];

// Solo agrega los modelos que están activos en activeModels
if (activeModels.User === 'on') models.push(User);
if (activeModels.Role === 'on') models.push(Role);
if (activeModels.TypeDocument === 'on') models.push(TypeDocument);

export const registerModels = (sequelize: Sequelize) => {
  console.log(
    '📦 Modelos activos:',
    models.map((m) => m.name)
  ); // Imprime los modelos que se están registrando
  sequelize.addModels(models);
};

import { User } from '../../models/user';

// Crear un nuevo usuario
import { InferCreationAttributes } from 'sequelize';

export const createUserService = async (payload: InferCreationAttributes<User>) => {
  try {
    const { dataValues } = await User.create(payload, { raw: true });
    const { password, ...user } = dataValues;
    return user;
  } catch (error: any) {
    throw new Error(`Error al crear el usuario: ${error.message}`);
  }
};

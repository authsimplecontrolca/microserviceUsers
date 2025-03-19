import { User } from '../../models/user';

// Crear un nuevo usuario
import { InferCreationAttributes } from 'sequelize';

export const createUserService = async (payload: InferCreationAttributes<User>) => {
  try {
    const {dataValues} = await User.create(payload, { raw: true });
    const { password, ...user } = dataValues;
    return {
      status: true,
      message: 'Usuario creado con éxito',
      user,
    };
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};

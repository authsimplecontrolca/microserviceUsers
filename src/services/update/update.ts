import { User } from '../../models/user';

// Actualizar un usuario por ID
export const updateUserService = async ({
  id,
  firstName,
  lastName,
  email,
  reputation,
  roleId,
  documentNumber,
  phoneNumber,
  typeDocumentId,
  updatedBy
}: {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  reputation?: number;
  roleId?: number;
  documentNumber?: string;
  phoneNumber?: string;
  typeDocumentId?: number;
  updatedBy:number
}) => {
  try {
    // Preparar el payload para la actualización
    const payload = {
      firstName,
      lastName,
      email,
      reputation,
      roleId,
      documentNumber,
      phoneNumber,
      typeDocumentId,
      updatedBy
    };

    // Realizar la actualización
    const [updated] = await User.update(payload, { where: { id } });

    // Si no se actualizó ningún registro
    if (!updated) return false;

    return true;
  } catch (error: any) {
    console.error(error); // Para depuración
    throw new Error(`Error al editar el usuario: ${error.message}`);
  }
};

export const toggleUserStatusService = async ({ id, updatedBy }: { id: number, updatedBy:number }) => {
  try {
    // Buscar el usuario
    const user = await User.findByPk(id, { raw: true });

    // Cambiar el estado de 'isActive' (habilitar/deshabilitar)
    const updatedUser = await User.update({ isActive: !user!.isActive, updatedBy }, { where: { id } });

    // Verificar si se realizó la actualización
    if (updatedUser[0] === 0) {
      return { status: false, message: 'No se pudo actualizar el estado del usuario.' };
    }

    return {
      status: true,
      message: `Usuario ${user!.isActive ? 'deshabilitado' : 'habilitado'} con éxito.`,
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(`Error al cambiar el estado al usuario: ${error.message}`);
  }
};

// update password
export const updatePasswordService = async ({ email, password }: { email: string; password: string }) => {
  try {
    
    // Preparar el payload para la actualización
    const payload = { password };

    // Realizar la actualización
    const [updated] = await User.update(payload, { where: { email} });

    // Si no se actualizó ningún registro
    if (!updated) return false;

    return true;
  } catch (error: any) {
    console.error(error); // Para depuración
    throw new Error(`Error al editar la contraseña del usuario: ${error.message}`);
  }
};

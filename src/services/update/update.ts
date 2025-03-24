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
}: {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  reputation: number;
  roleId: number;
  documentNumber: string;
  phoneNumber: string;
  typeDocumentId: number;
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
    };

    // Realizar la actualización
    const [updated] = await User.update(payload, { where: { id } });

    // Si no se actualizó ningún registro
    if (!updated) return { status: false, message: 'No se pudo actualizar el usuario.' };

    return {
      status: true,
      message: 'Usuario actualizado con éxito.',
    };
  } catch (error: any) {
    console.error(error); // Para depuración
    return {
      status: false,
      message: 'Error al actualizar el usuario: ' + error.message,
    };
  }
};

export const toggleUserStatusService = async ({ id }: { id: number }) => {
  try {
    // Buscar el usuario
    const user = await User.findByPk(id, { raw: true });
    console.log(user);

    // Cambiar el estado de 'isActive' (habilitar/deshabilitar)
    const updatedUser = await User.update({ isActive: !user!.isActive }, { where: { id } });

    // Verificar si se realizó la actualización
    if (updatedUser[0] === 0) {
      return { status: false, message: 'No se pudo actualizar el estado del usuario.' };
    }

    return {
      status: true,
      message: `Usuario ${user!.isActive ? 'deshabilitado' : 'habilitado'} con éxito.`,
    };
  } catch (error) {
    console.error(error);
    return { status: false, message: 'Error al actualizar el estado del usuario.' };
  }
};

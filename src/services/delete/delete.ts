import { User } from "../../models/user";

export const disableUserService = async ({ id }: { id: number }) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return { success: false, message: "Usuario no encontrado" };

    // Alternar el estado de isActive y actualizar directamente
    const updatedUser = await user.update({ isActive: !user.isActive });

    return { success: true, message: "Usuario actualizado correctamente", user: updatedUser };
  } catch (error) {
    return { success: false, message: "Error al deshabilitar el usuario", error: (error as Error).message };
  }
};

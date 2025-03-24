import { Request, Response } from 'express';
import { createUserService } from '../services/create/create';
import { InferCreationAttributes } from 'sequelize';
import { getAllUsersService, getRolesService, getTypeDocumentsService, getUserByEmailService, getUserByIdService } from '../services/find/find';
import { toggleUserStatusService, updateUserService } from '../services/update/update';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import { config } from '../utils/config';

// Obtener todos los usuarios
export const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
  const { dateInit, dateEnd, isActive, search, roleId, companyId, limit, page, order } = req.body;
  try {
    const listUsers = await getAllUsersService({
      dateInit,
      dateEnd,
      isActive,
      search,
      roleId,
      companyId,
      limit,
      page,
      order,
    });
    res.status(200).json(listUsers);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService({ id: parseInt(id) });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Actualizar un usuario por ID
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { firstName, lastName, email, reputation, roleId, documentNumber, phoneNumber, typeDocument } = req.body;

  // Preparar el payload para la actualización
  const payload = {
    id: parseInt(id),
    firstName: firstName.toString(),
    lastName: lastName.toString(),
    email: email.toString(),
    reputation: parseInt(reputation),
    roleId: parseInt(roleId),
    documentNumber:documentNumber.toString(),
    phoneNumber:phoneNumber.toString(),
    typeDocumentId:parseInt(typeDocument),
  };

  try {
    // Llamar al servicio de actualización
    const updatedUser = await updateUserService(payload);

    // Retornar la respuesta con el usuario actualizado
    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error(error); // Para depuración
    res.status(500).json({ error: `Error al actualizar el usuario: ${error.message}` });
  }
};

// Deshabilitar y habilitar un usuario por ID
export const toggleUserStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Llamamos al servicio para cambiar el estado del usuario
    const result = await toggleUserStatusService({ id: parseInt(id) });

    // Verificamos el resultado del servicio
    if (!result.status) {
      res.status(404).json(result); // Usuario no encontrado o no se pudo actualizar
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error); // Para depuración
    res.status(500).json({ error: 'Error al actualizar el estado del usuario' });
  }
};

// Crear un nuevo usuario
export const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      roleId,
      companyId,
      createdBy,
      typeDocumentId,
      documentNumber,
      phoneNumber,
    } = req.body;

    const saltRounds = config.LIMIT_PASSWORD!;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const payload: InferCreationAttributes<User, { omit: 'id' | 'createdAt' | 'updatedAt' }> = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId,
      companyId,
      createdBy,
      typeDocumentId,
      documentNumber,
      phoneNumber,
    };
    const newUser = await createUserService(payload);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: `Error al crear el usuario: ${error.message}` });
  }
};


// Obtener un usuario por correo
export const getUserByEmailController = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;
  try {
    const user = await getUserByEmailService({ email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};



// Obtener roles
export const getRolesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await getRolesService();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

// Obtener tipos de documento
export const getTypeDocumentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const TypeDocuments = await getTypeDocumentsService();
    res.status(200).json(TypeDocuments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tipos de documentos.' });
  }
};
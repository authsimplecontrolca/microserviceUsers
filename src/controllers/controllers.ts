import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

import { createUserService } from '../services/create/create';
import {
  getAllUsersService,
  getUserByIdService,
  getUserByEmailService,
  getRolesService,
  getTypeDocumentsService,
} from '../services/find/find';
import { toggleUserStatusService, updateUserService } from '../services/update/update';
import { User } from '../models/user';
import { config } from '../utils/config';
import { errorResponse, successResponse } from '../utils/bodyResponseApi';
import { InferCreationAttributes } from 'sequelize';

const SUCCESS_MESSAGES = {
  usersList: 'Listado de usuarios encontrados',
  userFound: (id: string) => `Resultado de la búsqueda con el ID ${id}`,
  userCreated: 'Usuario creado con éxito',
  userUpdated: 'Usuario actualizado correctamente',
  userNoUpdated: 'Usuario no actualizado, no hubo cambios.',
  userStatusToggled: 'Estado del usuario actualizado correctamente',
  rolesFound: 'Roles activos encontrados',
  typeDocsFound: 'Tipos de documentos activos encontrados',
  userFoundEmail: (email: string) => `Resultado de la búsqueda con el correo ${email}`,
};

export const getAllUsersController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const listUsers = await getAllUsersService(req.body);
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.usersList, data: listUsers }));
});

export const getUserByIdController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await getUserByIdService({ id: Number(id) });
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.userFound(id), data: user }));
});

export const updateUserController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { firstName, lastName, email, reputation, roleId, documentNumber, phoneNumber, typeDocumentId } = req.body;

  const payload: any = { id }; // se inicia el objeto con el id

  if (firstName) payload.firstName = String(firstName);
  if (lastName) payload.lastName = String(lastName);
  if (email) payload.email = String(email);
  if (reputation) payload.reputation = Number(reputation);
  if (roleId) payload.roleId = Number(roleId);
  if (documentNumber) payload.documentNumber = String(documentNumber);
  if (phoneNumber) payload.phoneNumber = String(phoneNumber);
  if (typeDocumentId) payload.typeDocumentId = Number(typeDocumentId);

  const wasUpdated = await updateUserService(payload);

  if (!wasUpdated) {
    res.status(400).json(errorResponse({ message: SUCCESS_MESSAGES.userNoUpdated }));
    return;
  }
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.userUpdated }));
});

export const toggleUserStatusController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await toggleUserStatusService({ id: Number(id) });

  if (!result.status) {
    res.status(400).json(errorResponse({ message: result.message }));
    return;
  }
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.userStatusToggled }));
});

export const createUserController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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

  const hashedPassword = await bcrypt.hash(password, config.LIMIT_PASSWORD!);

  const userData: InferCreationAttributes<User, { omit: 'id' | 'createdAt' | 'updatedAt' }> = {
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

  const newUser = await createUserService(userData);
  res.status(201).json(successResponse({ message: SUCCESS_MESSAGES.userCreated, data: newUser }));
});

export const getUserByEmailController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;
  const user = await getUserByEmailService({ email });
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.userFoundEmail(email), data: user }));
});

export const getRolesController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const roles = await getRolesService();
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.rolesFound, data: roles }));
});

export const getTypeDocumentsController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const typeDocuments = await getTypeDocumentsService();
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.typeDocsFound, data: typeDocuments }));
});

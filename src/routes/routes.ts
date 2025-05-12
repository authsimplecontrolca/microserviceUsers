import { Router } from 'express';
import {
  createUserValidator,
  EmailUserValidation,
  filterUsersValidator,
  idUserValidation,
  passwordAndEmailValidator,
  updatepIsActiveValidation,
  updateUserValidator,
} from '../middleware/validations';
import {
  createUserController,
  getAllUsersController,
  getRolesController,
  getTypeDocumentsController,
  getUserByEmailController,
  getUserByIdController,
  toggleUserStatusController,
  updatePasswordController,
  updateUserController,
} from '../controllers/controllers';
import { allValidator } from '../utils/expressValidator';

export const router: Router = Router();

// TODO: validaciones para que solo los usuarios puedan hacer peticiones sobre usuarios de su empresa
// y tener en cuenta que el superadmin puede ver todo en general
// Crear un nuevo usuario
router.post('/create', createUserValidator, allValidator, createUserController);

// Obtener un usuario por ID
router.get('/find/:id', idUserValidation, allValidator, getUserByIdController);

router.get('/find/login/:email', EmailUserValidation, allValidator, getUserByEmailController);

// Obtener todos los usuarios
router.get('/all', filterUsersValidator, allValidator, getAllUsersController);

// Deshabilitar  y habilitar un usuario por ID
router.put('/toggle/:id', idUserValidation, updatepIsActiveValidation, allValidator, toggleUserStatusController);

// Recuperar contraseña
router.put('/update/password', passwordAndEmailValidator, allValidator, updatePasswordController);

// Actualizar un usuario por ID
router.put('/update/:id', idUserValidation, updateUserValidator, allValidator, updateUserController);

// ------------ roles y tipos ------------

// trae todos los roles activos
router.get('/roles', getRolesController);

// trae todo los tipos de documentos activos
router.get('/typeDocuments', getTypeDocumentsController);

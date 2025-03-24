import { Router } from 'express';
import {
  createUserValidator,
  EmailUserValidation,
  filterUsersValidator,
  idUserValidation,
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
  updateUserController,
} from '../controllers/controllers';

export const router: Router = Router();
// TODO: validaciones para que solo los usuarios puedan hacer peticiones sobre usuarios de su empresa
// y tener en cuenta que el superadmin puede ver todo en general
// Crear un nuevo usuario
router.post('/create', createUserValidator, createUserController);

// Obtener un usuario por ID
router.get('/find/:id', idUserValidation, getUserByIdController);

router.get('/find/login/:email', EmailUserValidation, getUserByEmailController);

// Obtener todos los usuarios
router.get('/all', filterUsersValidator, getAllUsersController);

// Deshabilitar  y habilitar un usuario por ID
router.put('/toggle/:id', idUserValidation, toggleUserStatusController);

// Actualizar un usuario por ID
router.put('/update/:id', idUserValidation, updateUserValidator, updateUserController);



// ------------ roles y tipos ------------

// trae todos los roles activos
router.get('/roles', getRolesController);

// trae todo los tipos de documentos activos
router.get('/typeDocuments', getTypeDocumentsController);

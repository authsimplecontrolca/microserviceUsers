import { body } from 'express-validator';
import {
  createdByValidation,
  documentNumberOptionaValidation,
  documentNumberValidation,
  emailLoginValidation,
  emailOptionaValidation,
  emailRecoverValidation,
  emailValidation,
  idValidation,
  phoneNumberOptionaValidation,
  phoneNumberValidation,
  roleIdOptionalValidation,
  roleIdValidation,
  typeDocumentOptionaValidation,
  typeDocumentValidation,
  updatedByValidation,
} from './findInfo';
import { allValidator } from '../utils/expressValidator';

export const filterUsersValidator = [
  // Validación de fecha inicial
  body('dateInit')
    .optional()
    .isISO8601()
    .withMessage('Por favor, ingresa una fecha válida para la fecha inicial (formato: YYYY-MM-DD).')
    .bail(), // Detiene la validación si esta falla

  // Validación de fecha final
  body('dateEnd')
    .optional()
    .isISO8601()
    .withMessage('Por favor, ingresa una fecha válida para la fecha final (formato: YYYY-MM-DD).')
    .bail(), // Detiene la validación si esta falla

  // Validación de que ambas fechas deben ser proporcionadas o ninguna
  body('dateInit')
    .custom((value, { req }) => {
      const dateEnd = req.body.dateEnd;
      if ((value && !dateEnd) || (!value && dateEnd)) {
        throw new Error('Si decides incluir una fecha inicial, también debes incluir una fecha final, o viceversa.');
      }
      return true;
    })
    .bail(), // Detiene la validación si esta falla

  // Validación de que la fecha inicial no sea mayor que la final si ambas existen
  body('dateInit')
    .custom((value, { req }) => {
      const dateEnd = req.body.dateEnd;
      if (dateEnd && value && new Date(value) > new Date(dateEnd)) {
        throw new Error('La fecha inicial no puede ser posterior a la fecha final.');
      }
      return true;
    })
    .bail(), // Detiene la validación si esta falla

  // Validación del estado
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage("El estado debe ser 'true' o 'false'. Por favor, elige uno de estos valores.")
    .bail(), // Detiene la validación si esta falla

  // Validación del parámetro de búsqueda
  body('search')
    .optional()
    .isString()
    .withMessage('El parámetro de búsqueda debe ser una palabra o frase.')
    .isLength({ min: 1, max: 100 })
    .withMessage('El texto de búsqueda debe tener entre 1 y 100 caracteres.')
    .bail(), // Detiene la validación si esta falla

  // Validación del rol
  body('roleId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Por favor, selecciona un rol válido, con un número entero mayor que 0.')
    .bail(), // Detiene la validación si esta falla

  body('order')
    .optional()
    .isIn(['DESC', 'ASC'])
    .withMessage("El parámetro 'order' solo puede ser 'ASC' o 'DESC'.")
    .bail(), // Detiene la validación si esta falla

  // Validación del companyId
  body('companyId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Por favor, ingresa un número válido para el ID de la empresa.')
    .bail(), // Detiene la validación si esta falla

  body('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage("El parámetro 'limit' debe ser un número entero mayor o igual a 1.")
    .bail(), // Detiene la validación si esta falla

  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage("El parámetro 'page' debe ser un número entero mayor o igual a 1.")
    .bail(), // Detiene la validación si esta falla
];

export const idUserValidation = [
  ...idValidation, // Valida si el correo es único
];

export const EmailUserValidation = [
  ...emailLoginValidation, // Valida si el correo es único
];

export const updateUserValidator = [
  // Validación de `firstName`
  body('firstName')
    .optional()
    .isString()
    .withMessage('Por favor, ingresa un nombre válido.')
    .notEmpty()
    .withMessage('El nombre no puede estar vacío.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre debe tener entre 3 y 50 caracteres.')
    .bail(), // Detiene la validación si esta falla

  // Validación de `lastName`
  body('lastName')
    .optional()
    .isString()
    .withMessage('Por favor, ingresa un apellido válido.')
    .notEmpty()
    .withMessage('El apellido no puede estar vacío.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El apellido debe tener entre 3 y 50 caracteres.')
    .bail(), // Detiene la validación si esta falla

  // Validación de `email`
  body('email')
    .optional()
    .isEmail()
    .withMessage('Por favor, ingresa un correo electrónico válido.')
    .normalizeEmail()
    .bail(), // Detiene la validación si esta falla

  ...emailOptionaValidation, // Valida si el correo es único

  ...documentNumberOptionaValidation,

  ...phoneNumberOptionaValidation,

  ...typeDocumentOptionaValidation,

  ...roleIdOptionalValidation,

  ...updatedByValidation,

  // Validación de `reputation` (opcional, por si se actualiza)
  body('reputation').optional().isInt({ min: 0, max: 5 }).withMessage('La reputación debe estar entre 0 y 5.').bail(), // Detiene la validación si esta falla
];

export const createUserValidator = [
  // Validación de `firstName`
  body('firstName')
    .isString()
    .withMessage('El primer nombre debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El primer nombre no puede estar vacío.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El primer nombre debe tener entre 3 y 50 caracteres.')
    .bail(), // Detiene la validación si esta falla

  // Validación de `lastName`
  body('lastName')
    .isString()
    .withMessage('El apellido debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El apellido no puede estar vacío.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El apellido debe tener entre 3 y 50 caracteres.')
    .bail(), // Detiene la validación si esta falla

  // Validación de `email`
  body('email').isEmail().withMessage('Debe ser un correo válido.').normalizeEmail().bail(), // Detiene la validación si esta falla

  ...emailValidation, // Valida si el correo es único

  ...documentNumberValidation,

  ...phoneNumberValidation,

  ...typeDocumentValidation,

  ...roleIdValidation,

  ...createdByValidation,

  // Validación de `password`
  body('password')
    .isString()
    .withMessage('La contraseña debe ser una cadena de texto.')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres.')
    .bail(), // Detiene la validación si esta falla

  // Validación de `roleId`
  body('roleId')
    .isInt({ min: 1 })
    .withMessage('El roleId debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El roleId no puede estar vacío.')
    .bail(), // Detiene la validación si esta falla

  // Validación de `companyId`
  body('companyId')
    .isInt({ min: 1 })
    .withMessage('El companyId debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El companyId no puede estar vacío.')
    .bail(), // Detiene la validación si esta falla
];

export const passwordAndEmailValidator = [
  ...emailRecoverValidation,
  body('password')
    .isString()
    .withMessage('Por favor, ingresa una contraseña válida.')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres.')
    .notEmpty()
    .withMessage('La contraseña no puede estar vacía.')
    .bail(),

  body('repeatPassword')
    .isString()
    .withMessage('Por favor, ingresa una contraseña de confirmación válida.')
    .isLength({ min: 8 })
    .withMessage('La contraseña de confirmación debe tener al menos 8 caracteres.')
    .notEmpty()
    .withMessage('La contraseña de confirmación no puede estar vacía.')
    .bail(),

  body('repeatPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden.');
    }
    return true;
  }),
];

export const updatepIsActiveValidation = [
  ...updatedByValidation, // Valida si el correo es único
];

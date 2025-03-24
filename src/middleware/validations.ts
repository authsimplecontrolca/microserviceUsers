import { body } from 'express-validator';
import { documentNumberValidation, emailLoginValidation, emailValidation, idValidation, phoneNumberValidation, roleIdValidation, typeDocumentValidation } from './findInfo';
import { allValidator } from '../utils/expressValidator';

export const filterUsersValidator = [
  // Validación de fecha inicial
  body('dateInit')
    .optional()
    .isISO8601()
    .withMessage('Por favor, ingresa una fecha válida para la fecha inicial (formato: YYYY-MM-DD).'),

  // Validación de fecha final
  body('dateEnd')
    .optional()
    .isISO8601()
    .withMessage('Por favor, ingresa una fecha válida para la fecha final (formato: YYYY-MM-DD).'),

  // Validación de que ambas fechas deben ser proporcionadas o ninguna
  body('dateInit').custom((value, { req }) => {
    const dateEnd = req.body.dateEnd;
    if ((value && !dateEnd) || (!value && dateEnd)) {
      throw new Error('Si decides incluir una fecha inicial, también debes incluir una fecha final, o viceversa.');
    }
    return true;
  }),

  // Validación de que la fecha inicial no sea mayor que la final si ambas existen
  body('dateInit').custom((value, { req }) => {
    const dateEnd = req.body.dateEnd;
    if (dateEnd && value && new Date(value) > new Date(dateEnd)) {
      throw new Error('La fecha inicial no puede ser posterior a la fecha final.');
    }
    return true;
  }),

  // Validación del estado
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage("El estado debe ser 'true' o 'false'. Por favor, elige uno de estos valores."),

  // Validación del parámetro de búsqueda
  body('search')
    .optional()
    .isString()
    .withMessage('El parámetro de búsqueda debe ser una palabra o frase.')
    .isLength({ min: 1, max: 100 })
    .withMessage('El texto de búsqueda debe tener entre 1 y 100 caracteres.'),

  // Validación del rol
  body('roleId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Por favor, selecciona un rol válido, con un número entero mayor que 0.'),

  body('order').optional().isIn(['DESC', 'ASC']).withMessage("El parámetro 'order' solo puede ser 'ASC' o 'DESC'."),

  // Validación del companyId
  body('companyId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Por favor, ingresa un número válido para el ID de la empresa.'),
  allValidator,
];

export const idUserValidation = [
  ...idValidation, // Valida si el correo es único
  allValidator,
];
export const EmailUserValidation = [
  ...emailLoginValidation, // Valida si el correo es único
  allValidator,
];

export const updateUserValidator = [
  // Validación de `firstName`
  body('firstName')
    .isString()
    .withMessage('Por favor, ingresa un nombre válido.')
    .notEmpty()
    .withMessage('El nombre no puede estar vacío.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre debe tener entre 3 y 50 caracteres.'),

  // Validación de `lastName`
  body('lastName')
    .isString()
    .withMessage('Por favor, ingresa un apellido válido.')
    .notEmpty()
    .withMessage('El apellido no puede estar vacío.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El apellido debe tener entre 3 y 50 caracteres.'),

  // Validación de `email`
  body('email').isEmail().withMessage('Por favor, ingresa un correo electrónico válido.').normalizeEmail(),

  ...emailValidation, // Valida si el correo es único

  ...documentNumberValidation,

  ...phoneNumberValidation,

  ...typeDocumentValidation,

  ...roleIdValidation,

  // Validación de `reputation` (opcional, por si se actualiza)
  body('reputation').optional().isInt({ min: 0, max: 5 }).withMessage('La reputación debe estar entre 0 y 5.'),

  // Validación de `roleId`
  body('roleId').isInt({ min: 1 }).withMessage('Por favor, selecciona un rol válido.'),
  
  allValidator,
];

export const createUserValidator = [
  // Validación de `firstName`
  body('firstName')
    .isString()
    .withMessage('El primer nombre debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El primer nombre no puede estar vacío.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El primer nombre debe tener entre 3 y 50 caracteres.'),

  // Validación de `lastName`
  body('lastName')
    .isString()
    .withMessage('El apellido debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El apellido no puede estar vacío.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El apellido debe tener entre 3 y 50 caracteres.'),

  // Validación de `email`
  body('email').isEmail().withMessage('Debe ser un correo válido.').normalizeEmail(),

  ...emailValidation, // Valida si el correo es único

  ...documentNumberValidation,

  ...phoneNumberValidation,

  ...typeDocumentValidation,

  ...roleIdValidation,

  // Validación de `password`
  body('password')
    .isString()
    .withMessage('La contraseña debe ser una cadena de texto.')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres.'),

  // Validación de `roleId`
  body('roleId')
    .isInt({ min: 1 })
    .withMessage('El roleId debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El roleId no puede estar vacío.'),

  // Validación de `companyId`
  body('companyId')
    .isInt({ min: 1 })
    .withMessage('El companyId debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El companyId no puede estar vacío.'),

  // Validación de `createdBy`
  body('createdBy')
    .isInt({ min: 1 })
    .withMessage('El createdBy debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El createdBy no puede estar vacío.'),

    
  allValidator,
];

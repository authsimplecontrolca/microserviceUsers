import { param, body } from 'express-validator';
import { User } from '../models/user';
import { Role } from '../models/role';
import { TypeDocument } from '../models/typeDocument';

// valida que el usuario exista.
export const idValidation = [
  param('id')
    .isNumeric()
    .withMessage('El ID debe ser un número')
    .custom(async (id) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error(`El usuario con el ID ${id} no se encuentra.`);
      }
    }),
];

// valida que el email este disponible
export const emailValidation = [
  body('email')
    .notEmpty()
    .withMessage('El correo no puede ser vacio.')
    .isEmail()
    .withMessage('Debe ser un correo válido')
    
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error(`El correo ${email} está asociado a un usuario, intente con un correo diferente.`);
      }
    }),
];

// valida que el email este disponible
export const emailLoginValidation = [
  param('email')
    .notEmpty()
    .withMessage('El correo no puede ser vacio.')
    .isEmail()
    .withMessage('Debe ser un correo válido')
    
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        throw new Error(`El correo ${email} no está asociado a un usuario, intente con un correo diferente.`);
      }
    }),
];
// verifica que el número de documento este libre.
export const documentNumberValidation = [
  body('documentNumber')
    .notEmpty()
    .withMessage('El número de documento no puede estar vacío.')
    .isString()
    .withMessage('El número de documento debe ser una cadena de texto válida')
    .custom(async (documentNumber) => {
      const existingUser = await User.findOne({ where: { documentNumber } });
      if (existingUser) {
        throw new Error(`El DNI ${documentNumber} está asociado a un usuario, intente con un DNI diferente.`);
      }
    }),
];

// verifica si el número de telefono esta libre.
export const phoneNumberValidation = [
  body('phoneNumber')
    .notEmpty()
    .withMessage('El número de teléfono no puede estar vacío.')
    .isLength({ min: 7, max: 15 })
    .isString()
    .withMessage('El número de teléfono debe ser una cadena de texto válida')
    .custom(async (phoneNumber) => {
      const existingUser = await User.findOne({ where: { phoneNumber } });
      if (existingUser) {
        throw new Error(
          `El número de teléfono ${phoneNumber} está asociado a un usuario, intente con un número de teléfono diferente.`
        );
      }
    }),
];


// Validación de `roleId`
export const roleIdValidation = [
  body('roleId')
    .notEmpty()
    .withMessage('El roleId no puede estar vacío.')
    .isInt({ min: 1 })
    .withMessage('El roleId debe ser un número entero válido.')
    .custom(async (roleId) => {
      const existingRole = await Role.findByPk(roleId); // Verificamos si el roleId existe en la tabla Role
      if (!existingRole) {
        throw new Error(`El roleId ${roleId} no existe en la base de datos.`);
      }
    }),
];

// Validación de `typeDocument`
export const typeDocumentValidation = [
  body('typeDocumentId')
    .notEmpty()
    .withMessage('El tipo de documento no puede estar vacío.')
    .isInt({ min: 1 })
    .withMessage('El tipo de documento debe ser un número entero válido.')
    .custom(async (typeDocumentId) => {
      const existingTypeDocument = await TypeDocument.findByPk(typeDocumentId); // Verificamos si el typeDocument existe en la tabla TypeDocument
      if (!existingTypeDocument) {
        throw new Error(`El tipo de documento con ID ${typeDocumentId} no existe en la base de datos.`);
      }
    }),
];
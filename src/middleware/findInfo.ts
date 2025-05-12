import { param, body } from 'express-validator';
import { User } from '../models/user';
import { Role } from '../models/role';
import { TypeDocument } from '../models/typeDocument';

export const cleanToken = (token?: string): string | null => {
  if (!token) return null; // Si no hay token, retornamos null
  return token.replace(/^Bearer\s+/i, '').trim(); // Eliminamos "Bearer " si está presente
};

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
    })
    .bail(),
];

// valida que el usuario exista.
export const createdByValidation = [
  body('createdBy')
    .isNumeric()
    .withMessage('El createdBy debe ser un número')
    .custom(async (createdBy) => {
      const user = await User.findByPk(createdBy);
      if (!user) {
        throw new Error(`El usuario con el createdBy ${createdBy} no se encuentra.`);
      }
    })
    .bail(),
];

// valida que el usuario exista.
export const updatedByValidation = [
  body('updatedBy')
    .isNumeric()
    .withMessage('El updatedBy debe ser un número')
    .custom(async (updatedBy) => {
      const user = await User.findByPk(updatedBy);
      if (!user) {
        throw new Error(`El usuario con el updatedBy ${updatedBy} no se encuentra.`);
      }
    })
    .bail(),
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
    })
    .bail(),
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
    })
    .bail(),
];
// valida que el email este disponible
export const emailRecoverValidation = [
  body('email')
    .notEmpty()
    .withMessage('El correo no puede ser vacio.')
    .isEmail()
    .withMessage('Debe ser un correo válido')

    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        throw new Error(`El correo ${email} no está asociado a un usuario, intente con un correo diferente.`);
      }
    })
    .bail(),
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
    })
    .bail(),
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
    })
    .bail(),
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
    })
    .bail(),
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
    })
    .bail(),
];

// export const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = cleanToken(authHeader); // Limpia el token sin importar su formato

//     if (!token) {
//       return res.status(401).json({
//         status: false,
//         message: "Token no proporcionado",
//       });
//     }

//     // Verificar el token
//     const decoded = await TokenService.verifyToken(token);

//     if (!decoded || !decoded.status) {
//       return res.status(401).json({
//         status: false,
//         message: decoded.message || "Token inválido",
//       });
//     }

//     next();
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: "Error al validar el token",
//     });
//   }
// };

// #################################### versiones opcionales  ###########################################################

// valida que el email este disponible
export const emailOptionaValidation = [
  body('email')
    .optional()
    .notEmpty()
    .withMessage('El correo no puede ser vacio.')
    .isEmail()
    .withMessage('Debe ser un correo válido')
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error(`El correo ${email} está asociado a un usuario, intente con un correo diferente.`);
      }
    })
    .bail(),
];

// verifica que el número de documento este libre.
export const documentNumberOptionaValidation = [
  body('documentNumber')
    .optional()
    .isString()
    .withMessage('El número de documento debe ser una cadena de texto válida')
    .custom(async (documentNumber) => {
      const existingUser = await User.findOne({ where: { documentNumber } });
      if (existingUser) {
        throw new Error(`El DNI ${documentNumber} está asociado a un usuario, intente con un DNI diferente.`);
      }
    })
    .bail(),
];

// verifica si el número de telefono esta libre.
export const phoneNumberOptionaValidation = [
  body('phoneNumber')
    .optional()
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
    })
    .bail(),
];

// Validación de `roleId`
export const roleIdOptionalValidation = [
  body('roleId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El roleId debe ser un número entero válido.')
    .custom(async (roleId) => {
      const existingRole = await Role.findByPk(roleId); // Verificamos si el roleId existe en la tabla Role
      if (!existingRole) {
        throw new Error(`El roleId ${roleId} no existe en la base de datos.`);
      }
    })
    .bail(),
];

// Validación de `typeDocument`
export const typeDocumentOptionaValidation = [
  body('typeDocumentId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El tipo de documento debe ser un número entero válido.')
    .custom(async (typeDocumentId) => {
      const existingTypeDocument = await TypeDocument.findByPk(typeDocumentId); // Verificamos si el typeDocument existe en la tabla TypeDocument
      if (!existingTypeDocument) {
        throw new Error(`El tipo de documento con ID ${typeDocumentId} no existe en la base de datos.`);
      }
    })
    .bail(),
];

import { QueryTypes } from 'sequelize';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { TypeDocument } from '../../models/typeDocument';

export const getAllUsersService = async ({
  dateInit,
  dateEnd,
  isActive,
  search,
  roleId,
  companyId,
  page = 1, // Página por defecto es la 1
  limit = 10, // Número de resultados por página por defecto
  order = 'DESC',
}: {
  dateInit: string;
  dateEnd: string;
  isActive: boolean;
  search: string;
  roleId: number;
  companyId: number;
  page?: number; // Página que se solicita
  limit?: number; // Número de resultados por página
  order?: string;
}) => {
  try {
    // Calcular el offset para la paginación
    const offset = (page - 1) * limit;
    console.log({
      dateInit,
      dateEnd,
      isActive,
      search,
      roleId,
      companyId,
      page, // Página por defecto es la 1
      limit, // Número de resultados por página por defecto
    });

    // Construir la consulta SQL con los filtros y paginación
    const query = `
      SELECT 
      u.id, 
      u.firstName, 
      u.lastName, 
      u.email, 
      u.isGoogle, 
      u.isActive, 
      u.reputation, 
      u.roleId,
      u.typeDocumentId,
      u.documentNumber,
      u.phoneNumber,
      u.companyId,
      r.roleName,
      r.isActive AS activeRole,
      td.typeDocumentName,
      td.isActive AS activeTypeDocument,
      c.companyName,
      c.isActive AS activeCompany
      FROM users as u
      INNER JOIN roles as r on (u.roleId = r.id)
      INNER JOIN type_documents as td on (u.typeDocumentId = td.id)
      INNER JOIN companies as c on (c.id = u.companyId)
      WHERE (:dateInit IS NULL OR u.createdAt >= :dateInit)
      AND (:dateEnd IS NULL OR u.createdAt <= :dateEnd)
      AND (:isActive IS NULL OR u.isActive = :isActive)
      AND (:search IS NULL OR (u.firstName LIKE :search OR u.lastName LIKE :search OR u.email LIKE :search))
      AND (:roleId IS NULL OR u.roleId = :roleId)
      AND (:companyId IS NULL OR u.companyId = :companyId)
      ORDER BY u.id ${order} LIMIT :limit OFFSET :offset 
    `;

    // Ejecutar la consulta con los parámetros dinámicos
    const users = await User.sequelize?.query(query, {
      replacements: {
        dateInit: dateInit || null,
        dateEnd: dateEnd || null,
        isActive: isActive === undefined ? null : isActive,
        search: search ? `%${search}%` : null,
        roleId: roleId || null,
        companyId: companyId || null,
        limit: limit,
        offset: offset,
      },
      type: QueryTypes.SELECT,
      logging: (sql) => console.log('Ejecutando SQL:', sql),
    });

    // Obtener el total de usuarios para la paginación
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM users as u
      INNER JOIN roles as r on (u.roleId = r.id)
      INNER JOIN type_documents as td on (u.typeDocumentId = td.id)
      INNER JOIN companies as c on (c.id = u.companyId)
      WHERE (:dateInit IS NULL OR u.createdAt >= :dateInit)
      AND (:dateEnd IS NULL OR u.createdAt <= :dateEnd)
      AND (:isActive IS NULL OR u.isActive = :isActive)
      AND (:search IS NULL OR (u.firstName LIKE :search OR u.lastName LIKE :search OR u.email LIKE :search))
      AND (:roleId IS NULL OR u.roleId = :roleId)
      AND (:companyId IS NULL OR u.companyId = :companyId)
    `;

    // Ejecutar la consulta para obtener el total de usuarios
    const totalResult: any = await User.sequelize?.query(countQuery, {
      replacements: {
        dateInit: dateInit || null,
        dateEnd: dateEnd || null,
        isActive: isActive || null,
        search: search ? `%${search}%` : null,
        roleId: roleId || null,
        companyId: companyId || null,
      },
      type: QueryTypes.SELECT,
    });

    const totalUsers = totalResult && totalResult[0] ? totalResult[0].total : 0;

    // Devolver la respuesta con los usuarios y la información de paginación
    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      perPage: limit,
    };
  } catch (error: any) {
    console.log(error);

    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};

export const getUserByIdService = async ({ id }: { id: number }) => {
  try {
    // Construir la consulta SQL para obtener el usuario con datos del rol y la compañía
    const query = `
     SELECT 
      u.id, 
      u.firstName, 
      u.lastName, 
      u.email, 
      u.isGoogle, 
      u.isActive, 
      u.reputation, 
      u.roleId,
      u.typeDocumentId,
      u.documentNumber,
      u.phoneNumber,
      u.companyId,
      r.roleName,
      r.isActive AS activeRole,
      td.typeDocumentName,
      td.isActive AS activeTypeDocument,
      c.companyName,
      c.isActive AS activeCompany
      FROM users u
      INNER JOIN roles r ON u.roleId = r.id
      INNER JOIN type_documents as td on (u.typeDocumentId = td.id)
      INNER JOIN companies as c on (c.id = u.companyId)
      WHERE u.id = :id
    `;

    // Ejecutar la consulta con el parámetro I
    const user = await User.sequelize?.query(query, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });

    return user![0]; // Sequelize devuelve un array, devolver el primer elemento
  } catch (error: any) {
    console.log(error);

    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};

export const getUserByEmailService = async ({ email }: { email: string }) => {
  try {
    // Construir la consulta SQL para obtener el usuario con datos del rol y la compañía
    const query = `
      SELECT 
      u.id, 
      u.firstName, 
      u.lastName, 
      u.email, 
      u.isGoogle, 
      u.isActive, 
      u.reputation, 
      u.roleId,
      u.typeDocumentId,
      u.documentNumber,
      u.phoneNumber,
      u.companyId,
      u.password,
      r.roleName,
      r.isActive AS activeRole,
      td.typeDocumentName,
      td.isActive AS activeTypeDocument,
      c.companyName,
      c.isActive AS activeCompany
      FROM users u
      INNER JOIN roles r ON u.roleId = r.id
      INNER JOIN type_documents as td on (u.typeDocumentId = td.id)
      INNER JOIN companies as c on (c.id = u.companyId)
      WHERE u.email = :email
    `;

    // Ejecutar la consulta con el parámetro I
    const user = await User.sequelize?.query(query, {
      replacements: { email },
      type: QueryTypes.SELECT,
    });

    return user![0]; // Sequelize devuelve un array, devolver el primer elemento
  } catch (error: any) {
    console.log(error);

    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};

export const getRolesService = async () => {
  try {
    // Ejecutar la consulta con el parámetro I
    const roles = await Role.findAll({ where: { isActive: true } });

    return { totalRoles: roles.length, roles };
  } catch (error: any) {
    console.log(error);

    throw new Error('Error al obtener los roles: ' + error.message);
  }
};

export const getTypeDocumentsService = async () => {
  try {
    // Ejecutar la consulta con el parámetro I
    const typeDocuments = await TypeDocument.findAll({ where: { isActive: true } });

    return { totalTypeDocuments: typeDocuments.length, typeDocuments };
  } catch (error: any) {
    console.log(error);

    throw new Error('Error al obtener los tipos de documentos: ' + error.message);
  }
};

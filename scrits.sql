
-- 1. Insertar tipos de documentos (DNI, PA, CE, RUC)
INSERT INTO type_documents (typeDocumentName, createdAt, updatedAt) VALUES
('DNI', NOW(), NOW()),
('PA', NOW(), NOW()),
('CE', NOW(), NOW()),
('RUC', NOW(), NOW());

-- 2. Insertar tipos de roles (ADMIN, USER)
INSERT INTO roles (roleName, createdAt, updatedAt) VALUES
('ADMIN', NOW(), NOW()),
('USER', NOW(), NOW());

-- 3  Insertar rutas de USER
INSERT INTO routes (routePattern, description, isActive, roleIds, createdAt, updatedAt)
VALUES
  ('/api/user/create', 'Crear un nuevo usuario', true, '[1]', NOW(), NOW()),
  ('/api/user/find/:id', 'Obtener un usuario por ID', true, '[1]', NOW(), NOW()),
  ('/api/user/find/login/:email', 'Obtener un usuario por email', true, '[1]', NOW(), NOW()),
  ('/api/user/all', 'Obtener todos los usuarios', true, '[1]', NOW(), NOW()),
  ('/api/user/toggle/:id', 'Deshabilitar o habilitar un usuario por ID', true, '[1]', NOW(), NOW()),
  ('/api/user/update/:id', 'Actualizar un usuario por ID', true, '[1]', NOW(), NOW()),
  ('/api/user/roles', 'Trae todos los roles activos', true, '[1]', NOW(), NOW()),
  ('/api/user/typeDocuments', 'Trae todos los tipos de documentos activos', true, '[1]', NOW(), NOW());
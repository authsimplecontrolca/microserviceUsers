-- 1. Crear tabla `roles` con `createdAt` y `updatedAt` por defecto
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  isActive BOOLEAN DEFAULT true,
  deactivateUsersOnDisable BOOLEAN DEFAULT false,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Crear tabla `type_documents` con `createdAt` y `updatedAt` por defecto
CREATE TABLE IF NOT EXISTS type_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  isActive BOOLEAN DEFAULT true,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Crear tabla `users` con `createdAt` y `updatedAt` por defecto
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  documentNumber VARCHAR(255) NOT NULL UNIQUE,
  typeDocument INT NOT NULL,
  phoneNumber VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  companyId INT NOT NULL,
  password VARCHAR(255),
  isGoogle BOOLEAN DEFAULT false,
  isActive BOOLEAN DEFAULT true,
  reputation INT DEFAULT 0,
  roleId INT NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (typeDocument) REFERENCES type_documents(id),
  FOREIGN KEY (roleId) REFERENCES roles(id)
);

-- 4. Insertar tipos de documentos (DNI, PA, CE, RUC)
INSERT INTO type_documents (name) VALUES
('DNI'),
('PA'),
('CE'),
('RUC');

-- 5. Insertar tipos de roles (ADMIN, USER)
INSERT INTO roles (name) VALUES
('ADMIN'),
('USER');

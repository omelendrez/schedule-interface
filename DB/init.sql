INSERT INTO `escng_schedule`.`status` 
(`name`, `created_at`, `updated_at`) 
VALUES 
('Activo', NOW(), NOW()), ('Inactivo', NOW(), NOW());

INSERT INTO `escng_schedule`.`profile` 
(`name`, `created_at`, `updated_at`) 
VALUES 
('Administrador', NOW(), NOW()), ('Supervisor', NOW(), NOW());

INSERT INTO `escng_schedule`.`user`
(`user_name`, `password`, `full_name`, `profile_id`, `status_id`, `created_at`, `updated_at`)
VALUES
('omar.melendrez', 'master1*', 'Omar Melendrez', 1, 1, NOW(), NOW());

INSERT INTO `escng_schedule`.`branch`
(`name`, `status_id`, `created_at`, `updated_at`)
VALUES
('Donado', 1, NOW(), NOW());

INSERT INTO `escng_schedule`.`sector`
(`name`, `created_at`, `updated_at`)
VALUES
('Entrenamiento', NOW(), NOW()),
('Cocina', NOW(), NOW()),
('Cajas', NOW(), NOW()),
('Cafetería', NOW(), NOW()),
('Salón', NOW(), NOW()),
('Depositos', NOW(), NOW()),
('Eventos', NOW(), NOW());

INSERT INTO `escng_schedule`.`position`
(`sector_id`, `name`, `color`, `created_at`, `updated_at`)
SELECT id, `name`, '#001f3f', NOW(), NOW() 
FROM `escng_schedule`.`sector`
WHERE `name` = 'Entrenamiento';

INSERT INTO `escng_schedule`.`position`
(`sector_id`, `name`, `color`, `created_at`, `updated_at`)
SELECT id, 'Elaboración', '#0074D9', NOW(), NOW() 
FROM `escng_schedule`.`sector`
WHERE `name` = 'Cocina';

INSERT INTO `escng_schedule`.`position`
(`sector_id`, `name`, `color`, `created_at`, `updated_at`)
SELECT id, 'Cocción', '#7FDBFF', NOW(), NOW() 
FROM `escng_schedule`.`sector`
WHERE `name` = 'Cocina';

INSERT INTO `escng_schedule`.`position`
(`sector_id`, `name`, `color`, `created_at`, `updated_at`)
SELECT id, 'Runner', '#39CCCC', NOW(), NOW() 
FROM `escng_schedule`.`sector`
WHERE `name` = 'Cajas';

INSERT INTO `escng_schedule`.`position`
(`sector_id`, `name`, `color`, `created_at`, `updated_at`)
SELECT id, 'Cajero', '#3D9970', NOW(), NOW() 
FROM `escng_schedule`.`sector`
WHERE `name` = 'Cajas';

INSERT INTO `escng_schedule`.`position`
(`sector_id`, `name`, `color`, `created_at`, `updated_at`)
SELECT id, 'Barra', '#2ECC40', NOW(), NOW() 
FROM `escng_schedule`.`sector`
WHERE `name` = 'Cafetería';

INSERT INTO `escng_schedule`.`position`
(`sector_id`, `name`, `color`, `created_at`, `updated_at`)
SELECT id, 'Mozo', '#01FF70', NOW(), NOW() 
FROM `escng_schedule`.`sector`
WHERE `name` = 'Cafetería';

INSERT INTO `escng_schedule`.`position`
(`sector_id`, `name`, `color`, `created_at`, `updated_at`)
SELECT id, 'Servicio', '#FFDC00', NOW(), NOW() 
FROM `escng_schedule`.`sector`
WHERE `name` = 'Salón';

INSERT INTO `escng_schedule`.`position`
(`sector_id`, `name`, `color`, `created_at`, `updated_at`)
SELECT id, 'Valle', '#FF851B', NOW(), NOW() 
FROM `escng_schedule`.`sector`
WHERE `name` = 'Salón';

INSERT INTO `escng_schedule`.`position`
(`sector_id`, `name`, `color`, `created_at`, `updated_at`)
SELECT id, `name`, '#FF4136', NOW(), NOW() 
FROM `escng_schedule`.`sector`
WHERE `name` = 'Depósitos';

INSERT INTO `escng_schedule`.`position`
(`sector_id`, `name`, `color`, `created_at`, `updated_at`)
SELECT id, `name`, '#85144b', NOW(), NOW() 
FROM `escng_schedule`.`sector`
WHERE `name` = 'Eventos';
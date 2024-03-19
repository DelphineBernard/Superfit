BEGIN;

TRUNCATE TABLE "role" CASCADE;

INSERT INTO "role" ("name") VALUES

('Utilisateur'),
('Administrateur');

COMMIT;
INSERT INTO "barbers" ("id", "name", "email", "password", "shopName", "slug", "plan", "createdAt", "updatedAt")
VALUES (
  'admin-user-id-001', 
  'Admin Visage', 
  'admin@gmail.com', 
  '$2b$10$hkQRfiN9klGTqSq6pBKU3.6Tw.QGzGhopsTYNFBIgqmSk1Vz8ctOK', 
  'Visage Studio', 
  'admin-visage', 
  'PRO', 
  NOW(), 
  NOW()
)
ON CONFLICT ("email") DO UPDATE SET "password" = EXCLUDED."password";

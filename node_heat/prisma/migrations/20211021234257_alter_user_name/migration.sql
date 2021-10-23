-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HEAT_USERS" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "github_id" INTEGER NOT NULL,
    "name" TEXT,
    "login" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "pix" TEXT
);
INSERT INTO "new_HEAT_USERS" ("avatar_url", "github_id", "id", "login", "name", "pix") SELECT "avatar_url", "github_id", "id", "login", "name", "pix" FROM "HEAT_USERS";
DROP TABLE "HEAT_USERS";
ALTER TABLE "new_HEAT_USERS" RENAME TO "HEAT_USERS";
CREATE UNIQUE INDEX "HEAT_USERS_pix_key" ON "HEAT_USERS"("pix");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

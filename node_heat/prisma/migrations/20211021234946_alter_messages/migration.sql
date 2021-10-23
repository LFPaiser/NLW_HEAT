/*
  Warnings:

  - You are about to drop the column `createdAt` on the `HEAT_MESSAGES` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HEAT_MESSAGES" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "HEAT_MESSAGES_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "HEAT_USERS" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HEAT_MESSAGES" ("id", "text", "user_id") SELECT "id", "text", "user_id" FROM "HEAT_MESSAGES";
DROP TABLE "HEAT_MESSAGES";
ALTER TABLE "new_HEAT_MESSAGES" RENAME TO "HEAT_MESSAGES";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

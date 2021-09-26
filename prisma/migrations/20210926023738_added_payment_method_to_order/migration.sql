-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "itemsTotal" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "addressDelivery" TEXT NOT NULL DEFAULT '',
    "paymentMethod" TEXT NOT NULL DEFAULT 'cash'
);
INSERT INTO "new_Order" ("addressDelivery", "id", "idUsuario", "itemsTotal", "status", "total") SELECT "addressDelivery", "id", "idUsuario", "itemsTotal", "status", "total" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

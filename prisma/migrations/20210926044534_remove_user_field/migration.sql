/*
  Warnings:

  - You are about to drop the column `idUsuario` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `Checkout` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" REAL NOT NULL,
    "itemsTotal" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "addressDelivery" TEXT NOT NULL DEFAULT '',
    "paymentMethod" TEXT NOT NULL DEFAULT 'cash'
);
INSERT INTO "new_Order" ("addressDelivery", "id", "itemsTotal", "paymentMethod", "status", "total") SELECT "addressDelivery", "id", "itemsTotal", "paymentMethod", "status", "total" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_Checkout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idProducto" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "Checkout_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Checkout" ("id", "idProducto", "quantity") SELECT "id", "idProducto", "quantity" FROM "Checkout";
DROP TABLE "Checkout";
ALTER TABLE "new_Checkout" RENAME TO "Checkout";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

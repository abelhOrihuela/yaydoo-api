-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idOrder" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "OrderItem_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItem" ("id", "idOrder", "quantity", "total") SELECT "id", "idOrder", "quantity", "total" FROM "OrderItem";
DROP TABLE "OrderItem";
ALTER TABLE "new_OrderItem" RENAME TO "OrderItem";
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "itemsTotal" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "addressDelivery" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Order" ("id", "idUsuario", "itemsTotal", "status", "total") SELECT "id", "idUsuario", "itemsTotal", "status", "total" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

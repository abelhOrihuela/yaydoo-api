-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Checkout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "Checkout_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Checkout" ("id", "idProducto", "idUsuario", "quantity") SELECT "id", "idProducto", "idUsuario", "quantity" FROM "Checkout";
DROP TABLE "Checkout";
ALTER TABLE "new_Checkout" RENAME TO "Checkout";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

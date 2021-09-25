-- CreateTable
CREATE TABLE "Checkout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL
);

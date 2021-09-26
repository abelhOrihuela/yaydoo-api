import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const products = [
        {
            name: "Refresco",
            description: "Refresco 250 ml",
            price: 10,
            sku: "REF-3020-"
        },
        {
            name: "Refresco",
            description: "Refresco 250 ml",
            price: 15,
            sku: "REF-3020-"
        },
        {
            name: "Refresco",
            description: "Refresco 250 ml",
            price: 20,
            sku: "REF-3020-"
        },
        {
            name: "Refresco",
            description: "Refresco 250 ml",
            price: 30,
            sku: "REF-3020-"
        },
        {
            name: "Refresco",
            description: "Refresco 250 ml",
            price: 40,
            sku: "REF-3020-"
        },
    ]
    
    const insertProducts = products.map((l, i) => {
        return prisma.product.create({
            data: {
                name: l.name,
                description: l.description,
                price: l.price,
                sku: l.sku + i
            }
        })
    })

    await Promise.all(insertProducts)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
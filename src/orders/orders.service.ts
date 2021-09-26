import { Injectable } from '@nestjs/common';
import { Prisma, Order } from './../../prisma/generated/dbml';
import { PrismaService } from './../prisma.service';
import Pagination from './../helpers/pagination';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async getAllByUser(idUsuario, page, perPage): Promise<Pagination> {
        const skip = page > 0 ? (page - 1) * perPage : 0;

        const pagination: Pagination = {
            data: await this.prisma.order.findMany({
                skip,
                take: perPage,
                where: {
                    idUsuario
                },
            }),
            page: page,
            total: await (await this.prisma.order.findMany({
                where: {
                    idUsuario
                }
            })).length,
            perPage: perPage,
            nextPage: page + 1,
        };

        return pagination;
    }

    async create(idUsuario: number, addressDelivery: string, paymentMethod: string): Promise<Order> {
        const products = await this.prisma.checkout.findMany({
            where: {
                idUsuario
            },
            include: {
                product: true,
            }});

        const order = await this.prisma.order.create({
            data: {
                idUsuario: 1,
                total: products.map(l => l.product.price * l.quantity).reduce((prev, next) => prev + next, 0),
                itemsTotal: products.length,
                status: "created",
                addressDelivery,
                paymentMethod
            }
        })

        const createManyPosts = products.map(checkout => {
            return this.prisma.orderItem.create({
                data: {
                    idOrder: order.id,
                    total: checkout.product.price * checkout.quantity,
                    quantity: checkout.quantity
                }
            })
        })
        const deleteManyPosts = products.map(checkout => {
            return this.prisma.checkout.delete({
                where: {
                    id: checkout.id
                }
            })
        })

        Promise.all(createManyPosts);
        Promise.all(deleteManyPosts);
        
        return this.prisma.order.findFirst({
            where: { id: order.id },
            include: {
                items: true,
            } });
    }
}

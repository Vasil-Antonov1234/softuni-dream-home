import { prisma } from "../lib/prisma.js"

export default {
    async createOne(data, userId) {
        return await prisma.property.create({
            data: {
                ...data,
                ownerId: userId
            }
        })
    },

    async getLatest() {
        return await prisma.property.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 3
        });
    },

    async getAll() {
        return await prisma.property.findMany();
    },

    async getById(propertyId) {
        return await prisma.property.findUnique({
            where: {
                id: propertyId
            }
        });
    },

    async update(parsedPropertyData, propertyId, userId) {
        return await prisma.property.update({
            where: {
                id: propertyId,
                ownerId: userId
            },
            data: {
                ...parsedPropertyData
            }
        })
    }
}
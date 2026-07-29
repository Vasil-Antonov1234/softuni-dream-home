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
            include: {
                owner: {
                    select: {
                        email: true
                    }
                }
            },
            take: 3
        });
    },

    async getReport() {
        return await prisma.property.findMany({
            select: {
                type: true,
                contact: true,
                location: true,
                area: true,
                price: true,
                description: true,
                owner: {
                    select: {
                        email: true
                    }
                },
                createdAt: true,
            },
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
            },
            include: {
                likeBy: true
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
    },

    async remove(propertyId, userId) {
        return await prisma.property.delete({
            where: {
                id: propertyId,
                ownerId: userId
            }
        });
    },

    async like(propertyId, userId) {
        return await prisma.property.update({
            where: {
                id: propertyId
            },
            data: {
                likeBy: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
    }
}
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
    }
}
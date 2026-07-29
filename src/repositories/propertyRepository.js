import { prisma } from "../lib/prisma.js"

export default {
    async createOne(data) {
        return await prisma.property.create({
            data: {
                ...data
            }
        })
    }
}
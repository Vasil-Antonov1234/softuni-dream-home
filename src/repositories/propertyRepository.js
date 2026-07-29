import { prisma } from "../lib/prisma.js"

export default {
    async createOne(data, userId) {

        console.log(data)
        console.log(userId)

        return await prisma.property.create({
            data: {
                ...data,
                ownerId: userId
            }
        })
    }
}
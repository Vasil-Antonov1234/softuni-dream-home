import propertyRepository from "../repositories/propertyRepository.js"

export default {
    async createOne(data, userId) {
        return await propertyRepository.createOne(data, userId);
    }
}
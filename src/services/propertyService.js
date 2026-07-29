import propertyRepository from "../repositories/propertyRepository.js"

export default {
    async createOne(data) {
        return await propertyRepository.createOne(data);
    }
}
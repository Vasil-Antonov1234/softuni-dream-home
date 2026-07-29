import propertyRepository from "../repositories/propertyRepository.js"

export default {
    async createOne(data, userId) {
        return await propertyRepository.createOne(data, userId);
    },

    async getLatest() {
        return propertyRepository.getLatest();
    },

    async getAll() {
        return await propertyRepository.getAll();
    },

    async getById(propertyId) {
        return await propertyRepository.getById(propertyId);
    }
}
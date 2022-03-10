export const createUser = (payload) => {
    try {
        return payload

    } catch (error) {
        throw { message: "Error Creating User ", error }
    }
}
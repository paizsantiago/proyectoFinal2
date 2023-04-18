const { loggerError } = require('../../Config/loggerConfig')

const getHome = (req) => {
    try {
        const { nombre } = req.user;
        const user = { username: nombre };
        return user;
    } catch (error) {
        loggerError.error({msg: `${error}`})
    }
};

const getInfoUser = async (req) => {
    try {
        const { nombre, email, password, direccion, edad, telefono, avatar } =
        req.user;
        const infoUser = {
            nombre,
            email,
            password,
            direccion,
            edad,
            telefono,
            avatar,
        };
        return infoUser;
    } catch (error) {
        loggerError.error({msg: `${error}`})
    }
};

module.exports = { 
    getInfoUser,
    getHome
}
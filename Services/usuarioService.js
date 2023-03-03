const getHome = (req) => {
    const { nombre } = req.user;
    const user = { username: nombre };
    return user;
};

const getInfoUser = async (req) => {
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
    console.log(infoUser)
    return infoUser;
};

module.exports = { 
    getInfoUser,
    getHome
}
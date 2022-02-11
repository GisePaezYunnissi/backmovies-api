//Variable contenedora

const registerContent = [];

export const createNewUser = (req, res) => {
    //Tomamos el usuario
    let user = req.body;

    //Checamos que no exista ese email
    let index = registerContent.findIndex(u => u.email == user.email);

    //Si no existe, lo agregamos
    if (index == -1) {
        registerContent.push(user);
        res.send({
            status: 'OK',
            registerContent
        });
        //si ya existe el mail, lo descartamos
    } else {
        res.send({
            status: 'NOT OK',
            registerContent
        })
    }
};

//Funcion que devuelve todo el carrito
export const getAllUser = (req, res) => {
    res.send(registerContent);
}
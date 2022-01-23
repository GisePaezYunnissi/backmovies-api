const cartContent = [];

export const getCart = (req, res) => {
    res.send(cartContent);
}

export const addToCart = (req, res) => {
    const itemToAdd = req.body;
    
    if(cartContent.findIndex(movie => movie.imdbID === itemToAdd.imdbID) <0){
        cartContent.push(itemToAdd);
        res.send({
            status: 'OK',
            cartContent
            });
    } else {
        res.send({
            status: 'NOT OK',
            cartContent
        });
    }
}
export const removeFromCart = (req,res) => {
    const id = (req.query.id);

    const indexToRemove = cartContent.findIndex(movie => movie.imdbID == id);

    if(indexToRemove >= 0){
        cartContent.splice(indexToRemove,1);
        res.send({
            status: 'OK',
            cartContent
         });
    } else {
        res.send({
            status: 'NOT OK',
            cartContent
        });
    }
}
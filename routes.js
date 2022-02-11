import {addToCart,getCart,removeFromCart, clearCart} from "./controllers/cart.controller.js";
import { getTest } from "./controllers/test.controller.js";
import { validateCredentials } from "./controllers/login.controller.js";
import express from "express"
import jwt from 'jsonwebtoken';
import { SECRET_KEY} from './config/config.js';
import { createNewUser, getAllUser } from './controllers/register.controller.js';

export const routes = (app) => {

  app.route("/api/test").get(getTest);

  //Para el carrito
  app.route("/api/cart")
    .get(checkToken, getCart);
  app.route("/api/cart")
    .post(checkToken, addToCart);
  app.route("/api/cart")
    .delete(checkToken, removeFromCart);

  app.route("/api/cart/clear")
    .delete(clearCart);

  //Para el login
  app.route("/api/login")
  .post( validateCredentials);

  //Para el registro
  app.route('/api/register')
        .post(createNewUser)
        .get(getAllUser)
};

const checkToken = express.Router();
checkToken.use((req, res, next) => {
  let token = req.headers["authorization"];
  token = token.replace('Bearer ', '');

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decode) => {
      //Si existe error
      if (err) {
        return res.json({ 
            status: "NOT - OK", 
            mensaje: 'Invalid token'
        });
      } else {
        req.decode = decode;
        console.log("Movie ok");
        next();
      }
    });
  } else {
    //Si no hay token
    res.send({ 
        status: "NOT - OK", 
        mensaje: 'Token not given'
    });
  }
});

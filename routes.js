import {addToCart,getCart,removeFromCart} from "./controllers/cart.controller.js";
import { getTest } from "./controllers/test.controller.js";
import { validateCredentials } from "./controllers/login.controller.js";
import express from "express"
import jwt from 'jsonwebtoken';
import { SECRET_KEY} from './config/config.js';

export const routes = (app) => {

  app.route("/api/test").get(getTest);

  //Para el carrito
  app.route("/api/cart")
    .get(checkToken, getCart);
  app.route("/api/cart")
    .post(checkToken, addToCart);
  app.route("/api/cart")
    .delete(checkToken, removeFromCart);

  //Para el login
  app.route("/api/login")
  .post( validateCredentials);

/*   app.route("/api/cart", checkToken)
    .get(getCart)
    .post(addToCart)
    .delete(removeFromCart);

  app.route("/api/login")
    .post(validateCredentials); */
};

const checkToken = express.Router();
checkToken.use((req, res, next) => {
  let token = req.headers["authorization"];
  token = token.replace('Bearer ', '');

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      //Si existe error
      if (err) {
        return res.json({ 
            status: "NOT - OK", 
            mensaje: 'Invalid token'
        });
      } else {
        req.decoded = decoded;
        console.log("error");
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

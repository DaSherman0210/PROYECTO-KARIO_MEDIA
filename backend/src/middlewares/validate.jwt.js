import { express, response, request } from "express";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config();

const bases = process.env.MONGO_URI;
const nombrebase = "Kario";
const client = new MongoClient(bases);

const connectToMongo = async () => {
    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('usuarios');
        return collection;
    } catch (error) {
        console.log(error, "Error al conectar con la base de datos. VALIDATE.JWT");
    }
}

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('user-token');
    if (!token) {
        return res.status(401).json({
            msg: "No existe token en la petición. Acción denegada."
        })
    }

    try {
        const collection = await connectToMongo();
        const { uid } = jwt.verify(token, process.env.PRIVATE_OR_SECRET_KEY);
        const usuario = await collection.findOne(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: "Token inválido, el usuario no existe en la base de datos."
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Token inválido, el usuario está inactivo."
            })
        }

        req.usuario = usuario;
        console.log("Solicitud de usuario en validación del token.", req.usuario);
        next();
    } catch (error) {
        console.log(error);
        response.status(401).json({
            msg: "Token inválido."
        })
    }
}

export default validateJWT;
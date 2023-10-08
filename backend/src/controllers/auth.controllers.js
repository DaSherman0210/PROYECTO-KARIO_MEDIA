import { response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { generateJWT } from "../helpers/generate.JWT.js"

dotenv.config();

const bases = process.env.MONGO_URI;
const nombrebase = "Kario";
const client = new MongoClient(bases);

const connectToMongo = async () => {
    try {
      await client.connect();
      const db = client.db(nombrebase);
      const collection = db.collection("usuarios");
      return collection;
    } catch (error) {
      throw new Error(
        error,
        "Error al conectar a la base de datos. USUARIOS.CONTROLLERS"
      );
    }
  };

const login = async (req, res) => {
    const { email, password } = req.body;
    const collection = await connectToMongo();
    try {
        const usuario = await collection.findOne({ email });

        if(!usuario){
            return res.status(404).json({
                msg: "Usuario inexistente."
            })
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: "Usuario inactivo."
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg: "Contraseña incorrecta."
            })
        }

        const token = await generateJWT(usuario.id);

        res.status(202).json({
            msg: "Ingreso exitoso.",
            usuario,
            token,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            msg: "Login fallido. Contacte al servicio técnico."
        })
    }
}

const logout = async (req, res = response) => {
    try {
        res.status(200).json({
            msg: "Cierre de sesión exitoso."
        })
    } catch (error) {
        console.log(error);
        return res.json({
            msg: "Error al intentar cerrar sesión. Contacte al servicio técnico."
        });
    }
}

export {
    login,
    logout
}

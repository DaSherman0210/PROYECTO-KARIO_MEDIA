import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

/* const bases = process.env.MONGO_URI;
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
} */

const isAdminRole = async (req, res, next) => {
    // const collection = await connectToMongo();
    const { rol, nombre } = req.usuario;

    if (!req.usuario) {
        return res.status(500).json({
            msg: "Es necesario verificar el rol antes de validar el token."
        })
    }

    /* ID del rol "ADMIN" registrado en la base de datos */
    if (rol !== ObjectId('652017a6ea25e24d9f8441f2')) {
        return res.status(401).josn({
            msg: `El usuario ${nombre} no es administrador, por lo tanto, no se permite realizar la acción.`
        })
    }

    next();
}

export default isAdminRole;
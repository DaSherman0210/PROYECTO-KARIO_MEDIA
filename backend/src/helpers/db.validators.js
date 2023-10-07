import { MongoClient, ObjectId } from 'mongodb';

const connectToMongo = async (collectionName) => {
    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection(collectionName);
        return collection;
    } catch (error) {
        console.log(error, `Error al conectar a la base de datos. Colección: ${collectionName}`);
    }
}

const roles = await connectToMongo('roles');
const usuarios = await connectToMongo('usuarios');
const indicadores = await connectToMongo('indicadores');
const reportes = await connectToMongo('reportes');
const ayudas = await connectToMongo('ayudas');

const isValidRole = async (rol = '') => {
    const existeRol = await roles.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe en la base de datos. BD.VALIDATORS.`)
    }
}

export {
    isValidRole
}
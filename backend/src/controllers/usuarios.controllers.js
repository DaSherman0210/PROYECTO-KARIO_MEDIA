import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
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
        console.log(error, "Error al conectar a la base de datos. USUARIOS.CONTROLLERS");
    }
}

const getUsuarios = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const query = { estado: true };
        const result = await collection.find(query).toArray();
        res.status(202).json({
            msg: "Usuarios obtenidos de la base de datos.",
            result
        })
    } catch (error) {
        console.log(error, "Error al obtener los usuarios de la base de datos. USUARIOS.CONTROLLERS");
        res.status(404).json({
            msg: "Error al obtener los usuarios de la base de datos.",
        });
    } finally {
        client.close();
    }
}

const getUsuarioById = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const query = { estado: true };
        const result = await collection.aggregate([
            {
                $match: {
                    _id: new ObjectId(req.params.id),
                    query
                }
            }
        ]).toArray();
        res.status(202).json({
            msg: "Usuario obtenido por ID.",
            result
        })
    } catch (error) {
        console.log(error, "Error al obtener usuario por ID de la base de datos. USUARIOS.CONTROLLERS");
        res.status(404).json({
            msg: "Error al obtener usuario por ID de la base de datos",
        });
    } finally {
        client.close();
    }
}

const postUsuario = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const { nombre, email, password, imagen } = req.body;
        const usuario = {
            nombre,
            email,
            password
        }
        if (imagen) {
            usuario.imagen = imagen;
        } else {
            usuario.imagen = 'avatar.jpg';
        }

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        const result = await collection.insertOne(usuario);
        res.status(202).json({
            msg: "Usuario agregado correctamente a la base de datos.",
            result
        });
    } catch (error) {
        console.log(error, "Error al agregar un nuevo usuario a la base de datos. USUARIOS.CONTROLLERS");
        res.status(404).json({
            msg: "Error al agregar un nuevo usuario a la base de datos.",
        });
    } finally {
        client.close();
    }
}

const deleteUsuario = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const id = { _id: new ObjectId(req.params.id) };
        const update = { $set: { estado: false } };
        const result = await collection.updateOne(id, update);
        res.status(202).json({
            msg: "Usuario eliminado correctamente."
        })
    } catch (error) {
        console.log(error, "Error al eliminar el usuario de la base de datos. USUARIOS.CONTROLLERS");
        res.status(404).json({
            msg: "Error al eliminar el usuario de la base de datos",
        });
    } finally {
        client.close();
    }
}

const updateUsuario = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const { id } = req.params;
        const { _id, password, ...resto } = req.body;

        if (password) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }
        const result = await collection.findOne(id, resto, { new: true });
        res.status(202).json({
            msg: "Usuario actualizado correctamente.",
            result
        })
    } catch (error) {
        console.log(error, "Error al actualizar usuario en la base de datos. USUARIOS.CONTROLLERS");
        res.status(404).json({
            msg: "Error al actualizar usuario en la base de datos",
        });
    } finally {
        client.close();
    }
}

export {
    getUsuarios,
    getUsuarioById,
    postUsuario,
    deleteUsuario,
    updateUsuario
}
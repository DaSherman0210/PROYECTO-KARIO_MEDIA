import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const bases = process.env.MONGO_URI;
const nombrebase = "Kario";
const client = new MongoClient(bases);

const connectToMongo = async () => {
    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('roles');
        return collection;
    } catch (error) {
        console.log(error, "Error al conectar a la base de datos. ROLES.CONTROLLERS");
    }
}

const getRoles = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const query = { estado: true };
        const result = await collection.find(query).toArray();
        res.status(202).json({
            msg: "Roles obtenidos de la base de datos.",
            result
        })
    } catch (error) {
        console.log(error, "Error al obtener los roles de la base de datos. ROLES.CONTROLLERS");
        res.status(404).json({
            msg: "Error al obtener los roles de la base de datos",
        });
    } finally {
        client.close();
    }
}

const getRolById = async (req, res) => {
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
            msg: "Rol obtenido de la base de datos.",
            result
        })
    } catch (error) {
        console.log(error, "Error al obtener rol por ID de la base de datos");
        res.status(404).json({
            msg: "Error al obtener el rol por ID de la base de datos."
        })
    } finally {
        client.close();
    }
}

const postRol = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const { rol } = req.body;

        const data = {
            rol: rol,
            estado: true,
        };

        const result = await collection.insertOne(data);
        res.status(202).json({
            msg: "Rol agregado correctamente a la base de datos.",
            result
        });

    } catch (error) {
        console.log(error, "Error al agregar el rol a la base de datos.");
        res.status(400).json({
            msg: "Error al agregar el rol a la base de datos."
        });
    } finally {
        client.close();
    }
}




const deleteRol = async (req, res) => {
    try {
        const id = { _id: new ObjectId(req.params.id) };
        const collection = await connectToMongo();
        const update = { $set: { estado: false } };
        const result = await collection.updateOne(id, update);
        res.status(202).json({
            msg: "Rol eliminado de la base de datos.",
        })
    } catch (error) {
        console.log(error, "Error al eliminar rol de la base de datos.");
        res.status(400).json({
            msg: "Error al eliminar rol de la base de datos."
        })
    } finally {
        client.close();
    }
}

const updateRol = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const { rol, estado } = req.body;

        const updatedData = {
            rol: rol,
            estado: estado,
        }
        const filter = { _id: new ObjectId(req.params.id) };
        const result = await collection.updateOne(filter, { $set: updatedData });

        if (result.matchedCount === 0) {
            res.status(404).json({
                msg: "No se encontró el rol para actualizar."
            });
        } else {
            res.status(202).json({
                msg: "Rol actualizado correctamente.",
                result
            })
        }
    } catch (error) {
        console.log(error, "Error al actualizar rol .");
        res.status(400).json({
            msg: "Error al actualizar rol de la base de datos."
        })
    } finally {
        client.close();
    }
}

export {
    getRoles,
    getRolById,
    deleteRol,
    postRol,
    updateRol
}

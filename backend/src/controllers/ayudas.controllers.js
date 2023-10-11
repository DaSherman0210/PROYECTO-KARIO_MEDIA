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
    const collection = db.collection("ayudas");
    return collection;
  } catch (error) {
    throw new Error(
      error,
      "Error al conectar a la base de datos. USUARIOS.CONTROLLERS"
    );
  }
};

const getAyudas = async (req, res) => {
    try {
      const collection = await connectToMongo();
      const query = { estado: true };
      const result = await collection.find(query).toArray();
      res.status(202).json({
        msg: "Ayudas obtenidas de la base de datos.",
        result,
      });
    } catch (error) {
      console.log(
        error,
        "Error al obtener las ayudas de la base de datos. AYUDAS.CONTROLLERS"
      );
      res.status(404).json({
        msg: "Error al obtener las ayudas de la base de datos.",
      });
    }
  };

  const getAyudaById = async (req, res) => {
    try {
      const collection = await connectToMongo();
      const query = { _id: new ObjectId(req.params.id), estado: true };
      const result = await collection.find(query).toArray();
  
      if (result.length === 0) {
        res.status(404).json({
          msg: "La ayuda solicitada por ID está inactiva o no se encuentra en la base de datos.",
        });
      } else {
        res.status(202).json({
          msg: "Ayuda solicitada por ID.",
          result,
        });
      }
    } catch (error) {
      console.log(
        error,
        "Error al obtener ayuda por ID de la base de datos. AYUDAS.CONTROLLERS"
      );
      res.status(404).json({
        msg: "Error al obtener usuario por ID de la base de datos",
      });
    }
  };

  const postAyuda = async (req, res) => {
    try {
      const collection = await connectToMongo();
      const { usuario, asunto, descripcion, estado } = req.body;
      const ayuda = {
        usuario: new ObjectId(usuario), 
        asunto, 
        descripcion, 
        estado: true
      };
    
      const result = await collection.insertOne(ayuda);
      res.status(202).json({
        msg: "Ayuda agregada correctamente a la base de datos.",
        ayuda,
        result,
      });
    } catch (error) {
      console.log(
        error,
        "Error al agregar una nueva ayuda a la base de datos. AYUDAS.CONTROLLERS"
      );
      res.status(404).json({
        msg: "Error al agregar una nueva ayuda a la base de datos.",
      });
    }
  };

  const deleteAyuda = async (req, res) => {
    try {
      const collection = await connectToMongo();
      const id = { _id: new ObjectId(req.params.id) };
      const update = { $set: { estado: false } };
      const result = await collection.updateOne(id, update);
      res.status(202).json({
        msg: "Ayuda eliminada correctamente.",
      });
    } catch (error) {
      console.log(
        error,
        "Error al eliminar la ayuda de la base de datos. AYUDAS.CONTROLLERS"
      );
      res.status(404).json({
        msg: "Error al eliminar la ayuda de la base de datos",
      });
    }
  };

  const updateAyuda = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const { usuario, asunto, descripcion, estado } = req.body; 
        const ayudaUpdated = {
            usuario, asunto, descripcion, estado
        };
        const filter = { _id: new ObjectId(req.params.id) };
        const result = await collection.updateOne(filter, { $set: ayudaUpdated });

        if (result.matchedCount === 0) {
            res.status(404).json({
              msg: "No se encontró la ayuda para actualizar.",
            });
          } else {
            res.status(202).json({
              msg: "Ayuda actualizada correctamente.",
              ayudaUpdated,
              result,
            });
          }
    } catch (error) {
        console.error(
          error,
          "Error al actualizar ayuda en la base de datos. AYUDAS.CONTROLLERS"
        );
        res.status(500).json({
          msg: "Error al actualizar ayuda en la base de datos",
        });
      }
}
  export {
    getAyudas,
    getAyudaById,
    postAyuda,
    deleteAyuda,
    updateAyuda
  }
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
    const collection = db.collection("indicadores");
    return collection;
  } catch (error) {
    throw new Error(
      error,
      "Error al conectar a la base de datos. INDICADORES.CONTROLLERS"
    );
  }
};

const getIndicadores = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const query = { estado: true };
        const result = await collection.find(query).toArray();
        res.status(202).json({
            msg: "Indicadores obtenidos de la base de datos. INDICADORES.CONTROLLERS",
            result
        });
    } catch (error) {
        console.log(
          error,
          "Error al obtener los indicadores de la base de datos. INDICADORES.CONTROLLERS"
        );
        res.status(404).json({
          msg: "Error al obtener los indicadores de la base de datos.",
        });
      }
}

const getIndicadorById = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const query = { _id: new ObjectId(req.params.id), estado: true };
        const result = await collection.findOne(query).toArray();

        if (result.length === 0) {
            res.status(404).json({
              msg: "El indicador solicitado por ID está inactivo o no se encuentra en la base de datos.",
            });
          } else {
            res.status(202).json({
              msg: "Indicador solicitado por ID.",
              result,
            });
          }
    } catch (error) {
        console.log(
          error,
          "Error al obtener indicador por ID de la base de datos. INDICADORES.CONTROLLERS"
        );
        res.status(404).json({
          msg: "Error al obtener indicador por ID de la base de datos.",
        });
      }
}

const postIndicador = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const { nombre, categoria, fecha_inicio, fecha_terminacion, formula, frecuencia, cumplimiento, area, descripcion, estado } = req.body; 
        const indicador = {
            nombre, 
            categoria, 
            fecha_inicio, 
            fecha_terminacion, 
            formula, 
            frecuencia, 
            cumplimiento, 
            area, 
            descripcion,
            estado: true
        };

        const result = await collection.insertOne(indicador);
        res.status(202).json({
            msg: "Indicador agregado correctamente a la base de datos.",
            indicador,
            result
        });
    } catch (error) {
        console.log(
          error,
          "Error al agregar un nuevo indicador a la base de datos. INDICADORES.CONTROLLERS"
        );
        res.status(404).json({
          msg: "Error al agregar un nuevo indicador a la base de datos.",
        });
      }
}

const deleteIndicador = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const id = { _id: new ObjectId(req.params.id) };
        const update = { $set: { estado: false }};
        const result = await collection.updateOne(id, update);
        res.status(202).json({
            msg: "Indicador eliminado correctamente de la base de datos."
        })
    } catch (error) {
        console.log(
          error,
          "Error al eliminar el indicador de la base de datos. INDICADORES.CONTROLLERS"
        );
        res.status(404).json({
          msg: "Error al eliminar el indicador de la base de datos",
        });
      } finally {
        client.close();
      }
}

const updateIndicador = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const { nombre, categoria, fecha_inicio, fecha_terminacion, formula, frecuencia, cumplimiento, area, descripcion, estado } = req.body; 
        const indicadorUpdated = {
            nombre, 
            categoria, 
            fecha_inicio, 
            fecha_terminacion, 
            formula, 
            frecuencia, 
            cumplimiento, 
            area, 
            descripcion,
            estado
        };
        const filter = { _id: new ObjectId(req.params.id) };
        const result = await collection.updateOne(filter, { $set: indicadorUpdated });

        if (result.matchedCount === 0) {
            res.status(404).json({
              msg: "No se encontró el indicador para actualizar.",
            });
          } else {
            res.status(202).json({
              msg: "Indicador actualizado correctamente.",
              indicadorUpdated,
              result,
            });
          }
    } catch (error) {
        console.error(
          error,
          "Error al actualizar indicador en la base de datos. INDICADORES.CONTROLLERS"
        );
        res.status(500).json({
          msg: "Error al actualizar indicador en la base de datos",
        });
      } finally {
        client.close();
      }
}

export {
    getIndicadores,
    getIndicadorById,
    postIndicador,
    deleteIndicador,
    updateIndicador
}
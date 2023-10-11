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
    const collection = db.collection("reportes");
    return collection;
  } catch (error) {
    throw new Error(
      error,
      "Error al conectar a la base de datos. REPORTES.CONTROLLERS"
    );
  }
};

const getReportes = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const query = { estado: true };
        const result = await collection.find(query).toArray();
        res.status(202).json({
            msg: "Reportes obtenidos de la base de datos. REPORTES.CONTROLLERS",
            result
        });
    } catch (error) {
        console.log(
          error,
          "Error al obtener los reportes de la base de datos. REPORTES.CONTROLLERS"
        );
        res.status(404).json({
          msg: "Error al obtener los reportes de la base de datos.",
        });
      }
}

const getReporteById = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const query = { _id: new ObjectId(req.params.id), estado: true };
        const result = await collection.findOne(query);

        if (result.length === 0) {
            res.status(404).json({
              msg: "El reporte solicitado por ID está inactivo o no se encuentra en la base de datos.",
            });
          } else {
            res.status(202).json({
              msg: "Reporte solicitado por ID.",
              result,
            });
          }
          client.close();
    } catch (error) {
        console.log(
          error,
          "Error al obtener reporte por ID de la base de datos. REPORTE.CONTROLLERS"
        );
        res.status(404).json({
          msg: "Error al obtener reporte por ID de la base de datos.",
        });
      }
}

const postReporte = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const { usuario, indicador, asunto, descripcion, estado } = req.body; 
        const reporte = {
            usuario: new ObjectId(usuario), 
            indicador: new ObjectId(indicador), 
            asunto, 
            descripcion,
            estado: true
        };

        const result = await collection.insertOne(reporte);
        res.status(202).json({
            msg: "Reporte agregado correctamente a la base de datos.",
            reporte,
            result
        });
    } catch (error) {
        console.log(
          error,
          "Error al agregar un nuevo reporte a la base de datos. INDICADORES.CONTROLLERS"
        );
        res.status(404).json({
          msg: "Error al agregar un nuevo reporte a la base de datos.",
        });
      } 
}

const deleteReporte = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const id = { _id: new ObjectId(req.params.id) };
        const update = { $set: { estado: false }};
        const result = await collection.updateOne(id, update);
        res.status(202).json({
            msg: "Reporte eliminado correctamente de la base de datos."
        })
    } catch (error) {
        console.log(
          error,
          "Error al eliminar el reporte de la base de datos. REPORTES.CONTROLLERS"
        );
        res.status(404).json({
          msg: "Error al eliminar el reporte de la base de datos",
        });
      }
}

const updateReporte = async (req, res) => {
    try {
        const collection = await connectToMongo();
        const { usuario, indicador, asunto, descripcion, estado } = req.body; 
        const reporteUpdated = {
            usuario, 
            indicador, 
            asunto, 
            descripcion,
            estado
        };
        const filter = { _id: new ObjectId(req.params.id) };
        const result = await collection.updateOne(filter, { $set: reporteUpdated });

        if (result.matchedCount === 0) {
            res.status(404).json({
              msg: "No se encontró el reporte para actualizar.",
            });
          } else {
            res.status(202).json({
              msg: "Reporte actualizado correctamente.",
              reporteUpdated,
              result,
            });
          }
    } catch (error) {
        console.error(
          error,
          "Error al actualizar reporte en la base de datos. REPORTES.CONTROLLERS"
        );
        res.status(500).json({
          msg: "Error al actualizar reporte en la base de datos",
        });
      }
}

export {
    getReportes,
    getReporteById,
    postReporte,
    deleteReporte,
    updateReporte
}
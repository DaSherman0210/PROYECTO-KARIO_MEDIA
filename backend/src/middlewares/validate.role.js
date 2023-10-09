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
		const collection = db.collection("usuarios");
		return collection;
	} catch (error) {
		console.log(error, "Error al conectar con la base de datos. VALIDATE.JWT");
	}
};

const isAdminRole = async (req, res, next) => {
	const collection = await connectToMongo();
	const { rol, nombre, email } = req.usuario;
	const rolNombre = await collection
		.aggregate([
			{
				$match: {
					email: email,
				},
			},
			{
				$lookup: {
					from: "roles",
					localField: "rol",
					foreignField: "_id",
					as: "nombreRol",
				},
			},
			{
				$unwind: "$nombreRol",
			},
			{
				$match: {
					"nombreRol._id": new ObjectId(rol),
				},
			},
			{
				$project: {
					"nombreRol.rol": 1,
				},
			},
		])
		.toArray();

	const rolUser = rolNombre[0].nombreRol.rol;

	if (!req.usuario) {
		return res.status(500).json({
			msg: "Es necesario verificar el rol antes de validar el token.",
		});
	}

	/* ID del rol "ADMIN" registrado en la base de datos */
	if (rolUser !== "ADMIN") {
		return res.status(401).json({
			msg: `El usuario ${nombre} no es administrador, por lo tanto, no se permite realizar la acción.`,
		});
	}

	next();
};

export { isAdminRole };

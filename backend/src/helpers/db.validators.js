import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const bases = process.env.MONGO_URI;
const nombrebase = "Kario";
const client = new MongoClient(bases);

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
    try {
        const result = await roles.findOne({ rol });
        if (!result) {
            throw new Error(`El rol ${rol} no existe en la base de datos. BD.VALIDATORS.`)
        }
    } catch (error) {
        console.log(error, "Error DB.VALIDATORS isValidRole.");    
    }
}

const emailExiste = async (email = '') => {
    try {
        const result = await usuarios.findOne({ email });
        if (result) {
            throw new Error(`El email ${email} ya está registrado. DB.VALIDATORS.`);
        }   
    } catch (error) {
        console.log(error, "Error DB.VALIDATORS emailExiste.");    
    }
}

const userExistsById = async (id) => {
    try {
        const result = await usuarios.findOne({ id });
        if (!result) {
            throw new Error(`El ID ${id} (usuario) no existe. DB.VALIDATORS.`);
        }
    } catch (error) {
        console.log(error, "Error DB.VALIDATORS userExistsById.");
    }
}

const rolExistsById = async (id) => {
    try {
        const result = await roles.findOne({ id });
        if (!result) {
            throw new Error(`El ID (rol) no existe. DB.VALIDATORS.`);
        }
    } catch (error) {
        console.log(error, "Error DB.VALIDATORS rolExistsById.");
    }
}

export {
    isValidRole,
    emailExiste,
    userExistsById,
    rolExistsById
}
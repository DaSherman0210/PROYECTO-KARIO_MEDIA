import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.PRIVATE_OR_SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err, "Error al generar token. GENERATE.JWT");
                reject('Problemas al generar JSON WEB TOKEN.');
            } else {
                resolve(token);
            }
        })
    })
}

export {
    generateJWT
};
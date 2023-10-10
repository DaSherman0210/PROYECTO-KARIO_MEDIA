import swaggerJsDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition:{
        openapi: '3.0.0',
        info: {
            title: "KarioAPI",
            version: '3.0.0',
            description: 'Documentacion de la API de karios media filtro'
        }/* 
        servers:[
            {
                url: "http://localhost:7778"
            }
        ]
        */
    },
    apis:[
        './src/routes/auth.routes.js',
        './src/routes/ayudas.routes.js',
        './src/routes/indicadores.routes.js',
        './src/routes/reportes.routes.js',
        './src/routes/roles.routes.js',
        './src/routes/usuarios.routes.js',
    ]
}

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
# <img src="./frontend/src/assets/imgs/KARIO_LOGO.png" width= "35px"> Kario Media <img src="./frontend/src/assets/imgs/KARIO_LOGO.png" width= "35px">  


## 📋 Descripcion 
<p>Un desarollador Full-syack es solicitado en hacer la continuacion del proyecto de desarrollo de un aplicativo web que pueda mostrar el panel de gestionamiento de proyectos y sus modulos necesarios para la empresa "kario media", la cual realiza licitaciones publicas y privadas de varios nichos de negocio. El equipo de UI/UX hace una entrega formal del primer flujo de entranda para la parte administrativa en el cual va desde su login hasta el acceso a su panel administrativo.

Dicho esto el proposito de este trabajo es replicar la propuesta dada por parte del equipo de UI/UX y crear los modulos de <strong>"añadir", "eliminar" "reportar" "ayuda" y "perfil (Log-In y Log-Out)"</strong> manteniendo el flujo de diseño propuesto previamente.
</p>

##  🚀 integrantes 

<strong>
<li> German Torres 
<li> Josue Giraldo
<li> Andres Rincon
</strong>

## <img src="./frontend/src/assets/imgs/database.png" width="30"> Base de datos 

![logo](./frontend/src/assets/imgs/database.jpeg)

 <p>la estructura de base de datos consta de varias tablas que estan diseñadas para gestionar informacion relacionada con usuarios, roles, asistencia, indicadores y reportes. 
 
 Acontinuacion explicamos cada tabla y sus campos:  </p>

<h3>👤 Usuarios:</h3>

<li> <strong> nombre:</strong> El nombre del usuario.

<li> <strong> Imagen:</strong>  Una imagen o avatar asociado al usuario.

<li> <strong> correo: </strong> La dirección de correo electrónico del usuario.

<li> <strong> password: </strong> La contraseña del usuario (La cual es almacenada de forma encriptada).

<li> <strong> Rol: </strong> El rol o nivel de acceso del usuario (podría ser un valor como "administrador", "usuario", etc.).

<li> <strong> Estado: </strong> El estado del usuario (true: activo, false: inactivo).


<h3>👥 Rol:</h3>

<li> <strong> Rol: </strong> Una tabla que almacena diferentes roles que los usuarios tienen dentro de el sistema. Esta relacionada con la tabla de "Usuarios" a través de una clave externa.

<h3> 🤝 Ayuda:</h3>

<li> <strong> UsuarioID:</strong> Una clave externa que se relaciona con la tabla de "Usuarios" y representa al usuario que solicita ayuda.

<li> <strong> Asunto:</strong> El asunto de la solicitud de ayuda.

<li> <strong> Descripcion:</strong> La descripción detallada de la solicitud de ayuda.

<h3>📊 Indicadores:</h3>

<li> <strong> Nombre: </strong>El nombre del indicador.

<li> <strong> Descripcion:</strong> Una descripción del indicador.

<li> <strong> Categoria: </strong>La categoría a la que pertenece el indicador.

<li> <strong> fecha_inicial: </strong>La fecha de inicio del seguimiento del indicador.

<li> <strong> Fecha_terminacion:</strong> La fecha en la que termina el seguimiento del indicador.

<li> <strong> Formula: </strong>La fórmula utilizada para calcular el indicador.

<li> <strong> frecuencia:</strong> La frecuencia con la que se recopilan datos para el indicador.

<li> <strong> Cumplimiento:</strong> El estado de cumplimiento del indicador.

<li> <strong> Area:</strong> El área o departamento responsable del indicador.

<li> <strong> Estado: </strong>El estado del indicador (true: activo, false: inactivo).

<h3> 📝 Reportes: </h3>

<li> <strong> UsuarioID:</strong>  Una clave externa que se relaciona con la tabla de "Usuarios" y representa al usuario que crea el informe.

<li> <strong> IndicadorID: </strong> Una clave externa que se relaciona con la tabla de "Indicadores" y representa el indicador al que se refiere el informe.

<li><strong>  Asunto: </strong> El asunto del informe.

<li> <strong> Descripcion: </strong> La descripción detallada del informe.



## 📚  
Inicializar el proyecto 

Primero se debe agregar en la carpeta backend el archivo **.env**, copiar la estructura que se encuentra en el archivo **.env.example** y cambiarle los datos por los siguientes (El lugar de "password" se debe cambiar por una clave la cual se le proporcionará al profesor externamente): 

PORT= 7778
MONGO_URI= mongodb+srv://joshan:password@kariocluster.x7ikp2c.mongodb.net/Kario
PRIVATE_OR_SECRET_KEY = llave

Se inicializan dos terminales, en la primera se coloca: 

```bash
cd backend 
```

```bash
npm i 
```

```bash
npm start 
```

En la segunda terminal se coloca:  

```bash
cd frontend
```

```bash
npm i 
```

```bash
npm start 
```

## <img src="./frontend/src/assets/imgs/swagger2.png" width="25"> Documentacion con Swagger

Despues de inicializado el proyecto ya va ser posible el poder probar las diferentes funcionalidades de la api en la siguiente url mediante el archivo generado por Swagger:

>http://localhost:7778/documentation 

Al abrir el link vas a poder encontrar algo parecido a la siguiente imagen:

<img src="./frontend/src/assets/imgs/swagger.jpeg" width="1000rem">
// const express = require('express')
// const app = express()
// const routes = require('./routes') // /api/routes
// const cors = require("cors");

// app.use(function(req, res, next){ //
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "content-type");
//     res.setHeader("Content-Type", "application/json");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
//    });


// app.use('/api', routes)



// app.listen(8080, function () { 
//     console.log('Aplicação executando na porta 8080!'); }); 

// app.use(cors());

// //swagger
//  const swaggerUI = require("swagger-ui-express");
//  const swaggerJsDoc = require("swagger-jsdoc");

// //const routes = require('./routes')

//  const hostname = '127.0.0.1';
//  const port = 3000;

// //swagger
// const options = {
// 	definition: {
// 		openapi: "3.0.0",
// 		info: {
// 			title: "API de Gestão de Ensino Especial",
// 			version: "1.0.0",
// 			description: `API para demonstração de Documentação API via Swagger.  
            
//             ### TD 01    
//             Disciplina: Desenvolvimento de Alicações II 2024.09 Turma 01  
//             Equipe: Luís Paulo, Maria Fernanda Esteves, Miguel Lumertz e Natali Elias
// 			`,
//       license: {
//         name: 'Licenciado para Desenvolvimento de Aplicações II',
//       },
//       contact: {
//         name: 'Luís Paulo, Maria Fernanda Esteves, Miguel Lumertz, Natali Elias e Rafaela Nicoski'
//       },
// 		},
// 		servers: [
// 			{
// 				url: "http://localhost:3000/",
//         description: 'Server de desenvolvimento',
// 			},
// 		],
// 	},
// 	apis: [__dirname + "/routes/*.js"],
// };

// const specs = swaggerJsDoc(options);

// app.use('/', routes)
// //swagger
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



//  app.listen(port, () => {
//   console.log(`Server rodando em http://${hostname}:${port}/api-docs`)
//  })

const express = require('express');
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const routes = require('./routes');

const app = express();
const port = 3000;

// Middleware CORS configurado corretamente
app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// Definição e configuração do Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gestão de Ensino Especial",
            version: "1.0.0",
            description: `API para demonstração de Documentação API via Swagger.`,
            license: { name: 'Licenciado para Desenvolvimento de Aplicações II' },
            contact: {
                name: 'Luís Paulo, Maria Fernanda Esteves, Miguel Lumertz, Natali Elias e Rafaela Nicoski'
            },
        },
        servers: [{ url: "http://localhost:3000/", description: 'Server de desenvolvimento' }],
    },
    apis: [__dirname + "/routes/*.js"],
};

const specs = swaggerJsDoc(options);

// Rotas da API e documentação
app.use('/api', routes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Inicia o servidor em uma única porta
app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}/api-docs`);
});

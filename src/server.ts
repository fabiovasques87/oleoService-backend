import express, { Request, Response, ErrorRequestHandler } from 'express';
const bodyParser = require('body-parser');
import path from 'path';
import "dotenv/config.js";
import cors from  'cors';
import apiRoutes from './routes/api';

// dotenv.config();

const server = express();

server.use(bodyParser.json());


server.use(cors());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});




// server.use((req, res, next) => {

//     res.header('Access-Control-Allow-Origin', "*"); // Permitir a origem do seu aplicativo cliente
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Permitir os métodos HTTP permitidos
//     res.header('Access-Control-Allow-Headers', 'Content-Type'); // Permitir os cabeçalhos personalizados

//      // Permitir que o navegador envie cookies junto com a requisição (se necessário)
//   res.header('Access-Control-Allow-Credentials', 'true');

    

// 	// //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
//     // res.header("Access-Control-Allow-Origin", "*");
// 	// //Quais são os métodos que a conexão pode realizar na API
//     // res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
//     next();
// });

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

server.listen(process.env.PORT);
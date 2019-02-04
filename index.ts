import Server from "./classes/server";
import { router } from './routes/routes';
import bodyParser from 'body-parser';
import CORS from 'cors';


const server = new Server();

// BodyParser
server.app.use(bodyParser.urlencoded({ extended : true}));
server.app.use(bodyParser.json());

//CORS
server.app.use(CORS({origin:true,credentials:true}));

// Rutas de mis servicios
server.app.use('/',router);

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
import dotenv from 'dotenv';
import Server from './models/server';

//manages environment variables
dotenv.config();

//uses exported class
const server = new Server();

server.listen();
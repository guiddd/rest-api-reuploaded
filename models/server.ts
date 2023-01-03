import express, {Application} from 'express';
import userRoutes from '../routes/user';
import cors from 'cors';

import db from '../db/connection';


class Server{
    private app: Application; //or express.Application
    private port: string;
    private apiPaths= {
        users: '/api/users'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8000";
        
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log('DB Working!');
        }catch(err){
            console.log(err);
        }

    }

    //executes before routes
    middlewares(){
        //CORS (cross-domain petitions by default)
        this.app.use(cors());

        //BODY (enables JSON messages as body)
        this.app.use(express.json())

        //PUBLIC FOLDER (static content)
        this.app.use(express.static('public'))

        
    }

    routes(){
        this.app.use(this.apiPaths.users, userRoutes)
    }

    //to start server
    listen(){
        this.app.listen(this.port,()=>{
            console.log('server runnig on ' + this.port)
        })
    }

}

export default Server; 
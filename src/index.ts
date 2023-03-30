import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from 'config';
import log from './utils/logger';
import dotenv from 'dotenv';
import router from './routes';
import connect from './utils/connectDb';
import deserializeUser from './middleware/deserializeUser';

dotenv.config();
const app = express();
const initialPort: number = config.get('port');
let currentPort = initialPort;

app.use(express.json());


const server = app.listen(initialPort, () => {
    log.info(`app listen in port ${initialPort}`);
    connect();
});

const switchPort = (port: number) => {
    currentPort = port;
    server.close(() => {
        server.listen(port, () => {
            log.info(`app listen in port ${port}`);
        });
    });
};

app.use(deserializeUser)

app.use((req: Request, res: Response, next: NextFunction) => {

    if (req.headers.cookie) {
        switchPort(8000)
    }
    else if(currentPort !== 8080){
        switchPort(initialPort)
    }

    return next();
});
app.use(router);



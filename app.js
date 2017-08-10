import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import protocolRouter from './routes/protocol';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import indexRouter from './routes/index';
import authorization from './auth';

// Setup express as WebServer
const app = express();
// Setup configuration options
app.config = config;
// Setup database to use our defined datasource in config/datasource.js
app.datasource = datasource(app);
// Setup authentication method
const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;
// Setup application to parse response with JSON parser
app.use(bodyParser.json());
// Setup application port variable to use when start listenning
app.set('port', 7000);
// Setup Protocol Routes
protocolRouter(app);
// Setup User Routes
userRouter(app);
// Setup Authentication Route
authRouter(app);
// Setup Main Index Page Route
indexRouter(app);

export default app;

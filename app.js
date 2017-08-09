import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import protocolRouter from './routes/protocol';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import authorization from './auth';

// Setup express as WebServer
const app = express();
// Setup configuration options
app.config = config;
// Setup database to use our defined datasource in config/datasource.js
app.datasource = datasource(app);
// Setup authentication method
app.auth = authorization(app);
app.use(app.auth.initialize());
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


// Setup Main Index Page to return app name and version
app.route('/')
  .get((req, res) => {
    res.send({ name: 'Alex', version: '1.0' });
  });

export default app;

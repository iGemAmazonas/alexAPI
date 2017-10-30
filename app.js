import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import authorization from './auth';
import authRouter from './routes/auth';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import stepsRouter from './routes/steps';
import keywordsRouter from './routes/keywords';
import commentsRouter from './routes/comments';
import referencesRouter from './routes/references';
import equipmentsRouter from './routes/equipments';
import materialsRouter from './routes/materials';
import protocolsRouter from './routes/protocols';


// Setup express as WebServer
const app = express();
// Setup configuration options
app.config = config;
// Setup database to use our defined datasource in config/datasource.js
app.datasource = datasource(app);
// Setup enable helmet to secute the application
app.use(helmet());
// Setup enable all CORS requests
app.use(cors());
// Setup authentication method
const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;
// Setup application to parse response with JSON parser
app.use(bodyParser.json());
// Setup application port variable to use when start listenning
app.set('port', 7000);
// Setup Routes
indexRouter(app);
authRouter(app);
usersRouter(app);
stepsRouter(app);
keywordsRouter(app);
commentsRouter(app);
referencesRouter(app);
equipmentsRouter(app);
materialsRouter(app);
protocolsRouter(app);

export default app;

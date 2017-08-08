import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import protocolRouter from './routes/protocol';

// Setup express as WebServer
const app = express();
// Setup configuration options
app.config = config;
// Setup database to use our defined datasource in config/datasource.js
app.datasource = datasource(app);
// Setup application to parse response with JSON parser
app.use(bodyParser.json());
// Setup application port variable to use when start listenning
app.set('port', 7000);
// Setup Protocol Routes
protocolRouter(app);

// Setup Test Page on http://localhost:7000/ to return app name and version
app.route('/')
  .get((req, res) => {
    res.send({ name: 'Alex', version: '1.0' });
  });

export default app;

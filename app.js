import express from 'express';
import config from './config/config';
import datasource from './config/datasource';

const app = express();


app.config = config;
app.datasource = datasource(app);

const Protocol = app.datasource.models.Protocol;


//o servidor passa a ser acessado localmente através do link http://localhost:7000/
app.set('port', 7000);

// retorna todos os protocolos
app.route('/protocols')
  .get((req, res) => {
    Protocol.findAll({})
      .then(result => res.json(result))
      .catch(err => res.stat(412));
  });

//versão do app
const version = { "name": "Alex",
                "version": "1.0"  };

//ao acessar http://localhost:7000/ ele retorna e o nome e a versão do aplicativo
app.route('/')
  .get((req, res) => {
    res.send(version);
  });

export default app;

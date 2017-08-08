import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';

const app = express();

app.config = config;
app.datasource = datasource(app);

const Protocol = app.datasource.models.Protocol;

// o servidor passa a ser acessado localmente através do link http://localhost:7000/
app.set('port', 7000);
app.use(bodyParser.json());

// retorna todos os protocolos
app.route('/protocol')
  .get((req, res) => {
    Protocol.findAll({})
      .then(result => res.json(result))
      .catch(err => res.status(412));
  })
  .post((req, res) => {
    Protocol.create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(412));
  });

app.route('/protocol/:id')
  // retorna o protocolo por ip
  .get((req, res) => {
    Protocol.findOne({ where: req.params })
      .then(result => res.json(result))
      .catch(err => res.status(412));
  })
  .put((req, res) => {
    Protocol.update(req.body, { where: req.params })
      .then(result => res.json(result))
      .catch(err => res.status(412));
  })
  .delete((req, res) => {
    Protocol.destroy({ where: req.params })
      .then(result => res.sendStatus(204))
      .catch(err => res.status(412));
  });

// versão do app
const version = { name: 'Alex',
  version: '1.0' };

// ao acessar http://localhost:7000/ ele retorna e o nome e a versão do aplicativo
app.route('/')
  .get((req, res) => {
    res.send(version);
  });

export default app;

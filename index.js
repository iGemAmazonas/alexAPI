var express = require('express')
var app = express()

//o servidor passa a ser acessado localmente através do link http://localhost:3000/
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//ao acessar http://localhost:3000/ ele retorna e o nome e a versão do aplicativo
app.get('/', function (req, res) {
  res.send(version)
})

//versão do app
var version = { "name": "Alex",
                "version": "1.0"  };

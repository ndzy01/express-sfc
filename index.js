const open = require('open');
const express = require('express');
const path = require('path');
const app = express();
const interfaces = require('os').networkInterfaces(); //服务器本机地址
const config = require('./config');
let IPAdress = '';
for (const devName in interfaces) {
  const iface = interfaces[devName];
  for (let i = 0; i < iface.length; i++) {
    const alias = iface[i];
    if (
      alias.family === 'IPv4' &&
      alias.address !== '127.0.0.1' &&
      !alias.internal
    ) {
      IPAdress = alias.address;
    }
  }
}

// Routes
app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/user', (req, res) => {
  res.send([
    {
      title: 'serverless framework',
      link: 'https://serverless.com'
    }
  ]);
});

app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  res.send({
    id: id,
    title: 'serverless framework',
    link: 'https://serverless.com'
  });
});
app.get('/test', (req, res) => {
  res.send({
    data: 'test'
  });
});

app.get('/404', (req, res) => {
  res.status(404).send('Not found');
});

app.get('/500', (req, res) => {
  res.status(500).send('Server Error');
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send('Internal Serverless Error');
});

app.listen(8080, async () => {
  if (!config.isDev) {
    console.log(`http://${IPAdress}:8080`);
  } else {
    await open(`http://${IPAdress}:8080`);
  }
});
module.exports = app;

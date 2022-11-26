const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./database');
const globalStatController = require('./controller/global-stat.controller');
const keyValueContoller = require('./controller/key-value.contoller');

async function launchServer() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Hello' });
  });

  app.get('/global-stats', globalStatController.getAll);
  app.post('/global-stats', globalStatController.insertOrUpdate);
  app.delete('/global-stats', globalStatController.remove);

  app.get('/key-value/:key', keyValueContoller.get);
  app.post('/key-value', keyValueContoller.insertOrUpdate);
  app.delete('/key-value/:key', keyValueContoller.remove);

  try {
    await sequelize.sync();
    console.log('database is ready');
  } catch (error) {
    console.log('Unable to connect to the database');
    console.log(error);
    process.exit(1);
  }

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

launchServer();

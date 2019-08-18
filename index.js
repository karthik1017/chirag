const express = require('express');
const app = express();
const { routes } = require('./routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5000;
const helmet = require('helmet');

app.use(helmet());

app.use(express.json());
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Content-Length, x-auth");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    if(req.method == 'OPTIONS') {
      res.send(204);
      //next();
    } else {
      next();
    }

    //res.send(200);
});

app.use((req, res, next) => {
    console.log(`${req.method}-${req.url}-${req.ip}-${new Date()}`);
    next();
})

app.use(cors());

app.use('/',routes);

app.listen(5000, () => {
    console.log(`Listening on port ${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const config = require('config');


//Initializam expressul intr o variabila
const app = express();

//Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongooseURI');

//Connect to Mongo
mongoose
     .connect(db,
          {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useCreateIndex: true

          })
     .then(() => console.log('MongoDB Connected...'))
     .catch(err => console.log(err));

//Use Routes
// app.get('/', (req, res) => {
//      return res.json({
//           msg: "Blood Donation Management"
//      });
// });

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

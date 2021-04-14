const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'ejs');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

app.use('/auth', require('./routes/auth.router'));
app.use('/api', require('./routes/api.auth'));

app.get('/', (req, res) => {
  res.type('html');
  res.render('index', {
    title: 'Home',
    active: 'home'
  });
});

const PORT = config.get('PORT') || 3000;

async function startApp() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    app.listen(PORT, () => console.log(colors.bgGreen.black(`App has been started on port ${PORT}...\n`)));

  } catch (e) {
    console.log(colors.bgRed.black(`Server error: ${e.message}`));
    process.exit(1);
  }
}

startApp();
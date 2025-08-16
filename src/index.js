  const express = require('express');
  const dotenv = require('dotenv');
  const cors = require('cors');
  const helmet = require('helmet');
  const morgan = require('morgan');
  require('express-async-errors');
  const path = require('path');

  const connectDB = require('./config/db');
  const router = require('./routes/adminRoutes');
  const { errorHandler } = require('./middleware/errorHandler');

  dotenv.config();

  const PORT = process.env.PORT || 4000;

  const app = express();

  app.use(helmet());
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // static uploads
  app.get('/',async (req, res) =>{
      res.send('Welcome to the Course Management API');
  })
  app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));

  app.use('/api', router);

  app.use(errorHandler);

  connectDB()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('Failed to connect DB', err);
      process.exit(1);
    });
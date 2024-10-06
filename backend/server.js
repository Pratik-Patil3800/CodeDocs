const express = require('express');
const projectRoutes=require('./gitlab_manage')
const authRoutes=require('./auth')
const docsRoutes=require('./getdoc')
const getproject=require('./displayprojects')
const app = express();
const PORT = 3001;
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

require('dotenv').config();


mongoose.connect(process.env.MONGODB_CONNECTION_STRING);


const cors = require('cors');

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(cookieParser());


app.use(express.json());

app.use('/api/project',projectRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/generate-docs',docsRoutes);
app.use('/api/retrive',getproject);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
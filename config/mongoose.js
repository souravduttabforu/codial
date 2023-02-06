const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codial_dev');

const db = mongoose.connection;
mongoose.set('strictQuery', false);
db.on('error',console.error.bind(console,'Error connecting to MongoDB'));
db.once('open',function(){
    console.log('Connected to database :: MongoDB');
})

module.exports =db;
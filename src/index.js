import express from 'express';
import bodyParser from 'body-parser';
import AuthRouter from './routes';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

mongoose.connect('mongodb://testdb:123qwe@ds163480.mlab.com:63480/testdb_21',{});
mongoose.Promise = global.Promise;


app.use(cors());
app.use(bodyParser.urlencoded({encoded:false}));
app.use(bodyParser.json());

AuthRouter(app);

app.get('/',(req,res) => {
    res.send("Server is running");
});


app.listen(3300,() => console.log("server is running..."));
import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use( "/api/user",router);
app.use("/api/blog", blogRouter); 

 
mongoose.connect('mongodb://127.0.0.1:27017/BlogApp',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( () => {
    app.listen(5000);
}).then(() => console.log('connected to database on port 5000')).catch((err) => console.log(err));
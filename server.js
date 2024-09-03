const express=require('express');
const app=express();
const {connection}=require('./config/db');
const cors=require('cors');
port=5001;

//database connectivity
connection("mongodb://localhost:27017/OnlineProjectManagementSystem").then(()=>{
    console.log("Mongodb connected");
}).catch((err)=>{
    console.log("Mongodb disconnected",err);
})

//data pasring middlewear
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.urlencoded({extended:true}));
app.use(cors());

//routes
const userRoute=require('./routes/userRoute');
const project=require('./routes/newProjectRoute')

app.use('/api/user',userRoute);
app.use('/projects',project)


app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})
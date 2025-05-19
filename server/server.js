const express=require('express');
const { connect } = require('./config/dbConfig');
const { userRouter } = require('./routes/usersRoute');
const cors=require("cors");
const { productRoute } = require('./routes/productsRoute');
const app = express();
app.use(cors());
app.use(express.json())
const port=process.env.PORT || 5000;
connect()
app.use('/api/users',userRouter)
app.use('/api/product',productRoute)
app.listen(port,()=>console.log(`server runing in port${port}`))
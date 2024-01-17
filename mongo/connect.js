const mongoose =require('mongoose')

const connectDB =async()=>{
    try {
       await  mongoose.connect(
            process.env.MONGO_DB,
      { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log(" Blog Database connected successfully");

    }catch (error) {
        console.log("mogooose id broken",error);
        
    }
}

 module.exports=connectDB
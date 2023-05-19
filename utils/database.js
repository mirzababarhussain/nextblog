import mongoose, { Query } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {


mongoose.set('strictQuery',true);

if(isConnected){
    console.log('Mongo DB connected');
    return
}

try {

    await mongoose.connect(process.env.MONGODB_URL,{
        dbName:'share_prompt',
        useNewUrlParser: true,
        useUnifiedTopology:true
    })

    isConnected = true;
    console.log('MONGDB CONNECTED BAHI');
    
} catch (error) {
    console.log(error);
}
}
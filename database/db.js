const mongoose = require('mongoose')

const connectToDB = async ()=>{
try{
await mongoose.connect(process.env.MONGO_URL);
         console.log('Mongodb connected successfully');
}
catch(e){
    console.error('mongodb connection')
    process.exit(1)
    }

}
module.exports = { connectToDB}
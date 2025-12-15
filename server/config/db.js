import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}; 

export default ConnectDB; 
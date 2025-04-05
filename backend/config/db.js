import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb://aman:aman1234@ac-z0jme7e-shard-00-00.dm7nrel.mongodb.net:27017,ac-z0jme7e-shard-00-01.dm7nrel.mongodb.net:27017,ac-z0jme7e-shard-00-02.dm7nrel.mongodb.net:27017/kerevat-cafe?ssl=true&replicaSet=atlas-6rrc3r-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("DB Connected"));
};

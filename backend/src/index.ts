import mongoose from "mongoose";
import "dotenv/config";
import { app } from "./app";



const port = process.env.PORT || 8000;




app.listen(port, () => {
  console.log(`Server is conncted to port:${port}`);
});


mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connected to your DB");
  })
  .catch((error) => console.log("Connection Failed!!", error));

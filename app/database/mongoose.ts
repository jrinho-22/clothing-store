import mongoose from "mongoose"
import { uri } from "../helpers/const";
import seed from "./seed";

const mongooseConnect = async () =>{
    await mongoose.connect(uri);
    await seed()
}

export default mongooseConnect
import mongooseConnect from "./database/mongoose";
import './server/server'
import instance, { Server } from "./server/server";
import './controllers/index'

async function main() {
  await mongooseConnect()
  instance.listen()
}

main().catch(console.error);

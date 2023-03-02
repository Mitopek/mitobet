import express from 'express';
import "reflect-metadata";
import setupRoutes from "./setup/setupRoutes.js";
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from "body-parser";
import setupContainer from "./setup/setupContainer.js";
dotenv.config()

const app = express();
const container = await setupContainer()

//TODO DEV ONLY
app.use(cors())
app.use(bodyParser.json())

setupRoutes(app, container)
console.info('listening', process.env.PORT)

app.listen(process.env.PORT)


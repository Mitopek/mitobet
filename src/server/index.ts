import express from 'express';
import "reflect-metadata";
import setupRoutes from "./setup/setupRoutes.js";
import * as dotenv from 'dotenv'
import setupContainer from "./setup/setupContainer.js";
import executeOnStartupTasks from "./setup/executeOnStartupTasks.js";
dotenv.config({path: './.env.node'})

const app = express();
const container = await setupContainer()

const apiRouter = express.Router()

app.use('/api', apiRouter);

setupRoutes(apiRouter, container)
const port = process.env.API_PORT
app.listen(port, () => console.info('listening', port))

await executeOnStartupTasks(container)

import express from 'express';
import "reflect-metadata";
import setupRoutes from "./setup/setupRoutes.js";
import * as dotenv from 'dotenv'
import setupContainer from "./setup/setupContainer.js";
import executeOnStartupTasks from "./setup/executeOnStartupTasks.js";
dotenv.config()

const app = express();
const container = await setupContainer()

setupRoutes(app, container)
const port = process.env.PORT
app.listen(port, () => console.info('listening', port))

await executeOnStartupTasks(container)

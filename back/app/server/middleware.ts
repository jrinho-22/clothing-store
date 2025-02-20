import instance, { Server } from "./server";
import express from 'express';
import cors from 'cors';

const useMiddleware = (instance: any) => {
    const app = instance.app
    app.use(cors()) 
    app.use(express.json())

    instance.app = app
}

export default useMiddleware
import express from "express"
import { NextFunction, Request, Response } from "express";
import client from "prom-client"
import { metricsMiddleware } from "./metrics";


const app=express();

app.use(metricsMiddleware)


app.get("/user",async (req,res)=>{
    res.json({
        name:"arun",
        age:25
    })
})

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})
app.listen(3000)
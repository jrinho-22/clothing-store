import { Request } from "express";
import { credentialLookup, passwordCheckLookup, saveUser, User } from "../schemas/users";
import instance from "../server/server";
import * as core from "express-serve-static-core";
import express from 'express';
import { IUsersDto } from "../interface/userDto";

const app = instance.app

app.get('/user/:id', async (req, res) => {
    const userId = req.params.id
    User.findById(userId).then((user) => {
        res.send(user);
    }).catch(erro => {
        res.status(500).json({
            message: "An error occurred while retrieving the users.",
            error: erro.message || "Unknown error"
        });
    })
});

app.post('/user', async (req, res) => {
    saveUser(req.body).then((user) => {
        res.send(user);
    }).catch(erro => {
        res.status(500).json({
            message: "An error occurred while creating users.",
            error: erro.message || "Unknown error"
        });
    })
});

app.post("/user/credential_lookup", async (req: Request<core.ParamsDictionary, { challenge: "password" } | { message: string, error: string }, { email: string }>, res) => {
    const credential = await credentialLookup(req.body.email)
    console.log(credential)
    if (credential) {
        res.send({ challenge: "password" });
    } else {
        res.status(404).json({
            message: "An error occurred while retrieving the users.",
            error: "Not Found"
        });
    }
})

app.post("/user/credential_lookup/:email", async (req: Request<core.ParamsDictionary, IUsersDto | { message: string, error: string }, { password: string }>, res) => {
    const userEmail = req.params.email
    const credential = await passwordCheckLookup(userEmail, req.body.password)
    if (credential) {
        res.send(credential);
    } else {
        res.status(404).json({
            message: "Incorrect Password",
            error: "Not Found"
        });
    }
})

app.get('/user', async (req, res) => {
    User.find().then((user) => {
        if (!user || !user.length) {
            res.status(404).json({
                message: "No user found"
            });
        }
        res.send(user);
    }).catch(erro => {
        res.status(500).json({
            message: "An error occurred while retrieving the users.",
            error: erro.message || "Unknown error"
        });
    })
}); 

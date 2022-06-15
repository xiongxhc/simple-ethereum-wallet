import { Request, Response } from "express";
import { encrypt } from "../utils/encryption"

const registerUser = (req: Request, res: Response) => {
    const { username, password } = req.body;

    // TODO: Create ethereum address
    const eth_address = ""

    const data = {
        username,
        password: encrypt({str: password}),
        eth_address,
        created_on: new Date().getTime()
    }

    // TODO: Assign data to database

    return res.status(200).json({ username, eth_address });
}

export default {
    post: registerUser
}
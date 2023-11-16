import {Request, Response} from "express";

function sayHello (req: Request, res: Response) {
    res.status(500).json({data: 'hello world'})
}

export default {
    sayHello
}

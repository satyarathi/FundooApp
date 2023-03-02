import HttpStatus from 'http-status-codes';
import { client } from "../config/redis";

export const isRedis = async(req, res, next) => {
    const data = await client.get('getall');

    if (data != null) {
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: JSON.parse(data),
            message: 'all notes fetched successfully by redis'

        })
    } else {
        next();
    }
}
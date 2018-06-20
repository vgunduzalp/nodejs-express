import exporess from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../../models/User';



const route = () => {
    const router = new exporess.Router();
    
    router.route('/').get((req,res) => {
        res.send("User Id "+req.tokenData.userId);
    });

    

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/classrooms`
}
import exporess from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../../models/User';



const route = () => {
    const router = new exporess.Router();
    
    router.route('/login').post((req,res) => {
        const {email,password} = req.body;

        User.findOne({email:email}).then((user)=>{

            if(!user){
                res.send({
                    status: false,
                    message: 'Böyle bir email adresi sistemde kayıtlı değil.'
                });
            }else{
                const passwordHashed = crypto.createHmac('sha256',config.passSecret).update(password).digest('hex');

                if(user.password === passwordHashed){
    
                    const token = jwt.sign({userId: user._id},config.jwtSecret);
    
                    User.update({email:email},{
                        $set:{
                            lastLogin: new Date()
                        }
                    }).then(()=>{});

                    res.send({
                        status: true,
                        token: token,
                        message: 'İşlem başarılı.'
                    });
                }else{
                    res.send({
                        status: false,
                        message: 'Hatalı şifre girdiniz.'
                    });
                }
            }

        });


        

    })

    router.route('/sign-up').post((req,res)=>{
        const {email,password}  = req.body;
        const passwordHashed = crypto.createHmac('sha256',config.passSecret).update(password).digest('hex');
        
        const newUser = new User({
            email: email,
            password:passwordHashed
        });

        newUser.save().then((data) => {
            res.send({
                status: true,
                user:data
            });
        },(err)=>{
            res.send({
                status: false,
                error:err
            });
        } )

    })

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/auth`
}
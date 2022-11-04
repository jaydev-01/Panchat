const jwt = require('jsonwebtoken');
const authMiddleware = (req,res,next) => {
    try {
        const authHeader = req.headers["authorization"];
        // console.log(authHeader);
        const token = authHeader && authHeader?.split(" ")[1];
        // console.log(token);
        if(!token) res.status(301).send("Unauthorized Access!");
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if(err) res.status(303).send(`Unauthorized Access! ${err}`);
                req.user = user;
                next();
            })
        }
    }catch (error){
        return res.status(500).send({
            success : false,
            message: error || "Some error in token",
            data: null    
        })
    }
}

module.exports = authMiddleware;
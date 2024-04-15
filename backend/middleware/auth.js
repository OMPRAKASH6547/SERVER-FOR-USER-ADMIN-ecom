const jwt = require('jsonwebtoken');
const User = require('../module/userModule');

const isAuthenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return next(res.status(401).json({ message: "Please login to access" }))
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedData.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authentication:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};


const authorisedRole= (...roles)=>{
    return(req,res,next)=>{

        if(!roles.includes(req.user.role)){
        next(res.status(404).json({massage :`${req.user.role} not allowed for this resource `})
    )
        
        }
        next()

        
    }

}

module.exports = {isAuthenticateUser ,authorisedRole};

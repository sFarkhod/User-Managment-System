const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


module.exports = function (req,res,next) {
    if(req.method == "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "User is not logged"})
        }

        const decodedData = jwt.verify(token, JWT_SECRET)
        req.user = decodedData;
        next();

    } catch (error) {
        console.log(error);
        return res.status(403).json({message: "User is not logged"})
    }

}
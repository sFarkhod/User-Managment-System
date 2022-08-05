const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

module.exports = function(roles) {
    return function (req, res, next) {
        if(req.method == "OPTIONS") {
            next();
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User is not logged"})
            }
    
            const {roles: userRoles} = jwt.verify(token, JWT_SECRET);
            let hasRole = false;
            if (roles.includes(userRoles)) {
                hasRole = true
            }

            if (!hasRole) {
                return res.status(403).json({message: "You can not see this page"})
            }

            next();
    
        } catch (error) {
            console.log(error);
            return res.status(403).json({message: "User is not logged"})
        }
    }
}
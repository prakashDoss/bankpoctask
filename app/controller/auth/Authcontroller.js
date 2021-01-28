const jwt = require('jsonwebtoken');
class AuthController {

    verifyusers(req, res, next) {
        try {
            let token = req.headers['authorization'];
            if (token) {

                if (token.startsWith('Bearer ')) {
                    token = token.slice(7, token.length);
                }
                return jwt.verify(token, process.env.jwtsecret, function (err, payload) {
                    if (err)
                        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

                    // if everything good, save to request for use in other routes
                    req.userdata = payload;
                    next();
                });
            }

            return res.status(400).send({ auth: false, message: 'Invalid Token.' });
        } catch (e) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
    };

}



const authController = new AuthController();
module.exports = authController;

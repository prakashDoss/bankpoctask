const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const baseController = require('../BaseController');
const userModel = require('../../models/user/user');
const userBankMappingModel = require('../../models/userBankMapping/UserBankMapping');
const { checkIfuserIdPresent } = require('../../utils/FunctionalUtils');
const constantData = require('../../config/Constants').constants();
class User extends baseController {

    /**
     * @DESC : user signup
     * @param : string/Int
     * @return : array/object [json]
     */
    signup = async (req, res) => {
        try {
            const {
                email,
                phone,
                Name,
                Address,
                password
            } = req.body;
            var hashedPassword = bcrypt.hashSync(password, 8);
            await userModel.query()
                .insert({
                    email: email,
                    phone: phone,
                    Name: Name,
                    password: hashedPassword,
                    Address: Address
                });

            return resposne.out(req, res, statusCode.HTTP_OK);
        } catch (err) {
            console.log(err)
            return resposne.out(req, res, statusCode.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }

    /**
     * @DESC : user Signin 
     * @param : string/Int
     * @return : array/object [json]
     */
    signin = async (req, res) => {
        try {
            const userResponse = await userModel.query()
                .where({ email: req.body.email })
                .select('userId', 'email', 'phone', 'Name', 'Address', 'password');

            if (userResponse.length && bcrypt.compareSync(req.body.password, userResponse[0].password)) {
                var token = jwt.sign({ userDetails: userResponse[0] }, process.env.jwtsecret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                userResponse[0].authtoken = `Bearer ${token}`;//Add JWT token
            } else {
                return resposne.out(req, res, statusCode.HTTP_UNAUTHORIZED);
            }
            delete userResponse[0].password;
            return resposne.out(req, res, statusCode.HTTP_OK, userResponse);
        } catch (err) {
            console.log(err)
            return resposne.out(req, res, statusCode.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }

    /**
        * @DESC : Bank Registration
        * @param : string/Int
        * @return : array/object [json]
        */

       bankRegistration = async (req, res) => {
        try {
            const {
                bankid,
                depositAmount
            } = req.body;
            const time =+new Date();
            const mappingData = {
                bankId: bankid,
                accountnumber:bankid+Math.floor(Math.random()*10) + 1+time,
                userId: req.userdata.userDetails.userId,
                depositAmount: depositAmount,
                addressProof: req.file.filename
            };

            await userBankMappingModel.query()
                .insert(mappingData);

            return resposne.out(req, res, statusCode.HTTP_OK);
        } catch (err) {
            console.log(err)
            return resposne.out(req, res, statusCode.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }

    /**
     * @DESC : user - List
     * @param : string/Int
     * @return : array/object [json]
     */
    userList = async (req, res) => {
        try {
            const responseData = await userModel.query()
                .where(checkIfuserIdPresent(req))
                .select('userId', 'email', 'phone', 'Name', 'Address')
                .withGraphFetched('mappingList.[bank]');
            return resposne.out(req, res, statusCode.HTTP_OK, responseData);
        } catch (err) {
            console.log(err);
            return resposne.out(req, res, statusCode.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
}

const user = new User();
module.exports = user;
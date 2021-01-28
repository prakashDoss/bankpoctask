const baseController = require('../BaseController');
const bankModel = require('../../models/bank/BankModel');
const { checkIfbankIdPresent } = require('../../utils/FunctionalUtils');

class Bank extends baseController {

    /**
     * @DESC : Add Bank
     * @param : string/Int
     * @return : array/object [json]
     */
    addBank = async(req, res) => {
        try {
            const responseData = await bankModel.query()
                .insert(req.body);
            return resposne.out(req, res, statusCode.HTTP_OK, responseData);
        } catch (err) {
            return resposne.out(req, res, statusCode.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }

    /**
     * @DESC : Bank - List
     * @param : string/Int
     * @return : array/object [json]
     */
    bankList = async(req, res) => {
        try {
            const responseData = await bankModel.query()
                .where(checkIfbankIdPresent(req))
                // .select('itemId', '	bankName', rawquery('CONCAT("' + itemImageurl + '", itemImage) as imageurl'));
                .select('bankId', '	bankName','bankIFSCode','branchName','bankAddress');

            return resposne.out(req, res, statusCode.HTTP_OK, responseData);
        } catch (err) {
            console.log(err);
            return resposne.out(req, res, statusCode.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
}

const bankController = new Bank();
module.exports = bankController;
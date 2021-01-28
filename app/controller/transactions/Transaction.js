const baseController = require('../BaseController');
const transactionModel = require('../../models/transaction/Transaction');
class Transaction extends baseController {

     /**
     * @DESC : Add Transaction
     * @param : string/Int
     * @return : array/object [json]
     */
    addTransaction = async (req, res) => {
        try {
            const responseData = await transactionModel.query()
            .insert({
                userId:req.userdata.userDetails.userId,
                bankId:req.body.bankid,
                type:req.body.type,
                amount:req.body.amount
            });
            return resposne.out(req, res, statusCode.HTTP_OK, responseData);
        } catch (err) {
            console.log(err);
            return resposne.out(req, res, statusCode.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }

    /**
     * @DESC : Transaction - List
     * @param : string/Int
     * @return : array/object [json]
     */
    transactionList = async (req, res) => {
        try {
            const responseData = await transactionModel.query()
                .where({userId:req.userdata.userDetails.userId})
                .select('userId', 'bankId', 'type', 'amount')
                .withGraphFetched('[bank]');
            return resposne.out(req, res, statusCode.HTTP_OK, responseData);
        } catch (err) {
            console.log(err);
            return resposne.out(req, res, statusCode.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
}

const transaction = new Transaction();
module.exports = transaction;
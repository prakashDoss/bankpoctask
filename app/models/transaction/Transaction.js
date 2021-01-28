const bankModel = require('../bank/BankModel');
class Transaction extends Model {

    static get tableName() {
        return 'POC04_TRANSACTION';
    }

    static get idColumn() {
        return 'transactionId'
    }

    static get relationMappings() {
        return {
            bank: {
                relation: Model.HasManyRelation,
                modelClass: bankModel,
                join: {
                    from: 'POC01_BANK.bankId',
                    to: 'POC04_TRANSACTION.bankId'
                }
            }
        }
    }

}

module.exports = Transaction;
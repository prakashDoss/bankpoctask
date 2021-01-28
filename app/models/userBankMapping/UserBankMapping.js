const bankModel = require('../bank/BankModel');
class UserBankMapping extends Model {

    static get tableName() {
        return 'POC03_USERS_BANK_MAPPING';
    }

    static get idColumn() {
        return 'mappingId'
    }

    static get relationMappings() {
        return {           
            bank: {
                relation: Model.HasManyRelation,
                modelClass: bankModel,
                join: {
                    from: 'POC01_BANK.bankId',
                    to: 'POC03_USERS_BANK_MAPPING.bankId'
                }
            }
        }
    }


}

module.exports = UserBankMapping;
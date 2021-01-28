const userBankMappingModel = require('../userBankMapping/UserBankMapping');
class User extends Model {

    static get tableName() {
        return 'POC02_USERS';
    }

    static get idColumn() {
        return 'userId'
    }

    static get relationMappings() {
        return {
            mappingList: {
                relation: Model.HasManyRelation,
                modelClass: userBankMappingModel,
                join: {
                    from: 'POC03_USERS_BANK_MAPPING.userId',
                    to: 'POC02_USERS.userId'
                }
            }
        }
    }

}

module.exports = User;
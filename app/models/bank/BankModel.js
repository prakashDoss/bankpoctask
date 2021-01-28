class BankModel extends Model {

    static get tableName() {
        return 'POC01_BANK';
    }

    static get idColumn() {
        return 'bankId'
    }

}

module.exports = BankModel;
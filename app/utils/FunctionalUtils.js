const constantData = require('../config/Constants').constants();

class FunctionalUtils {

    checkIfbankIdPresent(req) {
        let _where = { status: constantData.ACTIVE_STATUS };
        if (req.params.bankid) {
            _where.bankId = Number(req.params.bankid);
        }
        return _where;
    }

    checkIfuserIdPresent(req) {
        let _where = { status: constantData.ACTIVE_STATUS };
        if (req.params.userid) {
            _where.userId = Number(req.params.userid);
        }
        return _where;
    }

}


const functionalutils = new FunctionalUtils();
module.exports = functionalutils;
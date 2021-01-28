//validators
let bankvalidator = require('./validator/BankValidator');
let uservalidator = require('./validator/userValidator');
const authController = require('../controller/auth/Authcontroller');
//DESC : Bank Routes Defined Here
const bankController = require('../controller/bank/Bank');
router.post('/bank/add',bankvalidator.validatebankRequest, bankController.addBank);
router.get('/bank/list/:bankid?', bankController.bankList);

//DESC: User Routes Defined Here
const userController = require('../controller/users/User');
router.post('/user/signup',uservalidator.validateusersignup, userController.signup);
router.post('/user/signin', userController.signin);
router.get('/user/list/:userid?', userController.userList);
router.post('/user/bank/register', fileUpload.single('addressproof'),authController.verifyusers,userController.bankRegistration);

//DESC: Transaction Routes Defined Here
const transactionController = require('../controller/transactions/Transaction');
router.post('/transaction/add', authController.verifyusers,transactionController.addTransaction);
router.get('/transaction/list', authController.verifyusers,transactionController.transactionList);
module.exports = router;
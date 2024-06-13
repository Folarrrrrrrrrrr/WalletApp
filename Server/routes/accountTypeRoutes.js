const accountTypeController =  require('../controllers/accountTypeController.js');
const router = require('express').Router();

router.post('/addAccountType', accountTypeController.addAccountTypeCustomer);

router.get('/allAccountType', accountTypeController.getAllAccountType);

router.get('/getAccounttypeCustomer', accountTypeController.addAccountTypeCustomer)


router.get('/:id', accountTypeController.getAccountTypebyId);

router.put('/:id', accountTypeController.updateAccountTypebyId);

router.delete('/:id', accountTypeController.deleteAccountTypebyId);




module.exports = router;
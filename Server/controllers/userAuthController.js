const router = require("express").Router();
const userAuth = require('../routes/usersRoutes');

router.post('/register', userAuth.register);
router.post('/login', userAuth.login);

module.exports = router;
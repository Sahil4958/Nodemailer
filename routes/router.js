const router =  require('express').Router();
const {signUp,getBill} = require('../controller/appController')

router.post('/user/signup',signUp)
router.post('/product/getbill',getBill)


module.exports = router;
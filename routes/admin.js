const express = require('express')
const router = express.Router()
const login = require('../controllers/login')

router.get('/',login.index)
router.get('/show',login.show)
router.post('/store',login.store)
router.put('/update',login.update)
router.delete('/delete',login.destroy)


module.exports = router
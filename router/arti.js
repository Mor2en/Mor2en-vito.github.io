const express=require('express')
const router=express.Router()
const expressJoi=require('@escook/express-joi')
const arti=require('../router_hander/arti')



router.post('/add',arti.addArti)
module.exports=router
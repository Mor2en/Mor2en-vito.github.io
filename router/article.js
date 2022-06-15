const express=require('express')
const router=express.Router()
const expressJoi=require('@escook/express-joi')
const router_hander_article=require('../router_hander/article')
const {add_cates_schema,delete_Id,}=require('../schema/article')


router.get('/cates',router_hander_article.cates)
router.post('/addcates',expressJoi(add_cates_schema),router_hander_article.addcates)
router.get('/deletecate/:id',router_hander_article.deleteCateById)
router.get('/cates/:id',router_hander_article.getCatesById)
router.post('/updatecate',router_hander_article.updateCate)
module.exports=router
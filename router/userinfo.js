const express=require('express')
const router=express.Router()
const userinfo_handler=require('../router_hander/userinfo')


const expressJoi=require('@escook/express-joi')
const {update_userinfo_schema,update_pwd_schema,reg_avatar_schema}=require('../schema/user')



// const =expressJoi(joi)
router.get('/userinfo',userinfo_handler.getuserinfo)
router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)
router.post('/updatepwd',expressJoi(update_pwd_schema),userinfo_handler.updatepwd)
router.post('/updateavatar',expressJoi(reg_avatar_schema),userinfo_handler.updateavatar)
module.exports=router
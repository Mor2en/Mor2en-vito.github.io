const { status } = require('express/lib/response')
const db=require('../db/index')
const bcrypt=require('bcryptjs')
const { use } = require('../router/user')
const jwt=require('jsonwebtoken')
const config=require('../config')


exports.regUser=(req,res)=>{
    const userinfo=req.body
    if(!userinfo.username || !userinfo.password){
        // console.log(userinfo)
        // return res.send({status:1,message:'用户名或密码不能为空'})
        return res.cc('用户密码不为空')
        
    }
    console.log(userinfo)
    const sql='select * from ev_users where username=?'
    db.query(sql,[userinfo.username],function(err,result){
        if(err){
            // return res.send({status:1,message:err.message})
            return res.cc(err)
        }
        if(result.length>0){
            // return res.send({status:1,message:'用户名被占用'})
            return res.cc('用户名被占用')
        }
    })
//加密密码
    console.log(userinfo.password)
    userinfo.password=bcrypt.hashSync(userinfo.password,10)
    console.log(userinfo.password)
//插入用户
    const insertSql='insert into ev_users set?'
    db.query(insertSql,{username:userinfo.username,password:userinfo.password},function(err,result){
        if(err){
            // return res.send({status:1,message:err.message})
            return res.cc(err)

        }
        if(result.affectedRows !==1){
            // return res.send({status:1,message:'稍后再试试'})
            res.cc('稍后再试')
        }
        // res.send({status:0,message:'注册成功！'})
        res.cc('注册成功',0)
    })


    // res.send('reguser---success')
}
exports.login=(req,res)=>{
    const userinfo=req.body
    const loginsql='select * from ev_users where username=?'
    db.query(loginsql,userinfo.username,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length!==1) return res.cc('登录失败')
        console.log(result)
        const flag=bcrypt.compareSync(userinfo.password,result[0].password)
        if(!flag) return res.cc('密码错误')

        const user={...result[0],password:'',user_pic:''}
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        res.send({
            status:0,
            message:'登陆成功！',
            token:'bearer '+tokenStr
        })
        // res.send('login---success')
    })
    
}
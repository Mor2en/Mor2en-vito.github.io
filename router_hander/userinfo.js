const { result } = require('@hapi/joi/lib/base')
const db=require('../db/index')
const bcrypt=require('bcryptjs')


exports.getuserinfo=(req,res)=>{
    const sql = `select id, username, nickname, email, user_pic from ev_users where
id=?`
    db.query(sql,req.user.id,(err,result)=>{
        if(err){
            return res.cc(err)
        }
        if(result.length!==1){
            return res.cc('获取不到')
        }
        res.send({
            status:0,
            message:'获取成功',
            data:result[0]
        })
    })
    
    // res.send('got it')
}
exports.updateUserInfo=(req,res)=>{
    upDatesql='update ev_users set ? where id=?'
    db.query(upDatesql,[req.body,req.body.id],(err,result)=>{
        if(err){return res.cc(err)}
        if(result.affectedRows!==1){return res.cc('修改失败')}
        res.cc({
            status:0,
            message:'修改成功'
        })
    })
    // res.send('kook')
}
exports.updatepwd=(req,res)=>{
    // res.send('nihao')
    updatepwdsql='select *from ev_users where id=?'
    updatepwd2='update ev_users set password=? where id=?'
    db.query(updatepwdsql,req.user.id,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length!==1) res.cc('用户不存在！')
        // res.cc('sucghj')
        const flag=bcrypt.compareSync(req.body.oldPwd,result[0].password)
        console.log(req.body.oldPwd,result[0].password,flag)
        if(!flag) return res.cc('原密码输入错误')
        const newPwd=bcrypt.hashSync(req.body.newPwd,10)
        db.query(updatepwd2,[newPwd,req.user.id],(err,result
            )=>{
                if(err) return res.cc(err)
                if(result.affectedRows!==1) return res.cc('更新妈咪失败')
                res.cc('更新密码成功！',0)
            })

    })
}
exports.updateavatar=(req,res)=>{
    upavsql='update ev_users set user_pic=? where id=?'
    db.query(upavsql,[req.body.avatar,req.user.id],(err,result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows!==1) res.cc('更新失败！')
        res.cc('成功！',0)
    })
}
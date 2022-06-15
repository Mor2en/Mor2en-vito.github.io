const express=require('express')


const app=express()

const cors=require('cors')

const joi=require('joi')

const expressJwt=require('express-jwt')

const config=require('./config')

const userinfoRouter=require('./router/userinfo')

const articleRouter=require('./router/article')

const arti=require('./router/arti')
app.use(cors())
//只能解析xx-x
app.use(express.urlencoded({extended:false}))

app.use(function(req,res,next){
    res.cc=function(err,status=1){
        res.send({
            status,
            message:err instanceof Error?err.message:err
        })
        
    }
    

    next()
})

//解析token
app.use(expressJwt({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))
//全局错误
app.use(function(err,req,res,next){
    if(err instanceof joi.ValidationError)return res.cc(err)
    if(err.name==='UnauthorizedError') return res.cc('身份认证失败')
    return res.cc(err)
})

//导入路由模块
const userRouter=require('./router/user')
app.use('/api',userRouter)

app.use('/my',userinfoRouter)

app.use('/my/article',articleRouter)

app.use('/my/arti',arti)
app.listen(3007,()=>{
    console.log("server runing at http://127.0.0.1:3007")
})
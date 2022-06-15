const { result } = require('@hapi/joi/lib/base')
const db = require('../db/index')

exports.cates = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        if (result.length == 0) return res.cc('没找到')
        res.cc({
            data: { result }
        })
    })
    // res.send('nihao wenzhang')

}
exports.addcates = (req, res) => {
    // res.cc('我好得很')
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err)
        if (result.length == 2) return res.cc('俩都重复')
        if (result.length == 1 && result[0].name == req.body.name) return res.cc('名字重复')
        if (result.length == 1 && result[0].alias == req.body.alias) return res.cc('拼音重复')
        const sql2 = 'insert into ev_article_cate set? '
        db.query(sql2, [req.body], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('失败啦')
            res.cc({
                message: '成功'
            })
        })

    })
}
exports.deleteCateById = (req, res) => {
    const delete_Idsql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(delete_Idsql, req.body.id, (err, result) => {
        console.log(req.body.id)
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('删除失败')
        // res.cc({`id为${}`})
        res.cc(`id为${req.body.id}的分类已经删除`)

    })
}
exports.getCatesById = (req, res) => {
    const getsql = 'select * from ev_article_cate where id=?'
    db.query(getsql, req.params.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('有点问题')
        // console.log(req.params.id)
        res.cc({
            data: { result }
        })
    })
}
exports.updateCate = (req, res) => {
    const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return
        res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return
        res.cc('分类别名被占用，请更换后重试！')
        const sql = `update ev_article_cate set ? where Id=?`
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
            // 更新文章分类成功
            res.cc('更新文章分类成功！', 0)
            })
            
    })
}

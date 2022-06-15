const joi=require('joi')

const name=joi.string().required()
const alias=joi.string().alphanum().required()
const id=joi.number().integer().min(1).required()

exports.add_cates_schema={
    body:{
        name,
        alias,
    }
}
exports.delete_Id={
    params:{
        id:id,
    }
}
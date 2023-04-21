const db=require('../models')
// const ROLES= db.ROLES
const Product=db.product

checkDuplicateProduct=(req,res,next)=>{
    Product.findOne({
        where:{
            name:req.body.name
        }
    }).then(product =>{
        if(product){
            res.status(400).send({
                message:"product is already exists"
            })
            return
        }
        next()
    })
}

const verifyProduct={
    checkDuplicateProduct: checkDuplicateProduct
}

module.exports=verifyProduct;
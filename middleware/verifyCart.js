const db= require('../models')

const Cart= db.cart

checkDuplicateCartProduct=(req,res,next)=>{
    Cart.findOne({
        where:{
            name:req.body.name
        }
    }).then(product =>{
        if(product){
            res.status(400).send({
                message:"you have already bought this items"
            })
            return
        }
        next() 
    })
}

const verifyCartProduct={
    checkDuplicateCartProduct: checkDuplicateCartProduct
}

module.exports=verifyCartProduct
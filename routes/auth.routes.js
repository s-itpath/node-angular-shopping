const {verifySignUp, verifyProduct, verifyCartProduct}= require('../middleware')
const controller= require('../controllers/auth.controller.js')

module.exports= function(app){
    app.use((req,res,next)=>{
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.post('/api/auth/signup',
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
    )

    app.post('/api/auth/signin',controller.signin)

    app.post('/api/auth/product',[
        verifyProduct.checkDuplicateProduct
    ],
    controller.addproduct
    )

    app.post('/api/auth/addtocart'
    // ,[
    //     verifyCartProduct.checkDuplicateCartProduct
    // ]
    ,
    controller.addToCart
    )

    app.get('/api/auth/addtocart', controller.showCartItem)

    app.get('/api/auth/userpro/:id', controller.findUserProduct)

    // app.get('/api/auth/product', function(req, res) {
    //     Product.findAll().then(function(products) {
    //       res.json(products);
    //     });
    //   });

    app.delete('/api/auth/product/:id',controller.deleteProduct)
    app.delete('/api/auth/deluserproduct/:id', controller.deleteUserProduct)
    app.put('/api/auth/editproduct/:id', controller.updateProduct)

    app.get('/api/auth/product', controller.showProduct)
}
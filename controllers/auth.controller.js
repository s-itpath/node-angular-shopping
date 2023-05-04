const db = require("../models")
const Sequelize = require('sequelize');
const config = require("../config/auth.config")
const User = db.user
const Role = db.role
const Product = db.product
const Cart= db.cart

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { USER } = require("../config/db.config");



exports.addproduct = (req, res) => {
    Product.create({
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
        discount: req.body.discount
    }).then(item => {
        res.json({
            "message": "product added",
            "itme": item
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.addToCart= (req,res)=>{
    Cart.create({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        username:req.body.username,
        uid:req.body.uid
    }).then(item =>{
        res.json({
            "message":"added to cart",
            "item":item
        })
    }).catch(err =>{
        res.status(500).send({
            message: err.message
        })
    })
}

exports.deleteProduct = (req, res) => {

    const productId = req.params.id;

    Product.destroy({
        where: {
            id: productId
        }
    })
        .then(() => {
            res.status(200).send('Product deleted successfully.');
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('An error occurred while deleting the product.');
        });

}

exports.deleteUserProduct=(req,res)=>{
    const userId=req.params.id;

    Cart.destroy({
        where:{
            id:userId
        }
    })
    .then(()=>{
        res.status(200).send('user cart product deleted successfully')
    })
    .catch((err)=>{
        res.status(500).send('error occured while deleting user cart product')
    })
}

exports.deleteUserByAdmin=(req,res)=>{
    const userId=req.params.id;

    User.destroy({
        where:{
            id:userId
        }
    })
    .then(()=>{
        res.status(200).send('selected user deleted successfully')
    })
    .catch((err)=>{
        res.status(500).send('error in deleting selected user')
    })
}

exports.findUserProduct=(req,res)=>{
    const id=req.params.id;
    Cart.findAll({
        where:{
            uid:id
        }
    })
    .then((item)=>{
        res.json(item)
        // res.status(200).send("users products find successfully")
    })
    .catch((err)=>{
        console.log('error in finding users selected products')
        res.status(500).send("error occurred to find users selected products",err)
    })
    // res.send('working')
}

exports.findProductCategory=(req,res)=>{
    Product.findAll({
        // attributes:['category'],
        // distinct:true

        attributes:[
            [Sequelize.fn('DISTINCT', 
            Sequelize.col('category')),
            'category'],
        ]
       
    })
    .then((item)=>{
        res.json(item)
    })
    
}

exports.updateProduct= (req,res)=>{
    const id=req.params.id;
    const data= req.body;

    try{
        const product= Product.update(data,{
            where:{
                id
            }
        });
        res.send('product updated')
    } catch (err){
        res.send(err)
    }
}

exports.updateUser=(req,res)=>{
    const id=req.params.id;
    const data=req.body;

    try{
        const user=User.update(data,{
            where:{
                id
            }
        })
        res.send('user updated')
    } catch (err){
        res.send(err)
    }
}

// exports.findUserProduct=(req,res)=>{
//     const id=req.params.uid

//     try{
//         const userPro=Cart.findAll({
//             where:{
//                 id:id
//             }
//         })
//     } catch(err){
//         res.send(err)
//     }
// }

exports.showProduct = (req, res) => {
    // app.get('/api/auth/product', function(req, res) {
    //     Product.findAll().then(function(products) {
    //       res.json(products);
    //     });
    //   });


    Product.findAll().then(function (products) {
        res.json(products)
    })
}

exports.showAllUsers=(req,res)=>{
    User.findAll().then(function (user){
        res.json(user)
    })
}

exports.showCartItem= (req,res)=>{
    Cart.findAll().then(function(item){
        res.json(item)
    })
}
// exports.showCartItem= (req,res)=>{
//     const id=req.params.id;
//     Cart.findAll({
//         where:{
//             uid:id
//         }
//     })
//     .then(function(item){
//         res.json(item)
//     })
//     .catch((err)=>{
//         res.send("error to find user selected proudcts")
//     })
// }


exports.signup = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "user registered successfully" })
                    })
                })
            }
            else {
                user.setRoles([1]).then(() => {
                    res.send({ message: "user registered successfully!" })
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "user not found"
            })
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "invalid password"
            })
        }

        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        })

        let authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

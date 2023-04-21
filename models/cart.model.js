module.exports=( sequelize,Sequelize)=>{
    const Cart= sequelize.define("cart",{
        name:{
            type: Sequelize.STRING
        },
        price:{
            type: Sequelize.STRING
        },
        image:{
            type: Sequelize.STRING
        },
        username:{
            type: Sequelize.STRING
        },
        uid:{
            type: Sequelize.STRING
        }
    })
    return Cart;
}
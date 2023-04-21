// const { NUMBER } = require("sequelize");

module.exports=(sequelize,Sequelize)=>{
    const Product= sequelize.define("product",{
        name:{
            type:Sequelize.STRING
        },
        image:{
            type:Sequelize.STRING
        },
        category:{
            type:Sequelize.STRING
        },
        price:{
            type: Sequelize.STRING
        },
        discount:{
            type: Sequelize.STRING
        }
    })

    return Product;
}

// sequelize.sync()
//     .then(() => {
//         console.log('MySQL Database and Tables Created!');
//     })
//     .catch((err) => {
//         console.log('Error:', err);
//     });
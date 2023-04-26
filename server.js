const express= require('express');
const cors= require('cors');

const dbUser=require('./models/user.model')

const Sequelize = require('sequelize');
const bodyParser = require('body-parser');


const app=express()


let corsOptions={
    origin:'http://localhost:8081'
};

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.use(express.static('angular-login'));

const db=require('./models');
const Role=db.role;

// const sequelize = new Sequelize('node-angular', 'root', 'ips12345', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// const Product = sequelize.define('allproduct', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     name: Sequelize.STRING,
//     image: Sequelize.STRING,
//     description: Sequelize.STRING,
//     type: Sequelize.STRING,
//     color: Sequelize.STRING,
//     price: Sequelize.FLOAT,
//     discount: Sequelize.FLOAT,
//     quantity: Sequelize.INTEGER
// });

// sequelize.sync()
//     .then(() => {
//         console.log('MySQL Database and Tables Created!');
//     })
//     .catch((err) => {
//         console.log('Error:', err);
//     });

app.use(bodyParser.json());

// app.post('/api/allproducts', (req, res) => {
//     const products = req.body;
//     Product.bulkCreate(products)
//         .then(() => {
//             res.status(201).send('Products Added Successfully!');
//         })
//         .catch((err) => {
//             res.status(400).send('Error:', err);
//         });
// });

// app.get('/api/allproducts', function(req, res) {
//     Product.findAll().then(function(products) {
//       res.json(products);
//     });
//   });

//   app.delete('/api/allproducts/:id', (req, res) => {
//     const productId = req.params.id;
    
//     Product.destroy({
//       where: {
//         id: productId
//       }
//     })
//     .then(() => {
//       res.status(200).send('Product deleted successfully.');
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send('An error occurred while deleting the product.');
//     });
//   });  

// this is for drop all the current table means all the
//saved data in table got deleted.

// db.sequelize.sync({force:true}).then(()=>{
//     console.log('drop and resync db')       
//     initial()
// })

app.get("/",(req,res)=>{
    res.json({message:"app is running"})
})

// app.get('/api/test/alluser',async(req,res)=>{
//     const user= await dbUser.User.findAll()
//     res.json(user)
// })

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

const PORT=8080;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT},
    http://localhost:8080/`)
})


function initial(){
    Role.create({
        id:1,
        name:"user"
    })
    // Role.create({
    //     id:2,
    //     name:"moderator"
    // })
    Role.create({
        id:2,
        name:"admin"
    })
}
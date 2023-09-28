// const model = require('../models/model')




// //post http://localhost:8080/api/categories/
//  function create_Categories(req,res){
//    const Create = new model.Categories ({
//       type:"Savings",
//       color:"#1F3B5C"
//    })

//    Create.save(function(err){
//       if(!err) return res.json(Create);
//       return res.status(400).json({message:`Error while creating categories ${err}`})
//    })
//  }


//  module.exports = {
//     create_Categories
//  }




const { models } = require('mongoose');
const model = require('../models/model');

// post http://localhost:8080/api/categories/
async function create_Categories(req, res) {
  try {
    const Create = new model.Categories({
      type: "Investment",
      color: "#C43095",
    });

    await Create.save();
    return res.json(Create);
  } catch (err) {
    return res.status(400).json({ message: `Error while creating categories ${err}` });
  }
}


// get http://localhost:8080/api/categories/
async function get_Categories(req,res){
   let data = await model.Categories.find({})
   // return res.json(data);     //this will get all data with all the properties associated with a single data

   let filter = await data.map(v => Object.assign({},{type:v.type,color:v.color}))
   return res.json(filter)
}



// post http://localhost:8080/api/transaction/
async function create_Transaction(req, res){
   if(!req.body) return res.status(400).json("Post HTTP Data not Provided ")
   let {name,type,amount} = req.body;

   try {
      const create = await new model.Transaction({
         name,
         type,
         amount,
         date:new Date()
      })
      await create.save();
      return res.json(create);

   } catch (err) {
      return res.status(400).json({ message: `Error while creating categories ${err}` });
   }
}


// get http://localhost:8080/api/transaction/
async function get_Transaction(req,res){
   const data = await model.Transaction.find({});

   return res.json(data);
}

// delete http://localhost:8080/api/transaction/
// async function delete_Transaction(req,res){
//    if(!req.body) return res.status(400).json({message:"Request body not found"})

//    await model.Transaction.deleteOne(req.body,function(err){
//       if(!err) res.json("Record Deleted")
//    }).clone().catch(function(err){res.json("Error while deleting Transaction Record")})
// }

// Assuming you have already imported the 'model' and set up your Express route

async function delete_Transaction(req, res) {
   try {
     if (!req.body) return res.status(400).json({ message: "Request body not found" });
 
     // Assuming 'model.Transaction' is your Mongoose model
     const result = await model.Transaction.deleteOne(req.body);
 
     if (result.deletedCount === 1) {
       return res.json("Record Deleted");
     } else {
       return res.status(404).json("Record not found");
     }
   } catch (err) {
     return res.status(500).json("Error while deleting Transaction Record");
   }
 }
 

 //  get: http://localhost:8080/api/labels
//  get: http://localhost:8080/api/labels
async function get_Labels(req, res){

   model.Transaction.aggregate([
       {
           $lookup : {
               from: "categories",
               localField: 'type',
               foreignField: "type",
               as: "categories_info"
           }
       },
       {
           $unwind: "$categories_info"
       }
   ]).then(result => {
       let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}));
       res.json(data);
   }).catch(error => {
       res.status(400).json("Looup Collection Error");
   })

}


module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels
};

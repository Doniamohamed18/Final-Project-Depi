const mongoose = require("mongoose")


const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    

    description:{
        type:String,
        require:true
    },

    price:{
        type:Number,
        require:true
    },

    stock:{
        type:Number,
        require:true,
        default:0
    },

     isFeatured:{
        type:Boolean,
       
        default:false
    },

    isOnSale:{
        type:Boolean,
       
        default:false
    },

     discountPercent:{
        type:String,
       
        default:false
    },

    category:{
        type:mongoose.Schema.Types.ObjectId, ref: "Category"
    },

   coverImage: {
       type: String,
            
    },
   brand: {
       type: String,
            
    },

})

module.exports = mongoose.model('Product', ProductSchema);
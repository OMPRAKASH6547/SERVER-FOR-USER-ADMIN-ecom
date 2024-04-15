// const { kMaxLength } = require('buffer');
const mongoose=require('mongoose');
// const { type } = require('os');
const productSchema=mongoose.Schema({
    name:{
        type:String,
        require:[true,"plsase Evter Products Name"]
    }
    ,
    description:{
        type:String,
        require:[true,"plsase Evter Products Description"]
    },
    price:{
        type:Number,
        require:true
    },
    parseIntrice:{
        type:Number,
        require:[true,"plsase Evter Products Price"]
    },
    
    rating:{
        type:Number,
        require:[true,"plsase Evter Products Rating"]
    },
    image:[{
        public_id:{
            type:String,
            require:true

        },
        url:{
            type:String,
            require:true
        }
    }],
    category:{
        type:String,
        require:[true,'please enter category'],
        
    },
    stock:{
        type:Number,
        require:[true,'please enter category'],
        maxlength:[4,'stack cannot exceed 4 charchater'],
        default:1
    },
    numbOfReviews:{
        type:Number,
        default:0

    },
    reviews:[{
        name:{
            type:String,
            require:true
        },
        rating:{
            type:String,
            require:true
        },
        comment:{
            type:String,
            require:true
        }
    }],
    user:{
         type:mongoose.Schema.ObjectId,
         ref:"User",
         required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

const Products =mongoose.model('Products',productSchema);
module.exports=Products
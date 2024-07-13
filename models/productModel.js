const mongoose=require('mongoose');
const productSchema=mongoose.Schema(
    {
        nombre:{
            type: String,
            require: true
        },
        cantidad:{
            type: Number,
            require: true
        },
        precio:{
            type: Number,
            require: true
        }
    }  ,  
    {
        timestamps: true
    }
)
const Product = mongoose.model("Product", productSchema);
module.exports= Product
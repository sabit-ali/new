import mongoose from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


 const ThreadSchema = new mongoose.Schema({
    title : {
        type:String,
        required : true,
        trim : true,
        index : true,
        unique : true,
    },
    avatar:{
        type : String,
        required : true,
    },
    description : {
        type:String,
        required : true,
        trim : true,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    like : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

},{timestamps:true})

ThreadSchema.plugin(mongooseAggregatePaginate)

export const Thread = mongoose.model("Thread",ThreadSchema)
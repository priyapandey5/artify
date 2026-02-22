import {Schema,model,models} from "mongoose"

const WorkSchema = new Schema ({
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:String,
        required: true,
    },
    title:{
       type:String,
       required: true,
    },
    description:{
        type:String,
        required: true,
    },
    price:{
        type:Number, 
        required: true,
    },
    workPhotoPaths:[{type:String,default: "",}]
})

const Work = models.Work || model("Work", WorkSchema)
export default Work
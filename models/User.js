
import { Schema, model, models } from "mongoose"

const UserSchema = new Schema ({
    username:{
        type:String,
        unique:[true, "Username already exists"],
        required:[true, "username  is required"],
    },
    email:{
        type:String,
        unique:[true, "email already exists"],
        required:[true, "email  is required"],
    },
    password:{
        type:String,
        required:[true, "password  is required"],
    },
    profileImagePath:{
        type:String,
        default: "",
    },
    wishlist:{
        type:Array,
        default:[],
    },
    cart: {
    type: Array,
    default: [],
  },
    orders:{
        type:Array,
        default:[],
    },
    works:{
        type:Array,
        default:[],
    }

})

const User = models.User || model("User",UserSchema) //here if user not exists it will create new user. models object is provided by the mongoose library it will chaeck uder register model
export default User
import { connectToDB } from "../../../mongodb/database";
import User from "@models/User";
import { NextResponse } from "@node_modules/next/server";

import {hash} from "bcryptjs";
import {writeFile} from "fs/promises";
//USER REGSITER
export async function POST (req,res)  { //res//
    try{
        //connect to mongodb
        await connectToDB()
        const data = await req.formData()
       
        //TAKE INFOR FROM THE FORM
        const username = data.get('username')
        const email = data.get('email')
        const password = data.get('password')
        const file = data.get('profileImage')
        if(!file){
            return NextResponse.json({message:"NO file Uploaded"}, {status:400})
        }
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const profileImagePath =`C:/Users/priaa/OneDrive/Desktop/NEWPROJECTS/artplace/public/uploads/${file.name}`
        await writeFile(profileImagePath, buffer)
         console.log(`open ${profileImagePath} to see the uploaded files`)
         //CHECK IF USER EXISTS
         const existingUser = await User.findOne({email})
         if(existingUser){
            return NextResponse.json({message:"User already exists!"}, {status:400})
         }
         //HASH THE PASSWORD
         const saltRounds = 10
         const hashedPassword = await hash(password, saltRounds)
         //CREATE A NEW USER
         const newUser = new User({
            username,
            email,
            password:hashedPassword,
            profileImagePath:`/uploads/${file.name}`,
            wishList: [],
            cart: [],
            work: [],
         })
         //SAVE NEW USER
         await newUser.save()
         //SEND A SUCCESS MESSAGE
         return NextResponse.json({message:"User Registered successfully", user:newUser},{status:200})
    }catch(err){
            console.log(err)
            return NextResponse.json({message:"Fail to create new User!"}, {status:500})

        }
}
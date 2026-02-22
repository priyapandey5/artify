import { connectToDB } from "@mongodb/database";
import { writeFile } from "fs/promises"
import Work from "@models/Work";
import { NextResponse } from "next/server";
export async function POST (req) {
    try{
        await connectToDB()
        const data = await req.formData()

        const creator = data.get("creator")  //EXTRACT INFO FROM THE MONGODB
        const category = data.get("category")
        const title = data.get("title")
        const description = data.get("description")
        const price = data.get("price")

        const photos = data.getAll("workPhotoPaths"); //GET AN ARRAY OF UPLOADED PHOTO
        /* Check if photos were uploaded */
        if (!photos || photos.length === 0) {
        return NextResponse.json({ message: "No photo uploaded" }, { status: 400 });
        }
  
        const workPhotoPaths = []
        
        for(const photo of photos){ //PROCESS AND STORES EACH PHOTO
            const bytes = await photo.arrayBuffer(); //READ THE PHOTO AS AN ARRAYBUFFER
            const buffer = Buffer.from(bytes);
          const workImagePath  = `C:/Users/priaa/OneDrive/Desktop/NEWPROJECTS/artplace/public/uploads/${photo.name}`;  //DEFINE THE DESTINATION PATH FOR THE UPLOADED FILES
          await writeFile(workImagePath, buffer) //write the buffer to the filesystem
          workPhotoPaths.push(`/uploads/${photo.name}`)
        }
        //CREATE A NEW WORK
        const newWork = new Work({
            creator, category,title,description,price,workPhotoPaths
        });
        await newWork.save();
        return new Response(JSON.stringify(newWork), {status:200})

    }catch(err){
        console.log(err)
        return new Response("Failed to craete a new work", {status:500})

    }
}
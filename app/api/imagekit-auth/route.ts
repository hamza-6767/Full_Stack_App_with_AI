import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
   

try{
        const authanticationParameters =  getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, 
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
        
    })

    return Response.json({ authanticationParameters , 
        publicKey: process.env.NEXT_PUBLIC_PUBLIC, })
} catch (error){
        return Response.json({error: "Error in getting authantication parameters"}, {status: 500})
}
}
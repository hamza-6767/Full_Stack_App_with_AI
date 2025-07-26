import { NextRequest , NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";


export async function POST (requiest : NextRequest){
    try {
        
        const { email, password } = await requiest.json();
        if (!email || !password) {
            return NextResponse.json(
                {
                    error: "Email or password is missing"
                },
                 {status: 400})
        }
        await connectToDatabase();
        const existingUser = await User.findOne({email});
           if (!email || !password) {
            return NextResponse.json(
                {
                    error: "User already exists"
                },
                 {status: 400});
        }
        await User.create({
            email,
            password
        })
        return NextResponse.json({message: "User created successfully"}, {status: 201})
        
    } catch (error) {
          
            return NextResponse.json(
                {
                    error: "Email or password is missing"
                },
                 {status: 400})
       
        
    }
}


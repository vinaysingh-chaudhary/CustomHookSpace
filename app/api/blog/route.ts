import { BlogModel } from "@/Schema/BlogSchema";
import connectMongoDB from "@/DBconnection/connectMongoDB";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await connectMongoDB();
    const {id} = await request.json(); 

    const blog = await BlogModel.findOne({"_id": id});
    return NextResponse.json(blog); 
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
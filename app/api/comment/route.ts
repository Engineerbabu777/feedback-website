

import {NextResponse} from 'next/server';
import mongooseConnect from '../../libs/mongoDB';
import commentModel from './../models/comment';

export async function POST(req:Request  ,res:Response){

    mongooseConnect(); // CONNECTION TO DATABASE !!

    const body = await req.json();
    const {comment , images , userId} = body;


    // CREATING NEW COMMENT !!
    const newCommet = await commentModel.create({
        content:comment , attachments:images , userId
    })


    return NextResponse.json({succes:true,newComment});
}
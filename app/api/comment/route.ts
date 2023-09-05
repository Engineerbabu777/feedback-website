

import {NextResponse} from 'next/server';
import {commentModel} from '../../models/comment';
import mongooseConnect from '../../libs/mongoose';

export async function POST(req:Request  ,res:Response){

    mongooseConnect();

    const body = await req.json();
    const {comment , images , feedbackId,userEmail,userImg} = body;


    // CREATING NEW COMMENT !!
    const newComment = await commentModel.create({
        content:comment , attachments:images , feedbackId, userEmail, userImg,
    });


    return NextResponse.json({success:true,newComment});
}

export async function GET(req:Request,res:Response){

    mongooseConnect();

    const url = new URL(req.url);
    const id = url.searchParams.get('id');


    const comments = await commentModel.find({feedbackId:id})

    return NextResponse.json({success:true , comments});

}


import {NextResponse} from 'next/server';
import {commentModel} from '../../models/comment';
import mongooseConnect from '../../libs/mongoose';

export async function POST(req:Request  ,res:Response){

    mongooseConnect();

    const body = await req.json();
    const {comment , images , userId,feedbackId,userImg,email} = body;


    // CREATING NEW COMMENT !!
    const newComment = await commentModel.create({
        content:comment , attachments:images , userId,feedbackId,userImg,email,
    });


    return NextResponse.json({success:true,newComment});
}

export async function GET(req:Request,res:Response){

    mongooseConnect();

    const url = new URL(req.url);
    const id = url.searchParams.get('id');


    const comments = await commentModel.find({feedbackId:id}).populate('userId');

    return NextResponse.json({success:true , comments});

}
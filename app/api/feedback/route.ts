
import { NextResponse , NextRequest } from 'next/server'
import mongoose from 'mongoose';
import {feedbackModel} from '../../models/feedback';
import mongooseConnect from '../../libs/mongoose';



export async function POST(request:NextRequest) {
 
    const body = await request.json(); // CONVERTING REQUEST TO JSON FORMAT !!
    const {title , description, images, votes} = body; // DESTRUCTING {TITLE AND DESCRIPTION} FROM BODY !!
    console.log(title , description , images , votes)

    // ESTABLISHING MONGODB CONNECTION USING OUR MONGOOSE!!
     mongooseConnect(); // CONNECTION TO DATABASE !!

    // CREATING NEW FEEDBACK !
     const newFeedback = await feedbackModel.create({
         title , description , votes,images // CREATING DATA WITH IT USING OUR SCHEMA FOR FEEDBACK !!
     });
    

    // RETURNING THE RESPONSE !!
    return NextResponse.json({success:true,newFeedback}); 

}



export async function GET(request:NextRequest) {
    mongooseConnect(); // CONNECTION TO DATABASE !!

    const data = await feedbackModel.find();

    return NextResponse.json({success:true,feedbacks:data}) // RETURNING ALL FEEDBACK DOCUMENTS!!
}


export async function PUT(request:NextRequest) {
    const body = await request.json();
    const {votes} = body;
    console.log(votes)
    const url = new URL(request.url);
    const id = url.searchParams.get("id")
    const feedback = await feedbackModel.findByIdAndUpdate(id,{
       votes:votes // UPDATINGS VOTES!
    })

    return NextResponse.json({success:true,id,votes})
}

import { NextResponse , NextRequest } from 'next/server'
import mongoose from 'mongoose';
import {feedbackModel} from '../../models/feedback';
import mongooseConnect from '../../libs/mongoose';


console.log(1)

export async function POST(request:NextRequest) {
 
    const body = await request.json(); // CONVERTING REQUEST TO JSON FORMAT !!
    const {title , description, images, votes} = body; // DESTRUCTING {TITLE AND DESCRIPTION} FROM BODY !!
    console.log(2)

    // ESTABLISHING MONGODB CONNECTION USING OUR MONGOOSE!!
     mongooseConnect(); // CONNECTION TO DATABASE !!

    // CREATING NEW FEEDBACK !
     const newFeedback = await feedbackModel.create({
         title , description , votes // CREATING DATA WITH IT USING OUR SCHEMA FOR FEEDBACK !!
     });
    

    // RETURNING THE RESPONSE !!
    return Response.json({success:true, feedback:newFeedback}); 

}



// export async function GET(request:NextRequest) {
//     mongooseConnect(); // CONNECTION TO DATABASE !!

//     const data = await feedbackModel.find();

//     return Response.json({success:true,feedbacks:data}) // RETURNING ALL FEEDBACK DOCUMENTS!!
// }


// export async function PUT(request:NextRequest) {
//     const req = await request.json();
//     console.log(req.params);
//     // const feedback = await feedbackModel.findById()

//     return Response.json({success:true})
// }
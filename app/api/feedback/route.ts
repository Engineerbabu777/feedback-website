
import { NextResponse , NextRequest } from 'next/server'
import mongoose from 'mongoose';
import {feedbackModel} from '../../models/feedback';
import mongooseConnect from '../../libs/mongoose';


export async function POST(request:NextRequest) {
 
    const body = await request.json(); // CONVERTING REQUEST TO JSON FORMAT !!
    const {title , description} = body; // DESTRUCTING {TITLE AND DESCRIPTION} FROM BODY !!

    // ESTABLISHING MONGODB CONNECTION USING OUR MONGOOSE!!
     mongooseConnect(); // CONNECTION TO DATABASE !!

    // CREATING NEW FEEDBACK !
     const newFeedback = await feedbackModel.create({
         title , description  // CREATING DATA WITH IT USING OUR SCHEMA FOR FEEDBACK !!
     });
    

    // RETURNING THE RESPONSE !!
    return Response.json({success:true, feedback:newFeedback}); 

}
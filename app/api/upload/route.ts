
import MongooseConnect from '../../libs/mongoose';
import {NextRequest} from 'next/server';


export async function POST(req:NextRequest){

    
    MongooseConnect(); // CREATING DATA BASE CONNECTION!
    const formData:any = req.formData;

    // Initialize Supabase client
 '
   





   


    return Response.json({success:true});
}
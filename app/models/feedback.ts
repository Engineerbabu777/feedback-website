
import mongoose from 'mongoose';


const feedbackSchema = new mongoose.Schema({

    title: {type:String , require:true},
    description: {type:String , require:true},
    ip:{type:String ,require:true},

},{
    timestamps:true,
});

export const feedbackModel = mongoose.models.feedback || mongoose.model('feedback' , feedbackSchema);

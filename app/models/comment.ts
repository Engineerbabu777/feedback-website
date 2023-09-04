
import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({

    content: String,
    attachments: [String],
    email:String,
    userImg:String,
    feedbackId:{type:mongoose.Schema.Types.ObjectId, ref:'feedback'},

},{
    timestamps: true,
});


export const commentModel = mongoose.models.comment || mongoose.model('comment' , commentSchema);


import mongoose from 'mongoose';
import './user';


const commentSchema = new mongoose.Schema({

    content: String,
    attachments: [String],
    userEmail:{type:String, required:true},
    userImg:String,
    feedbackId:{type:mongoose.Schema.Types.ObjectId, ref:'feedback'},

},{
    timestamps: true,
    toObject: { virtuals:true },
    toJSON: {virtuals:true},
});

commentSchema.virtual('user',{
    ref:'user',
    localField:'userEmail',
    foreignField:'email',
    justOne: true,
})

export const commentModel = mongoose.models.comment || mongoose.model('comment' , commentSchema);

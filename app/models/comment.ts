
import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({

    content: String,
    attachments: [String],
    userId: mongoose.Types.ObjectId,

},{
    timestamps: true,
});


export const commentModel = mongoose.models.comment || mongoose.model('comment' , commentSchema);

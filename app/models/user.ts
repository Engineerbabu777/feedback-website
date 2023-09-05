
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    image: String,
    emailVerified: String,

});

export const userModel = mongoose?.models?.user || mongoose.model('user',userSchema);
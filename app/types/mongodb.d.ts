

import { Types } from "mongoose";



export interface User {
    name: string,
    email: string,
    image: string,
    id: Types.ObjectId,
}
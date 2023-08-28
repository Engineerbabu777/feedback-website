

import { createClient } from '@supabase/supabase-js';



export const supabase_Storage = async (array: any) => {
    const supabaseUrl = `${process.env.SUPABASE_URL}`;
    const supabaseKey = `${process.env.SUPABASE_KEY}`;

    const supabase = createClient(supabaseUrl, supabaseKey);

    for (const file of array) {
        console.log(file.name)
        const { data, error } = await supabase.storage
            .from('feedback-upload') // Replace with your actual bucket name
            .upload(`/files/${file?.name.split('.')[0]}`, file);
        if (error) {
            console.log(error)
        } else {
            console.log(data)
        }
    }

}

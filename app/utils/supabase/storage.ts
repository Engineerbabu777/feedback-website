

import { createClient } from '@supabase/supabase-js';

async function getViewUrl(bucketName:string, filePath:string|any) {
    console.log(process.env)
const supabaseUrl = `https://bovwwnhnvuameioyecfb.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdnd3bmhudnVhbWVpb3llY2ZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzIzNTE4MSwiZXhwIjoyMDA4ODExMTgxfQ.scOpBrRT1KtKCsAe3CSjkGYQymYFQQQJCg8tcVoyvDw`;

const supabase = createClient(supabaseUrl, supabaseKey);


    try {
        const { data } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(filePath)
  
      return data.publicUrl;
    } catch (error:any) {
      console.error('Error:', error.message);
      return null;
    }
  }

export const supabase_Storage = async (array: any) => {

    const supabaseUrl = `https://bovwwnhnvuameioyecfb.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdnd3bmhudnVhbWVpb3llY2ZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzIzNTE4MSwiZXhwIjoyMDA4ODExMTgxfQ.scOpBrRT1KtKCsAe3CSjkGYQymYFQQQJCg8tcVoyvDw`;

const supabase = createClient(supabaseUrl, supabaseKey);



let urls = [];
    for (const file of array) {
        
        const { data, error } = await supabase.storage
            .from('feedback-upload') // Replace with your actual bucket name
            .upload(`/files/${Date.now()}`, file);
        if (error) {
            console.log(error.message)
        } else {

            const viewUrl = await getViewUrl('feedback-upload', `/files/${file?.name}`);
            urls.push(viewUrl);
        }
    }

    return urls;


}

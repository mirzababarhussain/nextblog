import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Read Post
export const GET = async (request,{params}) =>{
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("No Prompt found..",{status:404});

        return new Response(JSON.stringify(prompt),{status:201});

    } catch (error) {
        return new Response("FAILED TO GET POSTS OF RESPECTIVE USER",{status: 500});
    }
}

//update post
export const PATCH = async(request,{params}) =>{
    const {prompt, tag} = await request.json();
    try {
        await connectToDB();
        const existingprompt = await Prompt.findById(params.id)
        
        if(!existingprompt) return new Response('No Prompt found..',{status:404});

        existingprompt.prompt = prompt;
        existingprompt.tag = tag
        await existingprompt.save();

       return new Response("Prompt updated successfully",{status:201});

        

    } catch (error) {
        return new Response(error,{status:500});
    }
}
//Delete Post

export const DELETE =  async(request,{params}) =>{
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response('Prompted deleted successfully',{status:200});
    } catch (error) {
        return new Response('Prompt not delete',{status:500})
    }
}
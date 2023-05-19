import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request,{params}) =>{
    try {
        await connectToDB();
        const prompts = await Prompt.find({creator: params.id}).populate('creator');
        return new Response(JSON.stringify(prompts),{status:201});

    } catch (error) {
        return new Response("FAILED TO GET POSTS OF RESPECTIVE USER",{status: 5000});
    }
}
import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator:{
            type: Schema.Types.ObjectId,
            ref: 'User'      
    },
    prompt:{
        type:String,
        required:[true, 'Prompt Required']
    },
    tag:{
        type: String,
        required: [true, 'Tag Required']
    }
});

const Prompt = models.Prompt || model('Prompt',PromptSchema);

export default Prompt;
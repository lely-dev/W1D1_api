import { Schema,model } from "mongoose";

const blogSchema = new Schema ({

    category:{
        type: String,
        require: true
    },

    title:{
        type:String,
        require: true
    },

    cover:{
        type: String,
        require: true,
    },
    
    readTime:{
        value:{
            type: Number,
            require: true
        },
        unit:{
            type: String,
            require: true
        }
    },

    //REFERENCING AUTHOR
   
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    content: {
        type: String,
        require: true
    },

    //EMBEDDING
    comment: [
        {
            author:{
                type: Schema.Types.ObjectId,
                ref: 'User'
            },

            description:{
                type: String,
                require: true
            }

        }
    ]
})

export default model ('blog', blogSchema);
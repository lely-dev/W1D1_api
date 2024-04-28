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

    author:{
        name:{
            type: String,
            require: true
        },
        avatar: {
            type: String,
            require: true
        }
    },

    content: {
        type: String,
        require: true
    },

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
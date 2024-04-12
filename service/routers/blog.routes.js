import { Router } from "express";
import blog from "../models/blog.model.js";

export const blogRoute = Router();

// GET LISTA DI BLOG POST
blogRoute.get('/', async (req, res) => {
    res.send('sono nei post')
})


// GET POST TRAMITE ID
blogRoute.get('/:id', async (req, res, next) => {
    try {
        let blogId = await blog.findById(req.params.id, req.body);

        res.send(blogId)
        console.log('sono nel blog con ID')
    } catch (error) {
        next(error)
    }

})


// POST DEL NUOVO BLOG
blogRoute.post('/', async(req,res, next)=>{
    try {
        let newPost = await blog.create(req.body);

        res.send(newPost).status(400);
        console.log('ho fatto il post di un nuovo blog')
        
    } catch (error) {
        next(error)
    }
})


// PUT DEL BLOG CON ID
blogRoute.put('/:id', async(req, res, next) =>{
    try {
        let modifyBlog = await blog.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        });

        res.send(modifyBlog);
        console.log('ho modificato il blog con ID')

    } catch (error) {
        next(error)
    }
})


// DELETE DEL BLOG CON ID

blogRoute.delete('/:id', async(req, res, next) =>{
    try {
        await blog.deleteOne({
            _id: req.params.id,
        })

        res.send('il blog è stato eliminato');

    } catch (error) {
        next(error)
    }
})
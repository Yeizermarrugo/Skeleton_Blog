const postController = require('./post.controller')


const getAll = (req, res) => {
    const data = postController.getAllPosts()
    res.status(200).json({
        items: data.length,
        post: data
    })
}

const getById = (req, res) => {
    const id = req.params.id
    const data = postController.getAllPostsById(id)
    if (data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: `El post con el id ${id} no existe`})
    }
}

const register = (req, res) => {
    const data = req.body
    if (!data){
        return res.status(400).json({message: 'Missing post'})
    }else if(
        !data.title ||
        !data.content
    ){
        return res.status(400).json({message: 'All fields must be complete', fields:{
            "title": "string",
        "content": "string",
        "header_image": "url.com/img/",
        }})
    }else {
        const response = postController.createPost(data)
        return res.status(201).json({
            message: `Post created succesfully with id: ${response.id}`,
            post: response
        })
    }
}

//!<<------------------------Rutas Protegidas-------------->>

const getAllPostUser = (req, res) => {
  const id = req.user.id;
  const data = postController.getPostByUser(id);
  return res.status(200).json(data);
}

const getPostByUserId = (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const post = postController.getPostUserById(id, userId);
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(400).json({ message: "Post doest not exist" });
    }
}

const editPostByUser = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const userId = req.user.id;
    if (!Object.keys(data).length) {
      return res.status(400).json({ message: "Missing data" });
    } else if (!data.title || !data.content) {
      return res.status(400).json({
        message: "All field must be completed",
        fields: {
          title: "string",
          content: "string",
          header_image: "example.com/img (opcional)",
        },
      });
    } else {
      const response = postController.createPost(id, data, userId);
      return res
        .status(201)
        .json({ message: "Post edit succesfully", post: response });
    }
}

const removePostByUser = (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const data = postController.deletePostByUser(id, userId);
    if (data) {
      return res.status(204).json();
    } else {
      return res.status(400).json({ message: "Invalid ID" });
    }
  };
  

  module.exports = {
    getAll,
    getById,
    register,
    getAllPostUser,
    getPostByUserId,
    editPostByUser,
    removePostByUser
  }
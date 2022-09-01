const uuid = require('uuid');


const postDB = [
    {
        "id": 1,
        "title": "Programacion Backend NodeJS",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        "header_image": "url.com/img/",
        "user_id": "uuid del usuario de referencia",
        "is_active": true
    }
]

const getAllPosts = () => {
    return postDB
}

const getAllPostsById = (id) => {
    const data = postDB.filter(post => post.id === id)
    return data.length ? data[0] : false
}

const createPost = (data, userId) => {
    const newPost = {
        id: uuid.v4(),
        title: data.title,
        content: data.content,
        header_image: data.header_image ? data.header_image : '',
        user_id: userId,
        is_active: true
    }
    postDB.push(newPost)
    return newPost
}

const editPost = (id, data, userId) => {
    const index = postDB.findIndex(item => item.user_id === userId)
    if (index !== -1) {
        postDB[index]= {
            id: id,
            title: data.title,
            content: data.content,
            header_image: data.header_image ? data.header_image : '',
            user_id: userId,
            is_active: true
        }
        return postDB[index]
    }else{
        return createPost(data)
    }
}

const deletePost = (id) => {
    const index = postDB.findIndex(item => item.id === id)
    if(index !== -1){
        postDB.splice(index, 1)
        return true
    }else{
        return false
    }
}

//!  /api/v1/users/me/post --------Rutas Protegidas------ //

const getPostByUser = (id) => {
    const data = postDB.filter((item) => item.user_id === id);
    return data;
  }

//! /api/v1/users/me/posts/:id

const getPostUserById = (id, userId) => {
    const data = postDB.filter((item) => item.user_id === userId);
    const postUser = data.filter((post) => post.id === id);
    return postUser.length ? postUser[0] : null;
  }

const editPostByUser = (id, data, userId) => {
    const index = postDB.findIndex((item) => item.user_id === userId);
    if (index !== 1) {
      postDB[index] = {
        id: id,
        title: data.title,
        content: data.content,
        header_image: data.header_image ? data.header_image : " ",
        user_id: userId,
        is_active: true,
      };
      return postDB[index];
    } else {
      return createPost(data);
    }
  }

const deletePostByUser = (id, userId) => {
    const index = postDB.filter((item) => item.user_id === userId && item.id === id);
    if (index.length) {
      const index = postDB.findIndex((user) => user.id === id);
      postDB.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  module.exports ={
    getAllPosts,
    getAllPostsById,
    createPost,
    editPost,
    deletePost,
    getPostByUser,
    getPostUserById,
    editPostByUser,
    deletePostByUser
  }
  

  
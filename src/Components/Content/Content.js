import React, {useState} from "react";
import Modal from "../Modal/Modal";
import Posts from "./Posts/Posts";
import "./Content.scss";

const postData = require('./Posts/postData.json');

function Content() {
    const [post, setPost] = useState(postData.posts);
    const [filter, setFilter] = useState('');
    const [isModal, setModal] = useState(false);
    
    const onClose = () => setModal(false);

    const createHandler = (text) => {
      postData.posts.push(
        {
          text,
          id: +postData.posts[postData.posts.length] ? (postData.posts.id + 1) : 0,
        }
      );
      setPost([...postData.posts]);
    }
   
    const filterHandler = () => {
      if (filter === ''){
        setPost(postData.posts);
        return;
      }
      setPost(postData.posts.filter((post) => {
        const arr = (post.text).split(' ');
        for (let word of arr){
          if (word.includes("#")){
            if (word.toLowerCase() === filter.toLowerCase()) return true;
          }
        }
        return false;
      }));
    }

    const deleteHandler = (id) => {
      postData.posts = postData.posts.filter((post) => post.id !== id);
      setPost(post.filter((post) => post.id !== id));
    }
  return (
    <div className="content">
      <div className="content__form">
        <button className="buttonForm" onClick={() => setModal(true)}>Create new post</button>
        <div>
          <input
            type="text"
            placeholder="#tag"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button onClick={filterHandler}>Filter tag</button>
        </div>
      </div>
      <div className="content__post">
        {post.map((post) => (
          <Posts
            key={post.id}
            id={post.id}  
            text={post.text}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
      <Modal
        createHandler={createHandler}
        visible={isModal}
        onClose={onClose}>
      </Modal>
    </div>
  );
}

export default Content;

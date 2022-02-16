import React, { useRef, useState } from 'react';
import "./Posts.scss"

const postData = require('./postData.json');
const Posts = ({id, text, deleteHandler}) => {
  const [postText, setPostText] = useState(text);
  const [edit, setEdit] = useState(false);
  const tag = useRef([]);
  
  const textChangeHandler = (e) => {
    tag.current = [];
    e.target.value.split(' ').forEach((word) => {
        if (word.includes("#")){
          const position = word.indexOf('#');
          if (!tag.current.includes(word.substring(position))){
            tag.current.push(word.substring(position));    
          }
        }
      });
    setPostText(e.target.value);
  }

  const editHandler = () => {
    postData.posts[postData.posts.findIndex((post) => post.id === id)].text = postText;
    setEdit(false);
  }
  return (
    <div className="post">
      <div className="post__top">
        {edit ? <span onClick = {editHandler}>&#10004;</span>:<span onClick = {() => setEdit(true)}>&#9998;</span> }
        <span onClick={() => deleteHandler(id)}>&times;</span>
      </div>
      <div className="posts">
        {edit ? <textarea value={postText} onChange={textChangeHandler} /> : 
        <p>
          {
            (postText || '').split(' ').map((word) => {
              if (word.includes("#")){
                const position = word.indexOf('#');
                if (!tag.current.includes(word.substring(position))){
                  tag.current.push(word.substring(position));    
                }
                return (
                  <>
                    {word.substring(0, position)}
                    <span>{`${word.substring(position)}`}</span>
                  </>
                );
              }
              return `${word} `;
            })
          }
        </p>
        }
        <div>
          {
            tag.current.map((tag) => <span key={tag} className="tag">{tag}</span>)
          }
        </div>
      </div>
    </div>
  );
};

export default Posts;

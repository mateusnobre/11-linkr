import React, { useState } from "react";
import ReactHashtag from "react-hashtag";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { Link, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import axios from 'axios';

export default function Post(props) {
  const { content } = props;
  const { id, text, link, linkTitle, linkDescription, linkImage, user, likes } =
    content;
  const history = useHistory();
  var [isLikedByMe, setIsLikedByMe] = useState(false);
  function hashtagClick(val) {
    history.push(`/hashtag/${val}`);
  }

  function likePost() {
    if (!isLikedByMe) {
      console.log(props.config)
      const likeRequest = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`, props.config);
      likeRequest.then(() => {setIsLikedByMe(true);})
    }

  }

  return (
    <div className="post">
      <div className="profile-picture">
        <Link to={`/user/${user.id}`}>
          <img src={user.avatar}></img>
        </Link>
        <IconContext.Provider value={{ className: "react-icons" }}>
          {!isLikedByMe && <AiOutlineHeart onClick={() => likePost(setIsLikedByMe)} />}
          {isLikedByMe && <FcLike onClick={likePost} />}
        </IconContext.Provider>
        <div className="likes">{`${likes.length} likes`}</div>
      </div>
      <div className="right">
        <Link to={`/user/${user.id}`} className="name">
          {user.username}
        </Link>
        <div className="text">
          <ReactHashtag onHashtagClick={(val) => hashtagClick(val)}>
            {text}
          </ReactHashtag>
        </div>
        <div className="link-box">
          <div>
            <div className="link-title">{linkTitle}</div>
            <div className="link-description">{linkDescription}</div>
            <a className="link" target="_blanck" href={link}>{link}</a>
          </div>
          <img src={linkImage} alt="image" />
        </div>
      </div>
    </div>
  );
}

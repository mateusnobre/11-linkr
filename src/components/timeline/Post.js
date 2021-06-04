import React, { useState, useEffect } from "react";
import ReactHashtag from "react-hashtag";
import ReactTooltip from "react-tooltip";
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
  const [likesArr, setLikesArr] = useState(likes);
  useEffect(() => {
    for (let i = 0; i < likesArr.length; i++) {
      if (likes[i].userId === props.userId) {
        setIsLikedByMe(true);
      }
    }
  }, []);
  function hashtagClick(val) {
    history.push(`/hashtag/${val}`);
  }

  function likePost() {
    if (!isLikedByMe) {
      const likeRequest = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`, null, props.config);
      likeRequest.then((response) => {  setIsLikedByMe(true);var newArr = response.data.post.likes;setLikesArr([...newArr]);console.log(newArr); console.log(likesArr);})
    }
    else if (isLikedByMe) {
      const dislikeRequest = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`, null, props.config);
      dislikeRequest.then((response) => {  setIsLikedByMe(false);var newArr = response.data.post.likes;setLikesArr([...newArr]); console.log(likesArr);})
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
        <div className="likes" data-tip data-for={`likesTip${id}`}>{`${likesArr.length} likes`}</div>
        {(isLikedByMe && likesArr.length > 1) && <ReactTooltip id={`likesTip${id}`} place='bottom' effect='solid'>Você, {likesArr[0].username}  e outras {likesArr.length - 2} pessoas</ReactTooltip>}
        {(!isLikedByMe && likesArr.length > 1) && <ReactTooltip id={`likesTip${id}`} place='bottom' effect='solid'>{likesArr[0].username}, {likesArr[1].username}  e outras {likesArr.length - 2} pessoas</ReactTooltip>}
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
        <a target="_blanck" href={link} className="link-box">
          <div className="left">
            <div className="link-title">{linkTitle}</div>
            <div className="link-description">{linkDescription}</div>
            <div className="link-link">{link}</div>
          </div>
          <img src={linkImage} alt="image" />
        </a>
      </div>
    </div>
  );
}

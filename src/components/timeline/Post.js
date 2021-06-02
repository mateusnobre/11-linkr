import React from "react";
import ReactHashtag from "react-hashtag";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
export default function Post(props) {
  const { content } = props;
  const { id, text, link, linkTitle, linkDescription, linkImage, user, likes } =
    content;
  const history = useHistory();

  function hashtagClick(val) {
    history.push(`/hashtag/${val}`);
  }

  return (
    <div className="post">
      <div className="profile-picture">
        <Link to={`/user/${user.id}`}>
          <img src={user.avatar}></img>
        </Link>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <AiOutlineHeart />
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
        <a target="_blanck" href={link} className="link-box">
          <div>
            <div className="link-title">{linkTitle}</div>
            <div className="link-description">{linkDescription}</div>
            <a className="link" target="_blanck" href={link}>{link}</a>
          </div>
          <img src={linkImage} alt="image" />
        </a>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import ReactHashtag from "react-hashtag";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { HiTrash } from "react-icons/hi";
import {
  AiOutlineHeart,
  AiOutlineClose,
  AiOutlineComment,
} from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FiSend } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import ReactPlayer from "react-player";
import axios from "axios";
import Loading from "../Loading";
import styled from "styled-components";

const PreviewDialogBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 90%;
    width: 95%;
  }
`;
const PreviewDialogHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const NewTabButton = styled.div`
  width: 138px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  color: white;
  font-family: Lato;
  font-weight: bold;
  font-size: 14px;
  background: #1877f2;
  border-radius: 5px;
`;

export default function Post(props) {
  const { content, config } = props;
  const { id, text, link, linkTitle, linkDescription, linkImage, user, likes } =
    content;
  const history = useHistory();
  var [isLikedByMe, setIsLikedByMe] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [likesArr, setLikesArr] = useState(likes);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [returnButtonEnable, setReturnButtonEnable] = useState(true);
  const [deleteButtonEnable, setDeleteButtonEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState({ comments: [] });
  const [commentsEnable, setCommentsEnable] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [followersID, setFollowersID] = useState([]);
  const [render, setRender] = useState([true]);
  const token = localStorage.getItem("token");
  const userLogged = JSON.parse(localStorage.getItem("user"));
  var getYouTubeID = require("get-youtube-id");

  useEffect(() => {
    for (let i = 0; i < likesArr.length; i++) {
      if (likes[i].userId === props.userId) {
        setIsLikedByMe(true);
      }
    }
    const requestComments = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/comments`,
      config
    );
    requestComments.then((response) => {
      setComments(response.data);
    });
    const requestFollowers = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows`,
      config
    );
    requestFollowers.then((response) => {
      setFollowersID(response.data.users.map((e) => e.id));
    });
  }, render);

  function hashtagClick(val) {
    history.push(`/hashtag/${val.slice(1)}`);
  }

  function likePost() {
    if (!isLikedByMe) {
      const likeRequest = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`,
        null,
        config
      );
      likeRequest.then((response) => {
        setIsLikedByMe(true);
        var newArr = response.data.post.likes;
        setLikesArr([...newArr]);
      });
    } else if (isLikedByMe) {
      const dislikeRequest = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`,
        null,
        config
      );
      dislikeRequest.then((response) => {
        setIsLikedByMe(false);
        var newArr = response.data.post.likes;
        setLikesArr([...newArr]);
      });
    }
  }
  function showPreviewDialog() {
    setPreviewMode(true);
  }
  function hidePreviewDialog() {
    setPreviewMode(false);
  }

  function commentPost(event) {
    event.preventDefault();
    let data = {
      text: userComment,
      user: userLogged,
    };
    const request = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/comment`,
      data,
      config
    );
    console.log(comments);
    request.then((response) => {
      setRender([!render[0]]);
    });
    request.catch((error) => {
      alert(error);
    });
    setUserComment("");
  }

  function deletePost() {
    if (!deleteButtonEnable) return;
    setDeleteButtonEnable(true);
    setIsLoading(true);
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`;
    const request = axios.delete(url, props.config);
    request.then((response) => {
      setModalOpen(false);
      setIsLoading(false);
      if (render[0] !== 2) {
        setRender([2]);
      } else {
        setRender([1]);
      }
    });
    request.catch((error) => {
      setModalOpen(false);
      setIsLoading(false);
      alert("Não foi possível excluir o post");
    });
  }

  function returnButton() {
    if (!returnButtonEnable) return;
    setModalOpen(false);
  }

  return (
    <div className="post-and-comments">
      <div className="post">
        <Modal isOpen={previewMode} contentLabel="Preview Modal">
          <PreviewDialogBox>
            <PreviewDialogHeader>
              <NewTabButton
                onClick={() => {
                  window.open(link, "_blank");
                  hidePreviewDialog();
                }}
              >
                Open in new tab
              </NewTabButton>
              <AiOutlineClose onClick={hidePreviewDialog}></AiOutlineClose>
            </PreviewDialogHeader>
            <img src={linkImage} alt={linkTitle} />
          </PreviewDialogBox>
        </Modal>
        <div className="profile-picture">
          <Link to={`/user/${user.id}`}>
            <img src={user.avatar} alt="Avatar"></img>
          </Link>
          <IconContext.Provider value={{ className: "react-icons" }}>
            {!isLikedByMe && <AiOutlineHeart onClick={likePost} />}
            {isLikedByMe && <FcLike onClick={likePost} />}
          </IconContext.Provider>
          <div
            className="likes"
            data-tip
            data-for={`likesTip${id}`}
          >{`${likesArr.length} likes`}</div>
          {isLikedByMe && likesArr.length > 1 && (
            <ReactTooltip id={`likesTip${id}`} place="bottom" effect="solid">
              Você, {likesArr[0].username} e outras {likesArr.length - 2}{" "}
              pessoas
            </ReactTooltip>
          )}
          {!isLikedByMe && likesArr.length > 1 && (
            <ReactTooltip id={`likesTip${id}`} place="bottom" effect="solid">
              {likesArr[0].username}, {likesArr[1].username} e outras{" "}
              {likesArr.length - 2} pessoas
            </ReactTooltip>
          )}
          <div onClick={() => setCommentsEnable(!commentsEnable)}>
            <IconContext.Provider value={{ className: "react-icons" }}>
              <AiOutlineComment />
            </IconContext.Provider>
          </div>
          <p className="comments">{comments.comments.length} comments</p>
        </div>
        <div className="right">
          {userLogged.id === user.id ? (
            <IconContext.Provider value={{ className: "delete" }}>
              <HiTrash onClick={() => setModalOpen(true)}></HiTrash>
            </IconContext.Provider>
          ) : (
            ""
          )}
          <Link to={`/user/${user.id}`} className="name">
            {user.username}
          </Link>
          <div className="text">
            <ReactHashtag onHashtagClick={(val) => hashtagClick(val)}>
              {text}
            </ReactHashtag>
          </div>
          {getYouTubeID(link) === null ? (
            <a
              target="_blanck"
              onClick={showPreviewDialog}
              className="link-box"
            >
              <div className="left">
                <div className="link-title">{linkTitle}</div>
                <div className="link-description">{linkDescription}</div>
                <div className="link-link">{link}</div>
              </div>
              <img src={linkImage} alt="Preview" />
            </a>
          ) : (
            <div>
              <ReactPlayer url={link} controls width="501px" height="281px" />
              <a target="_blanck" href={link} className="url-video">
                {link}
              </a>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalOpen(false)}
        style={modalStyle}
      >
        <ModalText>
          Tem certeza que deseja <br />
          excluir essa publicaçao
        </ModalText>
        <ModalReturn onClick={returnButton}>Não, voltar</ModalReturn>
        <ModalConfirm onClick={deletePost}>Sim, excluir</ModalConfirm>
        {isLoading && <Loading />}
      </Modal>
      {commentsEnable ? (
        <div className="comments-box">
          {comments.comments.map((comment) => (
            <div className="comment-user" key={comment.id}>
              <img src={comment.user.avatar} alt={comment.user.username}></img>
              <div
                className="texts"
                onClick={() => {
                  console.log(followersID, comment.user);
                }}
              >
                <h1>
                  {comment.user.username}
                  <span>
                    {userLogged.id === comment.user.id ? "• post’s author" : ""}
                    {followersID.includes(comment.user.id) ? "• following" : ""}
                  </span>
                </h1>
                <h2>{comment.text}</h2>
              </div>
            </div>
          ))}
          <div className="my-comments">
            <img src={userLogged.avatar} alt={userLogged.username}></img>
            <form onSubmit={commentPost}>
              <input
                type="text"
                placeholder="write a comment..."
                onChange={(e) => setUserComment(e.target.value)}
                value={userComment}
              ></input>
              <IconContext.Provider value={{ className: "send" }}>
                <FiSend onClick={commentPost}></FiSend>
              </IconContext.Provider>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const modalStyle = {
  content: {
    top: "25%",
    left: "25%",
    right: "25%",
    bottom: "25%",
    background: "#333333",
    borderRadius: "50px",
    color: "white",
  },
};

const ModalText = styled.h1`
  color: #ffffff;
  font-family: "Lato";
  font-size: 30px;
  text-align: center;
  margin-top: 10px;
`;
const ModalReturn = styled.button`
  width: 134px;
  height: 40px;
  border-radius: 5px;
  margin-top: 60px;
  border: none;
  background-color: white;
  color: #1877f2;
  margin-left: 150px;
  font-family: "Lato";
`;
const ModalConfirm = styled.button`
  width: 134px;
  height: 40px;
  border-radius: 5px;
  margin-top: 40px;
  border: none;
  background-color: #1877f2;
  color: white;
  margin-left: 40px;
  font-family: "Lato";
`;

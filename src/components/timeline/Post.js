import React, { useState, useEffect } from "react";
import ReactHashtag from "react-hashtag";
import ReactTooltip from "react-tooltip";
import { AiOutlineHeart } from "react-icons/ai";
import Modal from "react-modal";
import { HiTrash } from "react-icons/hi";
import { FcLike } from "react-icons/fc";
import { Link, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import ReactPlayer from "react-player";
import axios from "axios";
import { modalStyle } from "./Style";
import Loading from "../Loading";

export default function Post(props) {
  const { content, userId, render, setRender } = props;
  const { id, text, link, linkTitle, linkDescription, linkImage, user, likes } =
    content;
  const history = useHistory();
  var [isLikedByMe, setIsLikedByMe] = useState(false);
  const [likesArr, setLikesArr] = useState(likes);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [returnButtonEnable, setReturnButtonEnable] = useState(true);
  const [deleteButtonEnable, setDeleteButtonEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  var getYouTubeID = require("get-youtube-id");

  useEffect(() => {
    for (let i = 0; i < likesArr.length; i++) {
      if (likes[i].userId === props.userId) {
        setIsLikedByMe(true);
      }
    }
  }, []);
  function hashtagClick(val) {
    history.push(`/hashtag/${val.slice(1)}`);
  }

  function likePost() {
    if (!isLikedByMe) {
      const likeRequest = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`,
        null,
        props.config
      );
      likeRequest.then((response) => {
        setIsLikedByMe(true);
        var newArr = response.data.post.likes;
        setLikesArr([...newArr]);
        console.log(newArr);
        console.log(likesArr);
      });
    } else if (isLikedByMe) {
      const dislikeRequest = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`,
        null,
        props.config
      );
      dislikeRequest.then((response) => {
        setIsLikedByMe(false);
        var newArr = response.data.post.likes;
        setLikesArr([...newArr]);
        console.log(likesArr);
      });
    }
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
    <div className="post">
      <div className="profile-picture">
        <Link to={`/user/${user.id}`}>
          <img src={user.avatar} alt="Avatar"></img>
        </Link>
        <IconContext.Provider value={{ className: "react-icons" }}>
          {!isLikedByMe && (
            <AiOutlineHeart onClick={() => likePost(setIsLikedByMe)} />
          )}
          {isLikedByMe && <FcLike onClick={likePost} />}
        </IconContext.Provider>
        <div
          className="likes"
          data-tip
          data-for={`likesTip${id}`}
        >{`${likesArr.length} likes`}</div>
        {isLikedByMe && likesArr.length > 1 && (
          <ReactTooltip id={`likesTip${id}`} place="bottom" effect="solid">
            Você, {likesArr[0].username} e outras {likesArr.length - 2} pessoas
          </ReactTooltip>
        )}
        {!isLikedByMe && likesArr.length > 1 && (
          <ReactTooltip id={`likesTip${id}`} place="bottom" effect="solid">
            {likesArr[0].username}, {likesArr[1].username} e outras{" "}
            {likesArr.length - 2} pessoas
          </ReactTooltip>
        )}
      </div>
      <div className="right">
        {userId === user.id ? (
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
          <a target="_blanck" href={link} className="link-box">
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalOpen(false)}
        style={modalStyle}
      >
        <h1 className="hidden">
          Tem certeza que deseja excluir essa publicaçao
        </h1>
        <button className="modal-back" onClick={returnButton}>
          Não, voltar
        </button>
        <button className="modal-delete" onClick={deletePost}>
          Sim, excluir
        </button>
        {isLoading && <Loading />}
      </Modal>
    </div>
  );
}

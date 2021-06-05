import styled from "styled-components";

const Container = styled.div`
  background-color: #333333;
  min-height: 100vh;
  color: white;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 28px;
    padding-right: 10px;
    width: 100%;
    height: 72px;
    background-color: #151515;
  }
  .profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 88px;
  }
  .header .react-icons {
    font-size: 20px;
    color: white;
  }
  .profile-picture {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-picture img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
  }
  .profile-picture .react-icons {
    margin-top: 20px;
    font-size: 20px;
  }
  .likes {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;
    margin-top: 4px;
  }
  .content {
    width: 937px;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
  }
  .posts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 611px;
  }
  .my-posts{
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 611px;
  }
  }
  .post {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    width: 611px;
    background: #171717;
    border-radius: 16px;
    margin-bottom: 29px;
    position: relative;
  }
  .menu {
    position: fixed;
    width: 150px;
    height: 109px;
    right: 0;
    top: 72px;
    background: #171717;
    border-radius: 0px 0px 20px 20px;
  }
  .logout {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Lato";
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #ffffff;
    margin-top: 10px;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  .new-post {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    width: 611px;
    height: 209px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 29px;
  }
  .new-post-title {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-bottom: 10px;
  }
  .trending {
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
  }
  .name {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    font-size: 19px;
    color: #ffffff;
    text-decoration: none;
  }
  h1 {
    font-family: "Passion One", cursive;
    font-size: 49px;
    color: white;
  }
  h2 {
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    width: 937px;
    word-break: keep-all;
    margin: 53px auto 43px auto;
  }
  .text {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    margin-top: 7px;
    margin-bottom: 14px;
  }
  .right {
    width: 502px;
  }
  .link-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 503px;
    border: 1px solid #4d4d4d;
    box-sizing: border-box;
    border-radius: 11px;
    padding-left: 19.31px;
    word-wrap: break-word;
  }
  .link-box img {
    width: 153.44px;
    height: 155px;
    border-radius: 0px 12px 13px 0px;
  }
  .left {
    width: 303px;
  }
  .link-title {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    width: 250px;
    margin-top: 10px;
  }
  .link-description {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    width: 303px;
    margin-top: 5px;
    flex-wrap: wrap;
    word-wrap: break-word;
  }
  .link-link {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    text-decoration: none;
    word-wrap: break-word;
    margin-top: 12px;
    margin-bottom: 10px;
  }
  span {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 20px;
    color: white;
    font-weight: bold;
  }
  form {
    display: flex;
    flex-flow: wrap column;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
  }
  form :first-child {
    height: 30px;
  }
  input {
    width: 100%;
    height: 66px;
    margin-bottom: 5px;
    border-radius: 5px;
    font-family: "Lato", sans-serif;
    color: #949494;
    padding-left: 13px;
    font-size: 15px;
    border: none;
    background: #efefef;
  }
  button {
    width: 112px;
    height: 31px;
    background-color: #1877f2;
    border: none;
    border-radius: 5px;
    color: white;
    font-family: "Lato", sans-serif;
    font-size: 14px;
  }
  .trending-title {
    font-family: "Oswald";
    font-style: normal;
    font-weight: bold;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
    margin-left: 16px;
    margin-top: 9px;
  }
  .trending-bar {
    width: 100%;
    height: 1px;
    background-color: #484848;
    margin: 12px 0px;
  }
  .hashtags {
    font-family: "Lato";
    font-style: normal;
    font-weight: bold;
    font-size: 19px;
    color: #ffffff;
    margin-left: 16px;
    margin-top: 10px;
  }
  a {
    text-decoration: none;
  }
  .url-video {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 31px;
    color: #b7b7b7;
  }
`;

export default Container;

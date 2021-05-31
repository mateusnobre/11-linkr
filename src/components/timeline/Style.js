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
  .profile-picture img {
    width: 53px;
    border-radius: 26.5px;
  }
  .content {
    width: 937px;
    margin: 0px auto 40px auto;
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
  .post {
    width: 611px;
    height: 276px;
    background: #171717;
    border-radius: 16px;
    margin-bottom: 29px;
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
  }
  .hidden {
    display: none;
  }
  h1 {
    font-family: "Passion One", cursive;
    font-size: 49px;
  }
  h2 {
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    width: 937px;
    word-break: keep-all;
    margin: 53px auto 43px auto;
  }
`;

export default Container;

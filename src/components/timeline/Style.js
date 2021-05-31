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
  form {
    display: flex;
    flex-flow: wrap column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 40%;
    background-color: #333333;
  }
  input {
    width: 80%;
    height: 40px;
    margin-bottom: 13px;
    border-radius: 6px;
    font-family: "Oswald", sans-serif;
    color: #9f9f9f;
    padding-left: 17px;
    font-size: 18px;
    border: none;
  }
  button {
    width: 83%;
    height: 40px;
    background-color: #1877f2;
    border: none;
    border-radius: 6px;
    color: white;
    font-family: "Oswald", sans-serif;
    font-size: 18px;
  }
  h3 {
    font-family: "Lato", sans-serif;
    color: white;
    margin-top: 13px;
    text-decoration: underline;
  }
`;

export default Container;

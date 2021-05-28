import styled from "styled-components";

const Container = styled.div`
  background-color: #151515;
  height: 100vh;
  color: white;
  display: flex;
  flex-flow: wrap column;
  .logo {
    display: flex;
    flex-direction: column;
    padding-left: 10vh;
    padding-top: 28vh;
    width: 60%;
    height: 100vh;
  }
  h1 {
    font-family: "Passion One", cursive;
    font-size: 70px;
  }
  h2 {
    font-family: "Oswald", sans-serif;
    font-size: 30px;
    width: 440px;
    word-break: keep-all;
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

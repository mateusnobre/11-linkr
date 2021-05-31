import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
export default function Post(props) {
  const { content } = props;
  const {id, text, link, linkTitle, linkDescription, linkImage, user, likes} = content;

  return (
      <div className="post"></div>
  );
}
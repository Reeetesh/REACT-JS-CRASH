import { useEffect, useState, React } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

function Home() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + location.search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [location.search]);
  return (
    <>
      <Header></Header>
      <div className="home">
        <Posts posts={posts}></Posts>
        <Sidebar></Sidebar>
      </div>
    </>
  );
}

export default Home;

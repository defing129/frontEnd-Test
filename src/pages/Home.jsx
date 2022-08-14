import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { fetchPosts } from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 5 }} value={0} aria-label=""></Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                nickname={obj.nickname}
                imageUrl={obj.imageUrl}
                real_name={obj.real_name}
                origin_description={obj.origin_description}
                superpowers={obj.superpowers}
                catch_phrase={obj.catch_phrase}
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};

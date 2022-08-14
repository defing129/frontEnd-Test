import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./Post.module.scss";
import { useDispatch } from "react-redux";
import { fetchPosts, fetchRemovePosts } from "../../redux/slices/posts";

export const Post = ({
  id,
  nickname,
  real_name,
  origin_description,
  superpowers,
  catch_phrase,
  imageUrl,
  isFullPost,
}) => {
  const dispatch = useDispatch();

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить?")) {
      dispatch(fetchRemovePosts(id)).then(() => {
        dispatch(fetchPosts());
      });
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={`http://localhost:4444${imageUrl}`}
          alt={nickname}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.indention}>
          <h3
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? (
              nickname
            ) : (
              <Link to={`/posts/${id}`}>{nickname}</Link>
            )}
          </h3>

          <ul className={styles.postDetails}>
            <li>
              <span>{real_name}</span>
            </li>
          </ul>

          {isFullPost && (
            <div>
              <div>
                <h3>Происходжения:</h3>
                <h5>{origin_description}</h5>
              </div>
              <div>
                <h3>Сверхспособность:</h3>
                <h5>{superpowers}</h5>
              </div>
              <div>
                <h3>Цитата героя:</h3>
                <h5>{catch_phrase}</h5>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {isFullPost ? (
          ""
        ) : (
          <div className={styles.editButtons}>
            <Link to={`/posts/${id}/edit`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

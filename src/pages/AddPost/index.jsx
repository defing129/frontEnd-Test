import React, { useCallback } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(false);
  const [nickname, setNickname] = React.useState("");
  const [real_name, setRealname] = React.useState("");
  const [origin_description, setOrigindescription] = React.useState("");
  const [superpowers, setSuperpowers] = React.useState("");
  const [catch_phrase, setCatchphrase] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const inputFileRef = React.useRef(null);

  const isEdditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        nickname,
        real_name,
        imageUrl,
        origin_description,
        superpowers,
        catch_phrase,
      };

      const { data } = isEdditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const _id = isEdditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании героя");
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setNickname(data.nickname);
          setRealname(data.real_name);
          setOrigindescription(data.origin_description);
          setSuperpowers(data.superpowers);
          setCatchphrase(data.catch_phrase);
          setImageUrl(data.imageUrl);
        })
        .catch((err) => {
          console.warn(err);
          alert("Ошибка при создании героя");
        });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        <div>
          {imageUrl ? (
            <>
              <div className={styles.imagebtn}>
                <div>
                  <img
                    className={styles.image}
                    src={`http://localhost:4444${imageUrl}`}
                    alt="Uploaded"
                  />
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onClickRemoveImage}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <Button
              onClick={() => inputFileRef.current.click()}
              variant="outlined"
              size="large"
            >
              Загрузить фото
            </Button>
          )}
        </div>

        <div>
          <input
            ref={inputFileRef}
            type="file"
            onChange={handleChangeFile}
            hidden
          />
        </div>
      </div>

      <br />

      <br />
      <div>
        <TextField
          variant="standard"
          placeholder="Никнейм..."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          fullWidth
        />
      </div>
      <div>
        <TextField
          variant="standard"
          placeholder="Реальное имя..."
          value={real_name}
          onChange={(e) => setRealname(e.target.value)}
          fullWidth
        />
      </div>
      <div>
        <TextField
          variant="standard"
          placeholder="Происхождения..."
          value={origin_description}
          onChange={(e) => setOrigindescription(e.target.value)}
          fullWidth
        />
      </div>
      <div>
        <TextField
          variant="standard"
          placeholder="Cверхспособности..."
          value={superpowers}
          onChange={(e) => setSuperpowers(e.target.value)}
          fullWidth
        />
      </div>
      <div>
        <TextField
          variant="standard"
          placeholder="Крылатая фраза..."
          value={catch_phrase}
          onChange={(e) => setCatchphrase(e.target.value)}
          fullWidth
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEdditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </div>
  );
};

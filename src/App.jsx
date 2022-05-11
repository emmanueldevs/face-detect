import './App.css';
import Navbar from './components/Navbar';
import NewPost from './components/NewPost'
import avatar from './images/avatar.jpeg';
import { useState, useEffect } from 'react';

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width,
          height: img.height
        });
      }
    }

    file && getImage();
  }, [file]);

  return (
    <div>
      <Navbar/>
      { image ? (<NewPost image={image} />) : (
        <div className="newPostCard">
          <div className="addPost">
            <img src={avatar} className="fab fa-facebook avatar" alt="avatar" />
          </div>
          <div className="postForm form-group">
            <h1 style={{ color: 'white' }}>Upload picture</h1>
            <input type="text" placeholder="what's on your mind?" className="postInput"/>
            <label htmlFor="file">
              <i className="far fa-upload addIcon"></i>
              <i className="far fa-file-upload addIcon"></i>
              <i className="far fa-cloud-upload addIcon"></i>
              <button className="btn-primary">Send</button>
            </label>
            <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

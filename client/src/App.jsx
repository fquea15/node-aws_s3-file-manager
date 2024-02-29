import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [images, setImages] = useState([]);
  const apiURL = "http://localhost:3000/imagenes";

  const getImages = async () => {
    const response = await axios.get(apiURL);
    setImages(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getImages();
  }, []);
  return (
    <main>
      <h1 className="title">Imagenes</h1>
      <div className="card">
        {images.map((image, index) => (
          <section className="card__items" key={index}>
            <div className="card__item">
              <img src={image.url} alt={image.name} className="card__image" />
              <p className="card__description">{image.name}</p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default App;

import { useEffect, useState } from "react";
import GenerateImage from "./common/generateImage";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pictureNr, setPictureNr] = useState(0);
  useEffect(() => {
    fetch("https://picsum.photos/v2/list")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw { response };
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error during fetching: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return "Loading";
  if (error) return "Error!";
  function renderPicture(id) {
    let slug = data[id].url.replace(
      "https://unsplash.com/photos/",
      "http://source.unsplash.com/"
    );
    return slug;
  }
  function changePictures(operation) {
    if (operation === "increment") setPictureNr(pictureNr + 1);
    if (operation === "decrement") setPictureNr(pictureNr - 1);
    else setPictureNr(0);
  }

  return (
    <div className="relative w-screen h-screen bg-black">
      <div className="absolute w-[75%] h-[50%] top-[25%] left-[12.5%] flex justify-center content-center flex-row item_direction">
        <GenerateImage img={renderPicture(pictureNr)} />
        <GenerateImage img={renderPicture(pictureNr + 1)} />
        <GenerateImage img={renderPicture(pictureNr + 2)} />
      </div>

      <button
        className="absolute top-[80%] left-[8%] bg-violet-900 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-l"
        onClick={() => setPictureNr(pictureNr - 1 >= 0 ? pictureNr - 1 : 0)}
      >
        Prev
      </button>
      <button
        className="absolute top-[80%] right-[8%] bg-violet-900 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-r
      "
        onClick={() =>
          setPictureNr(
            pictureNr + 1 <= data.length - 3 ? pictureNr + 1 : data.length - 3
          )
        }
      >
        Next
      </button>
    </div>
  );
}

export default App;

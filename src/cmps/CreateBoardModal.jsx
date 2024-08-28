import { useState } from "react";
import { boardService } from "../services/board";

export function CreateBoardModal({ handleStartBoard }) {
  const [newBoard, setNewBoard] = useState({});
  const [bgImage, setBgImage] = useState("");
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedImgIdx, setSelectedImgIdx] = useState(null);
  const urlImgs = [
    {
      src: "https://cdn.pixabay.com/photo/2024/08/01/10/18/bird-8936789_1280.jpg",
      alt: "bird",
    },
    {
      src: "https://cdn.pixabay.com/photo/2024/07/31/15/13/green-8935080_1280.jpg",
      alt: "green-swirl",
    },
    {
      src: "https://cdn.pixabay.com/photo/2024/02/17/17/20/chess-8579843_1280.jpg",
      alt: "chess",
    },
    {
      src: "https://cdn.pixabay.com/photo/2013/02/17/07/19/flower-82437_1280.jpg",
      alt: "orange-flower",
    },
    {
      src: "https://cdn.pixabay.com/photo/2024/08/11/18/15/leaves-8962041_1280.jpg",
      alt: "leafs",
    },
    {
      src: "https://cdn.pixabay.com/photo/2022/06/23/09/58/the-season-of-ripe-rice-7279448_1280.jpg",
      alt: "the-season-of-ripe-rice",
    },
  ];

  function handleImgClick(imgSrc, idx) {
    setBgImage(imgSrc);
    setSelectedImgIdx(idx);
  }

  return (
    <div style={{ backgroundColor: "lightGreen", height: "200px" }}>
      <ul>
        {urlImgs.map((img, idx) => (
          <li
            key={idx}
            style={{
              width: "100px",
              height: "120px",
              border: selectedImgIdx === idx ? "2px solid blue" : "none", // הוספת מסגרת מותנית
              cursor: "pointer",
            }}
            onClick={() => handleImgClick(img.src, idx)}
          >
            <img src={img.src} alt={img.alt} />
          </li>
        ))}
      </ul>
      <label>board title</label>
      <input
        value={boardTitle}
        onChange={(e) => setBoardTitle(e.target.value)}
      />
      <button
        onClick={() =>
          handleStartBoard({
            ...newBoard,
            backgroundImage: bgImage,
            title: boardTitle,
          })
        }
      >
        start
      </button>
    </div>
  );
}

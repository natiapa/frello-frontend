import { useState } from "react";
import { boardService } from "../services/board";

export function CreateBoardModal({ handleCreateBoard }) {
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
    {
      src: "https://cdn.pixabay.com/photo/2024/07/05/22/30/penguin-8875750_1280.jpg",
      alt: "penguin",
    },
    {
      src: "https://cdn.pixabay.com/photo/2024/03/04/14/56/pagoda-8612554_1280.jpg",
      alt: "pagoda",
    },
    {
      src: "https://cdn.pixabay.com/photo/2018/01/31/12/16/architecture-3121009_1280.jpg",
      alt: "architecture",
    },
    {
      src: "https://cdn.pixabay.com/photo/2016/05/10/12/21/animal-1383616_960_720.jpg",
      alt: "lemur",
    },
    {
      src: "https://cdn.pixabay.com/photo/2017/04/28/15/20/mount-rushmore-2268636_1280.jpg",
      alt: "mount-rushmore",
    },
    {
      src: "https://cdn.pixabay.com/photo/2020/05/23/04/11/transport-5207942_1280.jpg",
      alt: "transport",
    },
    {
      src: "https://cdn.pixabay.com/photo/2022/10/06/10/29/witch-hazel-7502409_960_720.jpg",
      alt: "witch-hazel",
    },
    {
      src: "https://cdn.pixabay.com/photo/2023/09/21/01/20/sugar-blader-8265868_1280.jpg",
      alt: "sugar-blader",
    },
    {
      src: "https://cdn.pixabay.com/photo/2016/11/29/06/06/coast-1867704_960_720.jpg",
      alt: "coast",
    },
    {
      src: "https://cdn.pixabay.com/photo/2017/03/17/21/32/shell-2152731_960_720.jpg",
      alt: "shell",
    },
  ];

  function handleImgClick(imgSrc, idx) {
    setBgImage(imgSrc);
    setSelectedImgIdx(idx);
  }

  function handleCreateBtnClick() {
    const boardToCreate = {
      ...newBoard,
      backgroundImage: bgImage,
      title: boardTitle,
    };
    setNewBoard(boardToCreate);
    handleCreateBoard(boardToCreate);
  }

  return (
    <div className="create-board-modal">
      <ul className="img-list">
        {urlImgs.map((img, idx) => (
          <li key={idx}>
            <img
              src={img.src}
              alt={img.alt}
              onClick={() => handleImgClick(img.src, idx)}
              style={{
                border: selectedImgIdx === idx ? "2px solid #0C66E4" : "none",
                opacity: selectedImgIdx === idx ? "0.7" : "1",
              }}
            />
          </li>
        ))}
      </ul>

      <label>Board title</label>
      <input
        value={boardTitle}
        onChange={(e) => setBoardTitle(e.target.value)}
      />
      <button className="create-btn" onClick={handleCreateBtnClick}>
        Create
      </button>
    </div>
  );
}

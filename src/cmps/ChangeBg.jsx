import { useEffect, useState } from "react";
import { boardService } from "../services/board";
import { loadBoard, updateBoard } from "../store/actions/board.actions";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
export function ChangeBg({ setIsChangeBgOpen }) {
  const board = useSelector((storeState) => storeState.boardModule.board);
  const [currBoard, setCurrBoard] = useState(board);
  const [type, setType] = useState("");

  useEffect(() => {
    loadBoard(board._id);
  }, [currBoard.style]);

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

  const colors = [
    "#A05A6C", // Dusty Rose
    "#B69F6A", // Golden Olive
    "#7D9ACF", // Powder Blue
    "#8F9A7B", // Moss Green
    "#9B7E9A", // Mauve
    "#D0959C", // Blush Pink
    "#8F9C8E", // Olive Green
    "#9C8D9E", // Lavender
    "#8E7F6D", // Earthy Beige
    "#7B9AB0", // Steel Blue
    "#D07B7A", // Coral
    "#8D6D9B", // Deep Lilac
    "#7F9C8F", // Forest Green
    "#D07F6D", // Light Terracotta
    "#6A8AB2", // Slate Blue
    "#D2A4A3", // Salmon
  ];

  function handleImgClick(bgType, idx) {
    if (type === "bgImage") {
      const boardToUpdate = {
        ...currBoard,
        style: { backgroundImage: bgType },
      };
      setCurrBoard(boardToUpdate);
      updateBoard(boardToUpdate);
    } else if (type === "bgColor") {
      const boardToUpdate = {
        ...currBoard,
        style: { backgroundColor: bgType },
      };
      setCurrBoard(boardToUpdate);
      console.log(currBoard.style);
      updateBoard(boardToUpdate);
    }
  }

  return (
    <section className="change-img">
      <header>
        <span className="back-btn" onClick={() => setIsChangeBgOpen(false)}>
          <IoIosArrowBack />
        </span>
        <h3>Change background</h3>
      </header>

      <section className="btns">
        <button className="images-btn" onClick={() => setType("bgImage")}>
          Photos
        </button>
        <button className="colors-btn" onClick={() => setType("bgColor")}>
          Colors
        </button>
      </section>

      {type === "bgImage" && (
        <ul className="img-list" style={{ height: "80vh", overflow: "auto" }}>
          {urlImgs.map((img, idx) => (
            <li key={idx}>
              <img
                src={img.src}
                alt={img.alt}
                // style={{ width: "100px" }}
                onClick={() => handleImgClick(img.src, idx)}
              />
            </li>
          ))}
        </ul>
      )}
      {type === "bgColor" && (
        <ul className="color-list" style={{ height: "80vh", overflow: "auto" }}>
          {colors.map((color, idx) => (
            <li key={idx} onClick={() => handleImgClick(color, idx)}>
              <div
                className="color"
                style={{
                  backgroundColor: color,
                }}
              ></div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

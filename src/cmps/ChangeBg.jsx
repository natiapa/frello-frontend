import { useEffect, useState } from "react";
import { boardService } from "../services/board";
import { loadBoard, updateBoard } from "../store/actions/board.actions";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import SvgIcon from "../cmps/SvgIcon";
import chroma from "chroma-js";

export function ChangeBg({
  board,
  setIsChangeBgOpen,
  setIsMenuOpen,
  setCurrBoardBgStyle,
}) {
  const [type, setType] = useState("");
  const [selectedImgIdx, setSelectedImgIdx] = useState(null);
  const [showUploading, setShowUploading] = useState(false);

  //
  // const darkenedColor = chroma(bgColor).darken(1.5).hex();
  // setBgColor(darkenedColor);

  useEffect(() => {}, [board]);

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

  const darkenedColor = [
    chroma("#A05A6C").darken(1.5).hex(),
    chroma("#B69F6A").darken(1.5).hex(),
    chroma("#7D9ACF").darken(1.5).hex(),
    chroma("#8F9A7B").darken(1.5).hex(),
    chroma("#9B7E9A").darken(1.5).hex(),
    chroma("#D0959C").darken(1.5).hex(),
    chroma("#8F9C8E").darken(1.5).hex(),
    chroma("#9C8D9E").darken(1.5).hex(),
    chroma("#8E7F6D").darken(1.5).hex(),
    chroma("#7B9AB0").darken(1.5).hex(),
    chroma("#D07B7A").darken(1.5).hex(),
    chroma("#8D6D9B").darken(1.5).hex(),
    chroma("#7F9C8F").darken(1.5).hex(),
    chroma("#D07F6D").darken(1.5).hex(),
    chroma("#6A8AB2").darken(1.5).hex(),
    chroma("#D2A4A3").darken(1.5).hex(),
  ];

  async function handleImgClick(bgType, idx) {
    setSelectedImgIdx(idx);
    setShowUploading(true);

    if (type === "bgImage") {
      const boardToUpdate = {
        ...board,
        style: { backgroundImage: bgType },
      };
      updateBoard(boardToUpdate);
      setCurrBoardBgStyle(boardToUpdate.style);
    } else if (type === "bgColor") {
      const boardToUpdate = {
        ...board,
        style: {
          backgroundColor: bgType,
          darkenedColor: chroma(bgType).darken(1.5).hex(),
        },
      };

      updateBoard(boardToUpdate);
      setCurrBoardBgStyle(boardToUpdate.style);
    }
    setTimeout(() => {
      setShowUploading(false);
    }, 1000);
  }

  return (
    <section className="change-img">
      <header className="change-bg-header">
        <span className="close-btn" onClick={() => setIsMenuOpen(false)}>
          <SvgIcon iconName="close" />
        </span>
        <span className="back-btn" onClick={() => setIsChangeBgOpen(false)}>
          <IoIosArrowBack />
        </span>
        <h3>Change background</h3>
      </header>

      <section className="btns">
        <button
          className="images-btn"
          onClick={() => setType("bgImage")}
          style={{
            backgroundImage:
              "url(https://trello.com/assets/8f9c1323c9c16601a9a4.jpg)",
          }}
        ></button>
        <button
          className="colors-btn"
          onClick={() => setType("bgColor")}
          style={{
            backgroundImage:
              "url(https://trello.com/assets/97db30fe74a58b7b7a18.png)",
          }}
        ></button>
        <span className="photos-title">Photos</span>
        <span className="colors-title">Colors</span>
      </section>

      {type === "bgImage" && (
        <ul className="img-list" style={{ height: "85vh", overflow: "auto" }}>
          {urlImgs.map((img, idx) => (
            <li key={idx} style={{ position: "relative" }}>
              <img
                src={img.src}
                alt={img.alt}
                onClick={() => handleImgClick(img.src, idx)}
              />
              {selectedImgIdx === idx && showUploading && (
                <span className="loading">uploading...</span>
              )}
            </li>
          ))}
        </ul>
      )}
      {type === "bgColor" && (
        <ul className="color-list" style={{ height: "85vh", overflow: "auto" }}>
          {colors.map((color, idx) => (
            <li
              key={idx}
              onClick={() => handleImgClick(color, idx)}
              style={{ position: "relative" }}
            >
              <div
                className="color"
                style={{
                  background: `linear-gradient(to bottom right, ${darkenedColor[idx]}, ${color})`,
                }}
              ></div>
              {selectedImgIdx === idx && showUploading && (
                <span className="loading">uploading...</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

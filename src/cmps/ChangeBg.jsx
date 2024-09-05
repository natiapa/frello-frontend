import { useEffect, useState } from "react";
import { boardService } from "../services/board";
import { loadBoard, updateBoard } from "../store/actions/board.actions";
export function ChangeBg({ board, setIsChangeBgOpen }) {
  const [currBoard, setCurrBoard] = useState(board);
  //   const [isBgImage, setIsBgImage] = useState(false);
  //   const [isBgColor, setIsBgColor] = useState(false);
  const [type, setType] = useState("");

  //   useEffect(() => {
  //     // loadBoard(board._id);
  //     console.log(currBoard);
  //     setCurrBoard(currBoard);
  //   }, [currBoard]);

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
    "#F5A623", // כתום
    "#50E3C2", // טורקיז
    "#4A90E2", // כחול
    "#B8E986", // ירוק בהיר
    "#E94E77", // ורוד
    "#D0021B", // אדום
    "#F8E71C", // צהוב
    "#7ED321", // ירוק
    "#BD10E0", // סגול
    "#9013FE", // סגול כהה
    "#FFB700", // ענבר
    "#FF7F50", // קורל
    "#00BFFF", // כחול שמיים
    "#9B59B6", // אמטיסט
    "#E67E22", // גזר
    "#3498DB", // כחול שמיים
  ];

  function handleImgClick(bgType, idx) {
    if (type === "bgImage") {
      const boardToUpdate = {
        ...currBoard,
        style: { backgroundImage: bgType },
      };
      setCurrBoard(boardToUpdate);
      updateBoard(boardToUpdate);
    }
    if (type === "bgColor") {
      const boardToUpdate = {
        ...currBoard,
        style: { backgroundColor: bgType },
      };
      setCurrBoard(boardToUpdate);
      updateBoard(boardToUpdate);
    }
  }

  console.log(type);

  return (
    <section>
      <header>
        <span onClick={() => setIsChangeBgOpen(false)}>back</span>
        <h3>Change background</h3>
      </header>

      <button onClick={() => setType("bgImage")}>Photos</button>
      <button onClick={() => setType("bgColor")}>Colors</button>

      {type === "bgImage" && (
        <ul className="img-list" style={{ height: "80vh", overflow: "auto" }}>
          {urlImgs.map((img, idx) => (
            <li key={idx}>
              <img
                src={img.src}
                alt={img.alt}
                style={{ width: "100px" }}
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
                style={{
                  backgroundColor: color,
                  width: "100px",
                  height: "100px",
                }}
              ></div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

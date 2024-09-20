import { Link } from "react-router-dom";
import { BoardPreview } from "./BoardPreview";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export function StarredBoardsList({ starredBoards, onRemoveBoard }) {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    const width = window.innerWidth;
    if (width <= 600) {
      setColumns(1);
    } else if (width <= 900) {
      setColumns(2);
    } else if (width <= 1200) {
      setColumns(3);
    } else {
      setColumns(4);
    }
  }

  return (
    <section className="starred-board-list-container">
      {starredBoards && starredBoards.length > 0 && (
        <h3 className="starred-board-list-title">
          <span className="star">
            <FaRegStar />
          </span>
          <span className="title">Starred boards</span>
        </h3>
      )}
      <ul
        className="starred-board-list"
        style={{
          placeSelf: starredBoards.length > 0 ? "" : "center",
          gridTemplateRows: `repeat(${Math.ceil(
            (starredBoards.length + 1) / columns
          )}, 96px)`,
          gridTemplateColumns: `repeat(${columns}, .1fr)`,
          gap: starredBoards.length > 0 ? "1em" : "",
        }}
      >
        {starredBoards.map((starredBoard, idx) => (
          <Link
            to={`/board/${starredBoard._id}`}
            key={idx}
            style={{
              backgroundImage: starredBoard.style.backgroundImage
                ? `url(${starredBoard?.style?.backgroundImage})`
                : "",
              backgroundColor: starredBoard.style.backgroundColor
                ? starredBoard?.style?.backgroundColor
                : "",

              display: "block",
            }}
          >
            <li key={starredBoard._id}>
              <BoardPreview board={starredBoard} />

              <div className="actions">
                {/* <button
                  className="close-btn"
                  onClick={(ev) => onRemoveBoard(ev, starredBoard._id)}
                >
                  x
                </button> */}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export function BoardSideBar({ board, bgColor }) {
  return (
    <section className="board-side-bar" style={{ backgroundColor: bgColor }}>
      <ul>
        <li>
          <p>{board.title}</p>
        </li>
      </ul>
    </section>
  );
}

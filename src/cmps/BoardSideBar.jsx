export function BoardSideBar({ board, bgColor }) {
  return (
    <section className="board-side-bar" style={{ backgroundColor: bgColor }}>
      <ul>
        <li>
          <p>Workspace</p>
        </li>
        <li>
          <p>{board.title}</p>
        </li>
      </ul>
    </section>
  );
}

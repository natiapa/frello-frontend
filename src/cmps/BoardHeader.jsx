export function BoardHeader({ bgColor }) {
  return (
    <div className="board-header" style={{ backgroundColor: bgColor }}>
      <div className="board-header-title">Trello</div>
      <div className="board-header-actions"></div>

      <div className="board-header-icon">🔍</div>
      <div className="board-header-icon">➕</div>
    </div>
  );
}

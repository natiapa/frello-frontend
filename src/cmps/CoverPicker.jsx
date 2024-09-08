import { boardService } from "../services/board";

export function CoverPicker({
  onUpdated,
  setIsPopoverOpen,
  handlePopoverClick,
}) {
  const coverColors = boardService.getColorsCover();
  function handleCoverSelection(ev) {
    ev.stopPropagation()
 
  }

  return (
    <div className="pop-over-grid">
      <div className="header-container">
        <span className="pop-over-header-title">Cover</span>
      </div>

      <div className="cover-colors-container">
        <ul className="cover-colors-list">
          {coverColors.map((coverColor, idx) => (
            <li key={coverColor.color} className="cover-color-item">
              <div
                className="cover-color"
                style={{
                  backgroundColor: coverColor.color,
                }}
                onClick={handleCoverSelection}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

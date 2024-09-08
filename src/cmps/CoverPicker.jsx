import { boardService } from "../services/board";

export function CoverPicker({
  onUpdated,
  setIsPopoverOpen,
  handlePopoverClick,
  setCurrCover,
  currCover
}) {
  const coverColors = boardService.getColorsCover();

  function handleCoverSelection(ev,color) {
    ev.stopPropagation()
    
    const updateColor = {...currCover, color: color }
    onUpdated('cover',updateColor)
    setCurrCover(updateColor)
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
                onClick={(event)=> handleCoverSelection(event,coverColor.color)}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

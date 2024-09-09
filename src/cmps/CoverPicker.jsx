import { SvgIcon } from "@mui/material";
import { boardService } from "../services/board";

export function CoverPicker({
  onUpdated,
  setIsPopoverOpen,
  handlePopoverClick,
  setCurrCover,
  currCover,
}) {
  const coverColors = boardService.getColorsCover();
  const coverImgs = boardService.getImgs();

  function handleCoverSelection(ev, color, img) {
    ev.stopPropagation();

    const updateColor = { ...currCover, color: color, img: img };
    onUpdated("cover", updateColor);
    setCurrCover(updateColor);
  }

  return (
    <div className="cover-picker-container">
      <button
          className="close-cover-btn"
          onClick={() => setIsPopoverOpen(false)}
        >
          <SvgIcon iconName="close" />
        </button>
      <div className="cover-picker-header">
        <span className="cover-picker-title">Cover</span>
      </div>

      {currCover.color || currCover.img ? (
        <button
          className="remove-cover-btn"
          onClick={(ev) => handleCoverSelection(ev, "", "")}
        >
          Remove cover
        </button>
      ) : null}

      <div className="cover-colors-section">
        <span className="section-title">Colors</span>
        <ul className="cover-colors-list">
          {coverColors.map((coverColor) => (
            <li key={coverColor.color} className="cover-color-item">
              <div
                className="cover-color"
                style={{ backgroundColor: coverColor.color }}
                onClick={(event) =>
                  handleCoverSelection(event, coverColor.color, "")
                }
              ></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="cover-images-section">
        <span className="section-title">Photos</span>
        <ul className="cover-images-list">
          {coverImgs.map((coverImg) => (
            <li key={coverImg.alt} className="cover-img-item">
              <div
                className="cover-img"
                onClick={(event) =>
                  handleCoverSelection(event, coverImg.color, coverImg.src)
                }
              >
                <img
                  src={coverImg.src}
                  alt={coverImg.alt}
                  className="cover-img-thumbnail"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// import { boardService } from "../services/board";

// export function CoverPicker({
//   onUpdated,
//   setIsPopoverOpen,
//   handlePopoverClick,
//   setCurrCover,
//   currCover,
// }) {
//   const coverColors = boardService.getColorsCover();
//   const coverImgs = boardService.getImgs();

//   function handleCoverSelection(ev, color) {
//     ev.stopPropagation();

//     const updateColor = { ...currCover, color: color };
//     onUpdated("cover", updateColor);
//     setCurrCover(updateColor);
//   }

//   return (
//     <div className="pop-over-grid">
//       <div className="header-container">
//         <span className="pop-over-header-title">Cover</span>
//       </div>
//       {currCover.color || currCover.img ? (
//         <button
//           className="remov-cover-btn"
//           onClick={(ev) => handleCoverSelection(ev, "")}
//         >
//           Remove cover
//         </button>
//       ) : null}

//       <div className="cover-colors-container">
//         <span className="cover-colors-list-title">colors</span>
//         <ul className="cover-colors-list">
//           {coverColors.map((coverColor) => (
//             <li key={coverColor.color} className="cover-color-item">
//               <div
//                 className="cover-color"
//                 style={{
//                   backgroundColor: coverColor.color,
//                 }}
//                 onClick={(event) =>
//                   handleCoverSelection(event, coverColor.color)
//                 }
//               ></div>
//             </li>
//           ))}
//         </ul>
//         <span className="cover-imgs-list-title">Photos</span>
//         <ul className="cover-imgs-list">
//           {coverImgs.map((coverImg) => (
//             <li key={coverImg.alt} className="cover-img-item">
//               <div
//                 className="cover-img"
//                 style={{ backgroundColor: coverImg.color }}
//               >
//                 <img
//                   src={coverImg.src}
//                   alt={coverImg.alt}
//                   className="cover-img-thumbnail"
//                 />
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

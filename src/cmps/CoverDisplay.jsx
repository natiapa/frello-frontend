export function CoverDisplay({ currCover, height }) {
  return (
    <div
      className="cover-container"
      style={{
        // gridRow: "1",
        width: "100%",
        height: height,
        backgroundColor: currCover.color,
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {currCover.img && (
        <img
          src={currCover.img}
          alt="cover"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
}

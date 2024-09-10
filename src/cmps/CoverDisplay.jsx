export function CoverDisplay({ currCover }) {
  console.log(currCover);
  return (
    <div
      className="cover-container"
      style={{
        width: "100%",
        height: "100px",
        backgroundColor: currCover.color,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000,
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

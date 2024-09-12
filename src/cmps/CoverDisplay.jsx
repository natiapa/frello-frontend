export function CoverDisplay({
  currCover,
  height,
  imgWidth,
  borderRadius,
  colorHeight,
}) {
  if (!currCover) {
    return null;
  }
  return (
    <div
      className="cover-container"
      style={{
        // gridRow: "1",
        width: "100%",
        height: !currCover.img ? colorHeight : height,
        backgroundColor: currCover.color,
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: borderRadius,
      }}
    >
      {currCover.img && (
        <img
          src={currCover.img}
          alt="cover"
          style={{
            maxWidth: "100%",
            width: imgWidth,
            // maxHeight: "100%",
            height: height,
            objectFit: "cover",
            borderRadius: borderRadius,
          }}
        />
      )}
    </div>
  );
}

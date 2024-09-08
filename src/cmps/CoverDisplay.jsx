export function CoverDisplay({ currCover }) {
    return (
        <div 
        style={{
          width: '100%', 
          height: '100px', 
          backgroundColor: currCover,
          position: 'absolute',
          top:0,
          left: 0,
          zIndex: 1000, 
        }}
      />
    );
  }
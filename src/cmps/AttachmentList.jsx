export function AttachmentList({files,onUpdated,task}){
    return (
        <div className="attachment-list">
          <h1>Attachments</h1>
          {files.map((file, index) => (
            <div key={index} className="attachment-item">
              {/* הצגת תמונה ממוזערת אם הקובץ הוא תמונה */}
              {file.type.startsWith('image/') ? (
                <img src={file.url} alt={file.name} className="attachment-thumbnail" />
              ) : (
                // הצגת אייקון אם זה PDF או סוג קובץ אחר
                <div className="attachment-icon">
                  {file.type === 'application/pdf' ? <AiFillFilePdf size={40} /> : <AiFillFileImage size={40} />}
                </div>
              )}
              <div className="attachment-info">
                <p className="attachment-name">{file.name}</p>
                {/* ניתן להוסיף פונקציה למחיקת הקובץ אם יש צורך */}
                <button className="remove-btn" onClick={() => onUpdated('remove', file)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    
}
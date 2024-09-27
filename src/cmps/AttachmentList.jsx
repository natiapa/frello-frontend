import { AiFillFilePdf, AiFillFileImage } from "react-icons/ai";

export function AttachmentList({ files = [], onUpdated, setNewFiles }) {
  console.log('files:', files);

  function handleDeleteFile(ev, deleteFile) {
    ev.preventDefault();
    ev.stopPropagation();

    const updatedFiles = files.filter((file) => file.id !== deleteFile.id);
    setNewFiles(updatedFiles);
    onUpdated("attachments", updatedFiles);
  }

  return (
    <div className="attachment-list">
      <h1>Attachments</h1>
      <h5>Files</h5>
      {files.length > 0 ? (
        files.map((file, index) => (
          <div key={index} className="attachment-item">
            {file.type && file.type.startsWith("image/") ? (
              <img
                src={file.url}
                alt={file.name}
                className="attachment-thumbnail"
              />
            ) : (
              <div className="attachment-icon">
                {file.type === "application/pdf" ? (
                  <AiFillFilePdf size={40} />
                ) : (
                  <AiFillFileImage size={40} />
                )}
              </div>
            )}
            <div className="attachment-info">
              <p className="attachment-name">{file.name}</p>
              <button
                className="remove-btn"
                onClick={(event) => handleDeleteFile(event, file)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No attachments available</p>
      )}
    </div>
  );
}

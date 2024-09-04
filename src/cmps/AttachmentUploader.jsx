
import { useDropzone } from "react-dropzone";
import { boardService } from "../services/board";
import { useState } from "react";


export function AttachmentUploader({
  onUpdated = () => {},
  setIsPopoverOpen,
  handlePopoverClick,
  task,
  setNewFiles,
  newFiles,
}) {
  const [addFile, setAddFile] = useState(boardService.getEmptyAttach()) 
  

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, application/pdf",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);


      const formattedFiles = acceptedFiles.map((file) => {
        const newFile = {
          ...addFile, 
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type,
        }
        return newFile;
      })

      const updatedFiles = [...newFiles, ...formattedFiles];
      console.log(updatedFiles)
      setNewFiles(updatedFiles)
      onUpdated("attachments", updatedFiles);
    },
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <h2>Attach</h2>
      <h3>Attach a file from your computer</h3>
      <p>You can also drag and drop files to upload them.</p>
      <button className="upload-btn">Choose a file</button>
    </div>
  );
}

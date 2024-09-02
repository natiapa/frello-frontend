import { useDropzone } from "react-dropzone";

export function AttachmentUploader({
  onUpdated,
  setIsPopoverOpen,
  handlePopoverClick,
}) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*,application/pdf',
        onDrop: acceptedFiles => {
          console.log(acceptedFiles);
        }
      });
    
      return (
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      );
    }


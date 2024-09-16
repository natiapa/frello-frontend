import { IoQrCodeOutline } from "react-icons/io5";
import SvgIcon from "./SvgIcon";
import { RiGroupLine } from "react-icons/ri";

export function ShareExportPrintBoard({
  board,
  setIsPopoverOpen,
  handlePopoverClick,
}) {
  function handlePrint() {
    window.print();
  }

  function getAsCSV() {
    if (!board || !board.groups) return "";

    let csvStr = `Group, Task, Due Date, Description`;
    board.groups.forEach((group) => {
      group.tasks.forEach((task) => {
        const dueDate = task.dueDate
          ? new Date(task.dueDate).toDateString()
          : "No due date";

        const description = task.description
          ? task.description
          : "no description";
        const csvLine = `\n${group.title}, ${task.title}, ${dueDate}, ${description},`;
        csvStr += csvLine;
      });
    });
    return csvStr;
  }

  function handleDownloadCSV() {
    const csvContent = getAsCSV();
    if (!csvContent) return;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = `${board.title || "board"}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleExportJSON() {
    if (!board) return;

    const jsonContent = JSON.stringify(board, null, 2);

    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = `${board.title || "board"}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
 console.log(' import.meta.env.VITE_APP_BASE_URL;:',  import.meta.env.VITE_SERVER)
  return (
    <div className="share-board-container" onClick={handlePopoverClick}>
      <header className="share-board-header">
        <span className="close-btn" onClick={() => setIsPopoverOpen(false)}>
          <SvgIcon iconName="close" />
        </span>
        <h3>Print, export, and share</h3>
      </header>
      <section className="link">
        <span className="link-title">Link to this board:</span>
        <input type="text" value=  {`${import.meta.env.VITE_DEV_SERVER}/board/${board._id}`} />
        <span className="text">
          <RiGroupLine />
          <span>All members of the Workspace can see and edit this board.</span>
        </span>
      </section>
      <section className="btns">
        <button onClick={handlePrint}>Print</button>
        <button onClick={handleDownloadCSV} download="exported-data.csv">
          Export as CSV
        </button>
        <button onClick={handleExportJSON}>Export as JSON</button>
      </section>
    </div>
  );
}

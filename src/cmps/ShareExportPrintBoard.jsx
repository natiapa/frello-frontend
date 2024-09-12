import { IoQrCodeOutline } from "react-icons/io5";
import SvgIcon from "./SvgIcon";

export function ShareExportPrintBoard({
  board,
  setIsPopoverOpen,
  handlePopoverClick,
}) {
  function handlePrint() {
    window.print();
  }

  function handleExportCSV(board) {
    // Assuming the board has groups and tasks
    if (!board || !board.groups) return;

    const headers = ["Group Name", "Task Name", "Task Description"];
    const rows = [];

    // Loop through groups and tasks to prepare CSV rows
    board.groups.forEach((group) => {
      group.tasks.forEach((task) => {
        rows.push([
          group.name,
          task.title,
          task.description || "No description",
        ]);
      });
    });

    // Convert the data into CSV format
    const csvContent =
      "\uFEFFdata:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    // Create a link to download the CSV file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${board.title || "board"}.csv`);
    document.body.appendChild(link);

    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  }

  function handleExportJSON() {
    if (!board) return;

    // Convert the board object to a JSON string
    const jsonContent = JSON.stringify(board, null, 2); // Pretty print with 2-space indentation

    // Create a Blob from the JSON string
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");

    // Create a URL for the Blob and set it as the href attribute of the link
    link.href = URL.createObjectURL(blob);
    link.download = `${board.title || "board"}.json`; // Set the default filename

    // Append the link to the body, trigger the download, and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="share-board-container" onClick={handlePopoverClick}>
      <header className="share-board-header">
        <span className="close-btn" onClick={() => setIsPopoverOpen(false)}>
          <SvgIcon iconName="close" />
        </span>
        <h3>Print, export, and share</h3>
      </header>
      <section className="link">
        <span>Link to this board:</span>
        <p>{`board/${board._id}`}</p>
        {/* <p>{`http://localhost:5173/board/${board._id}`}</p> */}
      </section>
      <section className="btns">
        <button onClick={handlePrint}>Print</button>
        <button onClick={handleExportCSV}>Export as CSV</button>
        <button onClick={handleExportJSON}>Export as JSON</button>
      </section>
    </div>
  );
}

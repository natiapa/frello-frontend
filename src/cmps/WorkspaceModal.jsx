import SvgIcon from "./SvgIcon";

export function WorkspaceModal({ setIsPopoverOpen, handlePopoverClick }) {
  return (
    <div className="workspace-container" onClick={handlePopoverClick}>
      {/* <header className="workspace-header">
        <span className="close-btn" onClick={() => setIsPopoverOpen(false)}>
          <SvgIcon iconName="close" />
        </span>
        <h3>Workspace</h3>
      </header> */}
      <h2>Your Workspaces</h2>
      <a>
        <div className="color">T</div>
        <span>Trello Workspace</span>
      </a>
    </div>
  );
}

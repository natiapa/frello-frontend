import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export function WorkspaceModal({ setIsPopoverOpen, handlePopoverClick }) {
  const navigate = useNavigate();

  function handleLinkClick() {
    navigate("/board");
    setIsPopoverOpen(false);
  }

  return (
    <div className="workspace-container" onClick={handlePopoverClick}>
      <h2>Your Workspaces</h2>
      <a onClick={handleLinkClick}>
        <div className="color">F</div>
        <span>Frello Workspace</span>
      </a>
    </div>
  );
}

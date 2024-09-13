import { useNavigate } from "react-router";
import SvgIcon from "./SvgIcon";

export function WorkspaceModal({ setIsPopoverOpen, handlePopoverClick }) {
  const navigate = useNavigate();
  return (
    <div className="workspace-container" onClick={handlePopoverClick}>
      <h2>Your Workspaces</h2>
      <a onClick={() => navigate("/board")}>
        <div className="color">F</div>
        <span>Frello Workspace</span>
      </a>
    </div>
  );
}

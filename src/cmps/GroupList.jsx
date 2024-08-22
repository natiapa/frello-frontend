import { useEffect } from "react";
import { GroupPreview } from "./GroupPreview";
import { boardService } from "../services/board";

export function GroupList({ groups }) {
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  if (!groups) return <div>Loading...</div>;
  useEffect(() => {
    
    boardService.updateBoard()
  }, [groups])


  return (
    <div className="group-list">
      {groups.map((group) => (
        <GroupPreview group={group} key={group.id} />
      ))}
      <div className="add-group-preview">
        <div className="add-group">Add Group +</div>
        {isAddingGroup && (
          <GroupPreview group={{}}/>
        )}
      </div>
    </div>
  )
}

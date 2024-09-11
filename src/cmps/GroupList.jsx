import { useEffect, useState } from "react";
import { GroupPreview } from "./GroupPreview";
import { boardService } from "../services/board";
import { useSelector } from "react-redux";
import { loadBoard, updateBoard } from "../store/actions/board.actions";
import { AddingForm } from "./AddingForm";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export function GroupList({ groups, allowDrop, drop, isActivitiesOpen }) {
  const board = useSelector((storeState) => storeState.boardModule.board);

  const [isNewGroup, setIsNewGroup] = useState(false);
  const [newGroup, setNewGroup] = useState(boardService.getEmptyGroup());
  const [currGroups, setCurrGroups] = useState(groups);
  // const [currTasks, setCurrTasks] = useState("");
  const currBoard = useSelector((state) => state.boardModule.board);

  useEffect(() => {
    if (board?.groups) setCurrGroups(groups);
  }, [board]);

  useEffect(() => {
  }, [currGroups?.length]);

  async function onAddGroup() {
    setIsNewGroup(true);
    setNewGroup(boardService.getEmptyGroup());
  }

  function handleOnDragEnd(result) {
    const { destination, source, type, draggableId } = result;
    if (!destination) return;

    if (type === "group") {
      const reorderedGroups = Array.from(currGroups);
      const [reorderedGroup] = reorderedGroups.splice(source.index, 1);
      reorderedGroups.splice(destination.index, 0, reorderedGroup);
      setCurrGroups(reorderedGroups);
      onUpdated("groups", reorderedGroups);
    } else if (type === "task") {
      const sourceGroup = groups.find(
        (group) => group.id === source.droppableId
      );
      const destinationGroup = groups.find(
        (group) => group.id === destination.droppableId
      );

      const draggedTaskIdx = sourceGroup.tasks.findIndex(
        (task) => task.id === draggableId
      );

      const [reorderedTask] = sourceGroup.tasks.splice(draggedTaskIdx, 1);
      onUpdated("group", sourceGroup, sourceGroup.id, null);

      destinationGroup.tasks.splice(destination.index, 0, reorderedTask);
      onUpdated("group", destinationGroup, destinationGroup.id, null);
    }
  }

  async function onUpdated(name, value, groupId, taskId) {
    try {
      const updatedBoard = boardService.updateBoard(board, groupId, taskId, {
        key: name,
        value: value,
      });

      await updateBoard(updatedBoard);
    } catch (error) {
      console.error("Failed to update the board:", error);
    }
  }

  if (!currGroups) return <div>Loading...</div>;
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {currGroups && (
        <Droppable droppableId="all-groups" direction="horizontal" type="group">
          {(provided) => (
            <ul
              className="group-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                gridTemplateColumns: `repeat(${currGroups.length + 1}, 284px)`,
              }}
            >
              {currGroups.map((group, gIndex) => (
                <GroupPreview
                  group={group}
                  key={group.id}
                  gIndex={gIndex}
                  allowDrop={allowDrop}
                  drop={drop}
                />
              ))}
              {isNewGroup && (
                <AddingForm
                  setIsNew={setIsNewGroup}
                  setNew={setNewGroup}
                  currBoard={currBoard}
                  updateBoard={updateBoard}
                  updated={newGroup}
                  groupId={null}
                  tasks={null}
                />
              )}
              <button
                className="add-group-btn"
                onClick={onAddGroup}
                hidden={isNewGroup}
                style={{ gridColumn: `${currGroups.length + 1}` }}
              >
                <span className="header-btn">+ Add another list</span>
              </button>
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
}

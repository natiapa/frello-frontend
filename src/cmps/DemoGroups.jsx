import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { updateBoard } from "../store/actions/board.actions";

export function DemoGroups() {
  const board = useSelector((storeState) => storeState.boardModule.board);
  const [groups, setGroups] = useState(board?.groups);

  useEffect(() => {
    if (board?.groups) setGroups(board.groups);
  }, [board]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const reorderedGroups = Array.from(groups);
    const [reorderedItem] = reorderedGroups.splice(result.source.index, 1);
    reorderedGroups.splice(result.destination.index, 0, reorderedItem);

    setGroups(reorderedGroups);
    onUpdated("groups", groups);
  }

  async function onUpdated(name, value) {
    console.log(value);
    try {
    const updatedBoard= await boardService.updateBoard(board, null, null, {
        key: name,
        value: value,
      });
      await updateBoard(updatedBoard);
    } catch (error) {
      console.error("Failed to update the board:", error);
    }
  }

  if (!groups) return;
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {groups && (
        <Droppable droppableId="all-groups" direction="horizontal" type="group">
          {(provided) => (
            <ul
              className="group-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                backgroundColor: "#af54",
                gridTemplateColumns: `repeat(${groups.length + 1}, 284px)`,
              }}
            >
              {groups.map((group, idx) => (
                <Draggable key={group.id} draggableId={group.id} index={idx}>
                  {(provided) => (
                    <li
                      className="group-preview"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="header-and-actions">
                        <h3 data-name="title">{group.title}</h3>
                      </div>

                      <Droppable droppableId={group.id} type="task">
                        {(provided) => (
                          <ul
                            className="task-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {group.tasks.map((task, idx) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={idx}
                              >
                                {(provided, snapshot) => (
                                  <li
                                    className="task-preview"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      opacity: snapshot.isDragging
                                        ? "0.5"
                                        : "1",
                                    }}
                                  >
                                    <div>
                                      <span>{task?.title}</span>
                                    </div>
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
}

import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const TaskList = ({ filteredTasks, filter, handleTaskChanged }) => {
  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }

  return (
    <div className="space-y-3">
      <SortableContext items={filteredTasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
        {filteredTasks.map((task, index) => (
          <TaskCard
            key={task._id ?? index}
            task={task}
            index={index}
            handleTaskChanged={handleTaskChanged}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default TaskList;
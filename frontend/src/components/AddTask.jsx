import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

const AddTask = ({ handleNewTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      await api.post("/tasks", { title });
      toast.success("Task added successfully!");
      setTitle("");
      if (handleNewTaskAdded) handleNewTaskAdded();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <Card className="rounded-2xl p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What do you need to do?"
          className="h-12  rounded-2xl shadow-sm text-base bg-slate-50 sm:flex-1 border border-indigo-200 focus:border-primary/50 focus:ring-primary/20"
        />

        <Button
          variant="gradient"
          size="3xl"
          className="px-6"
          onClick={handleAdd}
          disabled={!title.trim()}
        >
        <Plus className="size-6" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
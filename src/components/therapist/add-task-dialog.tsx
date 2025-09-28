import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { TaskItem } from "@/types/tasks";

interface AddTaskDialogProps {
  onAddTask: (task: Omit<TaskItem, 'id'>) => void;
  'data-onboarding'?: string;
}

export function AddTaskDialog({ onAddTask, 'data-onboarding': dataOnboarding }: AddTaskDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    priority: "medium" as TaskItem['priority'],
    flow: "session" as TaskItem['flow'],
    due: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask: Omit<TaskItem, 'id'> = {
      title: formData.title,
      role: 'therapist',
      flow: formData.flow,
      priority: formData.priority,
      status: 'todo',
      due: formData.due ? new Date(formData.due) : null,
      cta: {
        label: "View Task",
        href: "/t/schedule?tab=tasks"
      },
      meta: {
        badges: [formData.flow.charAt(0).toUpperCase() + formData.flow.slice(1)]
      }
    };

    onAddTask(newTask);
    setOpen(false);
    
    // Reset form
    setFormData({
      title: "",
      priority: "medium",
      flow: "session",
      due: "",
      notes: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs" data-onboarding={dataOnboarding}>
          <PlusCircle className="w-3 h-3 mr-1" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value: TaskItem['priority']) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="flow">Category</Label>
              <Select value={formData.flow} onValueChange={(value: TaskItem['flow']) => setFormData(prev => ({ ...prev, flow: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="session">Session</SelectItem>
                  <SelectItem value="booking">Booking</SelectItem>
                  <SelectItem value="verification">Verification</SelectItem>
                  <SelectItem value="payouts">Payouts</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="due">Due Date</Label>
            <Input
              id="due"
              type="datetime-local"
              value={formData.due}
              onChange={(e) => setFormData(prev => ({ ...prev, due: e.target.value }))}
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
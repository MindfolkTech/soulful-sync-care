import * as React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskFilters as TaskFiltersType, TaskItem } from "@/types/tasks";
import { Search, X } from "lucide-react";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
  role: 'client' | 'therapist' | 'admin';
}

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'done', label: 'Done' }
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
];

const flowOptions = {
  client: [
    { value: 'assessment', label: 'Assessment' },
    { value: 'discovery', label: 'Discovery' },
    { value: 'booking', label: 'Booking' },
    { value: 'session', label: 'Session' }
  ],
  therapist: [
    { value: 'verification', label: 'Verification' },
    { value: 'booking', label: 'Booking' },
    { value: 'session', label: 'Session' },
    { value: 'payouts', label: 'Payouts' }
  ],
  admin: [
    { value: 'verification', label: 'Verification' },
    { value: 'moderation', label: 'Moderation' },
    { value: 'support', label: 'Support' },
    { value: 'payouts', label: 'Financials' }
  ]
};

export function TaskFilters({ filters, onFiltersChange, role }: TaskFiltersProps) {
  const clearFilters = () => {
    onFiltersChange({
      status: [],
      priority: [],
      flow: [],
      search: ''
    });
  };

  const hasActiveFilters = 
    filters.status.length > 0 || 
    filters.priority.length > 0 || 
    filters.flow.length > 0 || 
    filters.search.length > 0;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-garden-green" />
        <Input
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Select
          value=""
          onValueChange={(value) => {
            if (!filters.status.includes(value as TaskItem['status'])) {
              onFiltersChange({
                ...filters,
                status: [...filters.status, value as TaskItem['status']]
              });
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value=""
          onValueChange={(value) => {
            if (!filters.priority.includes(value as TaskItem['priority'])) {
              onFiltersChange({
                ...filters,
                priority: [...filters.priority, value as TaskItem['priority']]
              });
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            {priorityOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value=""
          onValueChange={(value) => {
            if (!filters.flow.includes(value as TaskItem['flow'])) {
              onFiltersChange({
                ...filters,
                flow: [...filters.flow, value as TaskItem['flow']]
              });
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Flow" />
          </SelectTrigger>
          <SelectContent>
            {flowOptions[role].map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {hasActiveFilters && (
          <Button variant="tertiary" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1 text-garden-green" />
            Clear
          </Button>
        )}
      </div>

      {(filters.status.length > 0 || filters.priority.length > 0 || filters.flow.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {filters.status.map(status => (
            <Badge key={status} variant="secondary" className="flex items-center gap-1">
              {statusOptions.find(s => s.value === status)?.label}
              <X 
                className="h-4 w-4 cursor-pointer text-garden-green p-1"
                onClick={() => onFiltersChange({
                  ...filters,
                  status: filters.status.filter(s => s !== status)
                })}
              />
            </Badge>
          ))}
          {filters.priority.map(priority => (
            <Badge key={priority} variant="secondary" className="flex items-center gap-1">
              {priorityOptions.find(p => p.value === priority)?.label}
              <X 
                className="h-4 w-4 cursor-pointer text-garden-green p-1"
                onClick={() => onFiltersChange({
                  ...filters,
                  priority: filters.priority.filter(p => p !== priority)
                })}
              />
            </Badge>
          ))}
          {filters.flow.map(flow => (
            <Badge key={flow} variant="secondary" className="flex items-center gap-1">
              {flowOptions[role].find(f => f.value === flow)?.label}
              <X 
                className="h-4 w-4 cursor-pointer text-garden-green p-1"
                onClick={() => onFiltersChange({
                  ...filters,
                  flow: filters.flow.filter(f => f !== flow)
                })}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
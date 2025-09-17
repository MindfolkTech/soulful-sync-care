import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Calendar, Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterOptions {
  dateRange: 'today' | 'week' | 'month' | 'custom';
  appointmentType: string[];
  status: string[];
  client: string;
}

interface FilterDropdownProps {
  onFilterChange: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
  availableClients: string[];
  availableTypes: string[];
}

export function FilterDropdown({
  onFilterChange,
  currentFilters,
  availableClients,
  availableTypes
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      dateRange: 'week',
      appointmentType: [],
      status: [],
      client: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.dateRange !== 'week' ||
      filters.appointmentType.length > 0 ||
      filters.status.length > 0 ||
      filters.client !== ''
    );
  };

  const getFilterCount = () => {
    let count = 0;
    if (filters.dateRange !== 'week') count++;
    if (filters.appointmentType.length > 0) count++;
    if (filters.status.length > 0) count++;
    if (filters.client !== '') count++;
    return count;
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="min-h-[--touch-target-min] font-secondary relative"
          aria-label="Filter appointments"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
          {hasActiveFilters() && (
            <Badge className="ml-2 bg-[hsl(var(--garden-green))] text-[hsl(var(--on-dark))] text-xs">
              {getFilterCount()}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-[--space-md]">
        <div className="space-y-[--space-md]">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-primary text-[hsl(var(--jovial-jade))] text-lg">Filter Appointments</h3>
            {hasActiveFilters() && (
              <Button
                variant="ghost"
                size="sm"
                className="min-h-[--touch-target-min] font-secondary text-xs"
                onClick={clearFilters}
              >
                <X className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {/* Date Range */}
          <div>
            <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))] text-sm mb-[--space-sm]">
              Date Range
            </h4>
            <div className="grid grid-cols-2 gap-[--space-xs]">
              {[
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' },
                { value: 'custom', label: 'Custom' }
              ].map(option => (
                <Button
                  key={option.value}
                  variant={filters.dateRange === option.value ? 'primary' : 'outline'}
                  size="sm"
                  className="min-h-[--touch-target-min] font-secondary text-xs"
                  onClick={() => handleFilterChange('dateRange', option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Appointment Type */}
          <div>
            <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))] text-sm mb-[--space-sm]">
              Appointment Type
            </h4>
            <div className="space-y-[--space-xs]">
              {availableTypes.map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`type-${type}`}
                    checked={filters.appointmentType.includes(type)}
                    onChange={() => handleFilterChange('appointmentType', toggleArrayItem(filters.appointmentType, type))}
                    className="min-h-[--touch-target-min]"
                  />
                  <Label htmlFor={`type-${type}`} className="font-secondary text-[hsl(var(--text-primary))] text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))] text-sm mb-[--space-sm]">
              Status
            </h4>
            <div className="space-y-[--space-xs]">
              {['confirmed', 'pending', 'cancelled'].map(status => (
                <div key={status} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`status-${status}`}
                    checked={filters.status.includes(status)}
                    onChange={() => handleFilterChange('status', toggleArrayItem(filters.status, status))}
                    className="min-h-[--touch-target-min]"
                  />
                  <Label htmlFor={`status-${status}`} className="font-secondary text-[hsl(var(--text-primary))] text-sm capitalize">
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Client Search */}
          <div>
            <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))] text-sm mb-[--space-sm]">
              Client
            </h4>
            <input
              type="text"
              value={filters.client}
              onChange={(e) => handleFilterChange('client', e.target.value)}
              placeholder="Search by client name..."
              className="w-full min-h-[--touch-target-min] font-secondary text-sm px-[--space-sm] py-[--space-xs] border border-[hsl(var(--border))] rounded-[--radius-md]"
            />
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters() && (
            <div>
              <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))] text-sm mb-[--space-sm]">
                Active Filters
              </h4>
              <div className="flex flex-wrap gap-[--space-xs]">
                {filters.dateRange !== 'week' && (
                  <Badge className="bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-primary))] text-xs">
                    {filters.dateRange}
                  </Badge>
                )}
                {filters.appointmentType.map(type => (
                  <Badge key={type} className="bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-primary))] text-xs">
                    {type}
                  </Badge>
                ))}
                {filters.status.map(status => (
                  <Badge key={status} className="bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-primary))] text-xs">
                    {status}
                  </Badge>
                ))}
                {filters.client && (
                  <Badge className="bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-primary))] text-xs">
                    {filters.client}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

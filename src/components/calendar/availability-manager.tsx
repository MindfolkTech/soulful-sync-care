import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Plus, Trash2, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkingHours {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface BlockedTime {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  recurring: boolean;
}

interface AvailabilityManagerProps {
  workingHours: WorkingHours[];
  blockedTimes: BlockedTime[];
  onUpdateWorkingHours: (hours: WorkingHours[]) => void;
  onAddBlockedTime: (blockedTime: Omit<BlockedTime, 'id'>) => void;
  onRemoveBlockedTime: (id: string) => void;
  onSave: () => void;
}

export function AvailabilityManager({
  workingHours,
  blockedTimes,
  onUpdateWorkingHours,
  onAddBlockedTime,
  onRemoveBlockedTime,
  onSave
}: AvailabilityManagerProps) {
  const [isAddingBlockedTime, setIsAddingBlockedTime] = useState(false);
  const [newBlockedTime, setNewBlockedTime] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    recurring: false
  });

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const updateWorkingHour = (day: string, field: keyof WorkingHours, value: any) => {
    const updatedHours = workingHours.map(hour => 
      hour.day === day ? { ...hour, [field]: value } : hour
    );
    onUpdateWorkingHours(updatedHours);
  };

  const handleAddBlockedTime = () => {
    if (newBlockedTime.title && newBlockedTime.startDate && newBlockedTime.startTime) {
      onAddBlockedTime({
        ...newBlockedTime,
        endDate: newBlockedTime.endDate || newBlockedTime.startDate,
        endTime: newBlockedTime.endTime || newBlockedTime.startTime
      });
      setNewBlockedTime({
        title: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        recurring: false
      });
      setIsAddingBlockedTime(false);
    }
  };

  const formatTimeDisplay = (time: string): string => {
    if (!time) return '';
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <Card>
      <CardHeader className="p-[--space-sm] md:p-[--space-md] pb-[--space-xs]">
        <CardTitle className="font-primary text-[--jovial-jade] text-sm md:text-base">
          Availability Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-[--space-sm] md:p-[--space-md] pt-0">
        <div className="space-y-[--space-md]">
          {/* Working Hours */}
          <div>
            <h4 className="font-secondary font-bold text-foreground text-sm mb-[--space-sm]">
              Working Hours
            </h4>
            <div className="space-y-[--space-sm]">
              {daysOfWeek.map(day => {
                const dayHours = workingHours.find(h => h.day === day) || {
                  day,
                  enabled: false,
                  startTime: '09:00',
                  endTime: '17:00'
                };
                
                return (
                  <div key={day} className="flex items-center justify-between p-[--space-sm] border rounded-lg min-h-[--touch-target-min]">
                    <div className="flex items-center gap-[--space-sm]">
                      <Switch
                        checked={dayHours.enabled}
                        onCheckedChange={(checked) => updateWorkingHour(day, 'enabled', checked)}
                        className="min-h-[--touch-target-min]"
                      />
                      <Label className="font-secondary text-[--text-primary] text-sm">
                        {day}
                      </Label>
                    </div>
                    
                    {dayHours.enabled && (
                      <div className="flex items-center gap-[--space-xs]">
                        <div className="flex items-center gap-[--space-xs]">
                          <Clock className="w-4 h-4 text-[--text-secondary]" />
                          <Input
                            type="time"
                            value={dayHours.startTime}
                            onChange={(e) => updateWorkingHour(day, 'startTime', e.target.value)}
                            className="w-24 min-h-[--touch-target-min] font-secondary text-xs"
                          />
                          <span className="font-secondary text-[--text-secondary] text-xs">to</span>
                          <Input
                            type="time"
                            value={dayHours.endTime}
                            onChange={(e) => updateWorkingHour(day, 'endTime', e.target.value)}
                            className="w-24 min-h-[--touch-target-min] font-secondary text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Blocked Time */}
          <div>
            <div className="flex items-center justify-between mb-[--space-sm]">
              <h4 className="font-secondary font-bold text-foreground text-sm">
                Blocked Time
              </h4>
              <Button
                variant="outline"
                size="sm"
                className="min-h-[--touch-target-min] font-secondary text-xs"
                onClick={() => setIsAddingBlockedTime(true)}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Block
              </Button>
            </div>

            {/* Add New Blocked Time Form */}
            {isAddingBlockedTime && (
              <div className="p-[--space-sm] border border-[--garden-green] rounded-lg bg-[--surface-accent] mb-[--space-sm]">
                <div className="space-y-[--space-sm]">
                  <div>
                    <Label className="font-secondary text-[--text-primary] text-xs">
                      Title
                    </Label>
                    <Input
                      value={newBlockedTime.title}
                      onChange={(e) => setNewBlockedTime({ ...newBlockedTime, title: e.target.value })}
                      placeholder="e.g., Personal appointment, Lunch break"
                      className="min-h-[--touch-target-min] font-secondary text-xs"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-[--space-sm]">
                    <div>
                      <Label className="font-secondary text-[--text-primary] text-xs">
                        Start Date
                      </Label>
                      <Input
                        type="date"
                        value={newBlockedTime.startDate}
                        onChange={(e) => setNewBlockedTime({ ...newBlockedTime, startDate: e.target.value })}
                        className="min-h-[--touch-target-min] font-secondary text-xs"
                      />
                    </div>
                    <div>
                      <Label className="font-secondary text-[--text-primary] text-xs">
                        End Date
                      </Label>
                      <Input
                        type="date"
                        value={newBlockedTime.endDate}
                        onChange={(e) => setNewBlockedTime({ ...newBlockedTime, endDate: e.target.value })}
                        className="min-h-[--touch-target-min] font-secondary text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-[--space-sm]">
                    <div>
                      <Label className="font-secondary text-[--text-primary] text-xs">
                        Start Time
                      </Label>
                      <Input
                        type="time"
                        value={newBlockedTime.startTime}
                        onChange={(e) => setNewBlockedTime({ ...newBlockedTime, startTime: e.target.value })}
                        className="min-h-[--touch-target-min] font-secondary text-xs"
                      />
                    </div>
                    <div>
                      <Label className="font-secondary text-[--text-primary] text-xs">
                        End Time
                      </Label>
                      <Input
                        type="time"
                        value={newBlockedTime.endTime}
                        onChange={(e) => setNewBlockedTime({ ...newBlockedTime, endTime: e.target.value })}
                        className="min-h-[--touch-target-min] font-secondary text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-[--space-sm]">
                    <Switch
                      checked={newBlockedTime.recurring}
                      onCheckedChange={(checked) => setNewBlockedTime({ ...newBlockedTime, recurring: checked })}
                      className="min-h-[--touch-target-min]"
                    />
                    <Label className="font-secondary text-[--text-primary] text-xs">
                      Recurring weekly
                    </Label>
                  </div>

                  <div className="flex items-center gap-[--space-sm]">
                    <Button
                      variant="primary"
                      size="sm"
                      className="min-h-[--touch-target-min] font-secondary text-xs"
                      onClick={handleAddBlockedTime}
                    >
                      <Save className="w-3 h-3 mr-1" />
                      Add Block
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-h-[--touch-target-min] font-secondary text-xs"
                      onClick={() => setIsAddingBlockedTime(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Blocked Time List */}
            <div className="space-y-[--space-xs]">
              {blockedTimes.map(blockedTime => (
                <div key={blockedTime.id} className="flex items-center justify-between p-[--space-sm] border rounded-lg min-h-[--touch-target-min]">
                  <div className="flex items-center gap-[--space-sm]">
                    <Clock className="w-4 h-4 text-[--text-secondary]" />
                    <div>
                      <h4 className="font-secondary font-bold text-foreground text-sm">
                        {blockedTime.title}
                      </h4>
                      <p className="font-secondary text-[--text-secondary] text-xs">
                        {new Date(blockedTime.startDate).toLocaleDateString()} • 
                        {formatTimeDisplay(blockedTime.startTime)} - {formatTimeDisplay(blockedTime.endTime)}
                        {blockedTime.recurring && ' (Weekly)'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[--space-xs]">
                    {blockedTime.recurring && (
                      <Badge className="bg-[--tag-language-bg] text-[--tag-language-text] text-xs">
                        Recurring
                      </Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-h-[--touch-target-min] font-secondary text-xs"
                      onClick={() => onRemoveBlockedTime(blockedTime.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {blockedTimes.length === 0 && (
                <div className="text-center p-[--space-md] text-[--text-muted]">
                  <Clock className="w-8 h-8 mx-auto mb-[--space-xs] opacity-50" />
                  <p className="font-secondary text-xs">
                    No blocked time scheduled
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              variant="primary"
              className="min-h-[--touch-target-comfort] font-secondary"
              onClick={onSave}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Availability
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

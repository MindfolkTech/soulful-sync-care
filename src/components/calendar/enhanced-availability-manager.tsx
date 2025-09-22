import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, Plus, Trash2, Save, Calendar as CalendarIcon } from "lucide-react";
import { useTherapistAvailability, useTherapistAppointments } from "@/hooks/use-therapist-data";

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

const weekDays = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export function EnhancedAvailabilityManager() {
  const { availability, blockedTimes, loading, error, saveAvailabilitySlot, addBlockedTime } = useTherapistAvailability();
  const { appointments } = useTherapistAppointments();

  // Working hours state - initialize from availability or defaults
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    { day: 'Monday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Tuesday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Wednesday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Thursday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Friday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Saturday', enabled: false, startTime: '10:00', endTime: '14:00' },
    { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '14:00' }
  ]);

  // Quick settings state
  const [quickSettings, setQuickSettings] = useState({
    autoAccept: true,
    bufferTime: true,
    weekendAvailability: false
  });

  // Add blocked time state
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [newBlock, setNewBlock] = useState({
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    allDay: false,
    recurring: false,
    notes: ''
  });

  const updateWorkingHour = (day: string, field: keyof WorkingHours, value: any) => {
    const updatedHours = workingHours.map(hour => 
      hour.day === day ? { ...hour, [field]: value } : hour
    );
    setWorkingHours(updatedHours);
  };

  const handleAddBlockedTime = async () => {
    if (newBlock.title && newBlock.startDate) {
      const blockedTimeData = {
        title: newBlock.title,
        start_date: newBlock.startDate,
        end_date: newBlock.endDate || newBlock.startDate,
        start_time: newBlock.allDay ? null : newBlock.startTime,
        end_time: newBlock.allDay ? null : newBlock.endTime,
        all_day: newBlock.allDay,
        recurring: newBlock.recurring,
        notes: newBlock.notes
      };
      
      await addBlockedTime(blockedTimeData);
      
      // Reset form
      setNewBlock({
        title: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '17:00',
        allDay: false,
        recurring: false,
        notes: ''
      });
      setIsAddingBlock(false);
    }
  };

  const handleSaveAvailability = () => {
    // Save working hours and quick settings
    console.log('Saving availability:', { workingHours, quickSettings });
    // TODO: Implement actual save functionality
  };

  const handleTemplateApply = (template: 'standard' | 'busy' | 'light') => {
    let newHours: WorkingHours[];
    
    switch (template) {
      case 'standard':
        newHours = [
          { day: 'Monday', enabled: true, startTime: '09:00', endTime: '17:00' },
          { day: 'Tuesday', enabled: true, startTime: '09:00', endTime: '17:00' },
          { day: 'Wednesday', enabled: true, startTime: '09:00', endTime: '17:00' },
          { day: 'Thursday', enabled: true, startTime: '09:00', endTime: '17:00' },
          { day: 'Friday', enabled: true, startTime: '09:00', endTime: '17:00' },
          { day: 'Saturday', enabled: false, startTime: '10:00', endTime: '14:00' },
          { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '14:00' }
        ];
        break;
      case 'busy':
        newHours = [
          { day: 'Monday', enabled: true, startTime: '08:00', endTime: '18:00' },
          { day: 'Tuesday', enabled: true, startTime: '08:00', endTime: '18:00' },
          { day: 'Wednesday', enabled: true, startTime: '08:00', endTime: '18:00' },
          { day: 'Thursday', enabled: true, startTime: '08:00', endTime: '18:00' },
          { day: 'Friday', enabled: true, startTime: '08:00', endTime: '18:00' },
          { day: 'Saturday', enabled: true, startTime: '09:00', endTime: '15:00' },
          { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '14:00' }
        ];
        break;
      case 'light':
        newHours = [
          { day: 'Monday', enabled: true, startTime: '10:00', endTime: '15:00' },
          { day: 'Tuesday', enabled: true, startTime: '10:00', endTime: '15:00' },
          { day: 'Wednesday', enabled: false, startTime: '09:00', endTime: '17:00' },
          { day: 'Thursday', enabled: true, startTime: '10:00', endTime: '15:00' },
          { day: 'Friday', enabled: true, startTime: '10:00', endTime: '15:00' },
          { day: 'Saturday', enabled: false, startTime: '10:00', endTime: '14:00' },
          { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '14:00' }
        ];
        break;
    }
    
    setWorkingHours(newHours);
  };

  // Calculate statistics
  const stats = {
    thisWeek: workingHours.filter(h => h.enabled).length * 8,
    booked: appointments.filter(a => a.status === 'confirmed').length,
    blocked: blockedTimes.length,
    utilization: workingHours.filter(h => h.enabled).length > 0 
      ? Math.round((appointments.filter(a => a.status === 'confirmed').length / (workingHours.filter(h => h.enabled).length * 5)) * 100)
      : 0
  };

  if (loading) {
    return <div className="p-6 text-center">Loading availability...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-[hsl(var(--destructive-text))]">Error loading availability: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">This Week</p>
              <p className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">{stats.thisWeek}</p>
              <p className="font-secondary text-[hsl(var(--text-muted))] text-xs">Available hours</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Booked</p>
              <p className="font-primary text-2xl font-bold text-[hsl(var(--primary))]">{stats.booked}</p>
              <p className="font-secondary text-[hsl(var(--text-muted))] text-xs">Sessions scheduled</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Blocked</p>
              <p className="font-primary text-2xl font-bold text-[hsl(var(--success-text))]">{stats.blocked}</p>
              <p className="font-secondary text-[hsl(var(--text-muted))] text-xs">Time blocks</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Utilization</p>
              <p className="font-primary text-2xl font-bold text-[hsl(var(--warning-text))]">{stats.utilization}%</p>
              <p className="font-secondary text-[hsl(var(--text-muted))] text-xs">Of available hours</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Weekly Schedule Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Visual Weekly Schedule */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-primary">Weekly Schedule</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[hsl(var(--success-bg))] rounded-full"></div>
                  <span className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[hsl(var(--primary))] rounded-full"></div>
                  <span className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Booked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[hsl(var(--surface-accent))] rounded-full"></div>
                  <span className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Unavailable</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-1 text-xs">
                {/* Header */}
                <div className="font-secondary text-[hsl(var(--text-secondary))] p-2"></div>
                {weekDays.map((day) => (
                  <div key={day} className="font-secondary text-[hsl(var(--text-secondary))] p-2 text-center">
                    {day.slice(0, 3)}
                  </div>
                ))}

                {/* Time slots */}
                {timeSlots.map((time) => (
                  <div key={time} className="contents">
                    <div className="font-secondary text-[hsl(var(--text-secondary))] p-2 text-right">
                      {time}
                    </div>
                    {weekDays.map((day, dayIndex) => {
                      const dayHours = workingHours.find(h => h.day === day);
                      const hasAvailability = dayHours?.enabled && 
                        dayHours.startTime <= time && 
                        dayHours.endTime > time;
                      
                      const hasAppointment = appointments.some(apt => {
                        const aptDate = new Date(apt.session_date);
                        const aptDay = aptDate.getDay();
                        return aptDay === dayIndex && apt.session_time === time;
                      });
                      
                      return (
                        <div
                          key={`${day}-${time}`}
                          className={`h-8 border rounded cursor-pointer transition-colors ${
                            hasAppointment
                              ? "bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/80"
                              : hasAvailability
                              ? "bg-[hsl(var(--success-bg))]/20 hover:bg-[hsl(var(--success-bg))]/30 border-[hsl(var(--success-bg))]/40"
                              : "bg-[hsl(var(--surface-accent))] hover:bg-[hsl(var(--surface-accent))]/80"
                          }`}
                          title={`${day} ${time} - ${
                            hasAppointment ? "Booked" : hasAvailability ? "Available" : "Unavailable"
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Working Hours Management */}
          <Card>
            <CardHeader>
              <CardTitle className="font-primary">Working Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weekDays.map(day => {
                  const dayHours = workingHours.find(h => h.day === day) || {
                    day,
                    enabled: false,
                    startTime: '09:00',
                    endTime: '17:00'
                  };
                  
                  return (
                    <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={dayHours.enabled}
                          onCheckedChange={(checked) => updateWorkingHour(day, 'enabled', checked)}
                        />
                        <Label className="font-secondary text-[hsl(var(--text-primary))] text-sm min-w-[80px]">
                          {day}
                        </Label>
                      </div>
                      
                      {dayHours.enabled && (
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-[hsl(var(--text-secondary))]" />
                          <Input
                            type="time"
                            value={dayHours.startTime}
                            onChange={(e) => updateWorkingHour(day, 'startTime', e.target.value)}
                            className="w-24"
                          />
                          <span className="font-secondary text-[hsl(var(--text-secondary))] text-sm">to</span>
                          <Input
                            type="time"
                            value={dayHours.endTime}
                            onChange={(e) => updateWorkingHour(day, 'endTime', e.target.value)}
                            className="w-24"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* Quick Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="font-primary text-lg">Quick Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-secondary font-semibold text-[hsl(var(--text-primary))] text-sm">
                    Auto-accept bookings
                  </p>
                  <p className="font-secondary text-[hsl(var(--text-muted))] text-xs">
                    Automatically approve new sessions
                  </p>
                </div>
                <Switch 
                  checked={quickSettings.autoAccept}
                  onCheckedChange={(checked) => setQuickSettings({...quickSettings, autoAccept: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-secondary font-semibold text-[hsl(var(--text-primary))] text-sm">
                    Buffer between sessions
                  </p>
                  <p className="font-secondary text-[hsl(var(--text-muted))] text-xs">
                    15-minute break automatically
                  </p>
                </div>
                <Switch 
                  checked={quickSettings.bufferTime}
                  onCheckedChange={(checked) => setQuickSettings({...quickSettings, bufferTime: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-secondary font-semibold text-[hsl(var(--text-primary))] text-sm">
                    Weekend availability
                  </p>
                  <p className="font-secondary text-[hsl(var(--text-muted))] text-xs">
                    Accept weekend bookings
                  </p>
                </div>
                <Switch 
                  checked={quickSettings.weekendAvailability}
                  onCheckedChange={(checked) => setQuickSettings({...quickSettings, weekendAvailability: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="font-primary text-lg">Schedule Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleTemplateApply('standard')}
              >
                <Clock className="w-4 h-4 mr-2" />
                Standard Week
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleTemplateApply('busy')}
              >
                <Clock className="w-4 h-4 mr-2" />
                Busy Week
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleTemplateApply('light')}
              >
                <Clock className="w-4 h-4 mr-2" />
                Light Week
              </Button>
            </CardContent>
          </Card>

          {/* Blocked Time Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-primary text-lg">Blocked Time</CardTitle>
              <Dialog open={isAddingBlock} onOpenChange={setIsAddingBlock}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Block
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Block Time</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newBlock.title}
                        onChange={(e) => setNewBlock({...newBlock, title: e.target.value})}
                        placeholder="e.g., Holiday, Personal Time"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input
                          id="start_date"
                          type="date"
                          value={newBlock.startDate}
                          onChange={(e) => setNewBlock({...newBlock, startDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="end_date">End Date</Label>
                        <Input
                          id="end_date"
                          type="date"
                          value={newBlock.endDate}
                          onChange={(e) => setNewBlock({...newBlock, endDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="all_day"
                        checked={newBlock.allDay}
                        onCheckedChange={(checked) => setNewBlock({...newBlock, allDay: checked})}
                      />
                      <Label htmlFor="all_day">All Day</Label>
                    </div>
                    {!newBlock.allDay && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start_time">Start Time</Label>
                          <Input
                            id="start_time"
                            type="time"
                            value={newBlock.startTime}
                            onChange={(e) => setNewBlock({...newBlock, startTime: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="end_time">End Time</Label>
                          <Input
                            id="end_time"
                            type="time"
                            value={newBlock.endTime}
                            onChange={(e) => setNewBlock({...newBlock, endTime: e.target.value})}
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="recurring"
                        checked={newBlock.recurring}
                        onCheckedChange={(checked) => setNewBlock({...newBlock, recurring: checked})}
                      />
                      <Label htmlFor="recurring">Recurring weekly</Label>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddingBlock(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddBlockedTime}>
                        Add Block
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-3">
              {blockedTimes.slice(0, 3).map(blockedTime => (
                <div key={blockedTime.id} className="flex items-center justify-between p-3 bg-[hsl(var(--surface-accent))] rounded-lg">
                  <div>
                    <p className="font-secondary font-semibold text-[hsl(var(--text-primary))] text-sm">
                      {blockedTime.title}
                    </p>
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">
                      {new Date(blockedTime.start_date).toLocaleDateString()}
                      {!blockedTime.all_day && ` • ${blockedTime.start_time} - ${blockedTime.end_time}`}
                    </p>
                  </div>
                  {blockedTime.recurring && (
                    <Badge variant="secondary" className="text-xs">
                      Weekly
                    </Badge>
                  )}
                </div>
              ))}
              {blockedTimes.length === 0 && (
                <div className="text-center p-4 text-[hsl(var(--text-muted))]">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="font-secondary text-sm">
                    No blocked time scheduled
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveAvailability}
          className="min-w-[140px]"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Availability
        </Button>
      </div>
    </div>
  );
}
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCoachHint } from "@/hooks/use-coach-hint";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Trash2 } from "lucide-react";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { useTherapistAvailability, useTherapistAppointments } from "@/hooks/use-therapist-data";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const weekDays = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export default function TherapistAvailability() {
  const { open, setOpen, dismiss } = useCoachHint({ stepId: "availability" });
  const { availability, blockedTimes, loading, error, saveAvailabilitySlot, addBlockedTime } = useTherapistAvailability();
  const { appointments } = useTherapistAppointments();
  
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day_of_week: 1,
    start_time: '09:00',
    end_time: '17:00',
    is_available: true,
    recurring: true
  });

  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [newBlock, setNewBlock] = useState({
    title: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    start_time: '09:00',
    end_time: '17:00',
    all_day: false,
    recurring: false,
    notes: ''
  });

  useScrollToHash();
  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Availability</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Set your working hours and availability</p>
            </div>
            <div className="space-y-8">
            <div className="flex items-center justify-between" id="focus-availability">
              <div>
                <h1 className="font-primary text-3xl font-bold text-[hsl(var(--text-primary))]">
                  Availability
                </h1>
                <p className="font-secondary text-[hsl(var(--text-secondary))] mt-2">
                  Set your regular schedule and manage appointments
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Sync Calendar
                </Button>
                <TooltipProvider>
                  <Tooltip open={open} onOpenChange={setOpen}>
                    <TooltipTrigger asChild>
                      <Button onClick={dismiss}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Time Block
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-secondary text-sm">Add at least one block to enable bookings.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">This Week</p>
                    <p className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">{availability.length * 8}</p>
                    <p className="font-secondary text-text-muted text-xs">Available hours</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Booked</p>
                    <p className="font-primary text-2xl font-bold text-primary">{appointments.filter(a => a.status === 'confirmed').length}</p>
                    <p className="font-secondary text-text-muted text-xs">Sessions scheduled</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Blocked</p>
                    <p className="font-primary text-2xl font-bold text-[hsl(var(--success-text))]">{blockedTimes.length}</p>
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">Time blocks</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Utilization</p>
                    <p className="font-primary text-2xl font-bold text-[hsl(var(--warning-text))]">
                      {availability.length > 0 ? Math.round((appointments.filter(a => a.status === 'confirmed').length / (availability.length * 5)) * 100) : 0}%
                    </p>
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">Of available hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Weekly Schedule */}
              <div className="lg:col-span-3">
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
                    <div className="grid grid-cols-8 gap-2">
                      {/* Header */}
                      <div className="font-secondary text-[hsl(var(--text-secondary))] text-sm p-2"></div>
                      {weekDays.map((day) => (
                        <div key={day} className="font-secondary text-[hsl(var(--text-secondary))] text-sm p-2 text-center">
                          {day.slice(0, 3)}
                        </div>
                      ))}

                      {/* Time slots */}
                      {timeSlots.map((time) => (
                        <div key={time} className="contents">
                          <div className="font-secondary text-[hsl(var(--text-secondary))] text-sm p-2 text-right">
                            {time}
                          </div>
                          {weekDays.map((day, dayIndex) => {
                            // Check if this day/time has availability
                            const hasAvailability = availability.some(slot => 
                              slot.day_of_week === dayIndex && 
                              slot.start_time <= time && 
                              slot.end_time > time &&
                              slot.is_available
                            );
                            
                            // Check if this day/time has an appointment
                            const hasAppointment = appointments.some(apt => {
                              const aptDate = new Date(apt.session_date);
                              const aptDay = aptDate.getDay();
                              return aptDay === dayIndex && apt.session_time === time;
                            });
                            
                            return (
                              <div
                                key={`${day}-${time}`}
                                className={`h-10 border rounded cursor-pointer transition-colors ${
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
              </div>

              {/* Settings & Templates */}
              <div className="space-y-6">
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
                        <p className="font-secondary text-text-muted text-xs">
                          Automatically approve new sessions
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-secondary font-semibold text-[hsl(var(--text-primary))] text-sm">
                          Buffer between sessions
                        </p>
                        <p className="font-secondary text-text-muted text-xs">
                          15-minute break automatically
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-secondary font-semibold text-[hsl(var(--text-primary))] text-sm">
                          Weekend availability
                        </p>
                        <p className="font-secondary text-text-muted text-xs">
                          Accept weekend bookings
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary text-lg">Schedule Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Standard Week
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Busy Week
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Light Week
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-[hsl(var(--text-secondary))]">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary text-lg">Upcoming Changes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[hsl(var(--warning-bg))]/10 rounded-lg">
                      <div>
                        <p className="font-secondary font-semibold text-[hsl(var(--text-primary))] text-sm">
                          Holiday Block
                        </p>
                        <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">
                          Dec 23 - Jan 2
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Dialog open={isAddingBlock} onOpenChange={setIsAddingBlock}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start text-[hsl(var(--text-secondary))]">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Time Off
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
                                value={newBlock.start_date}
                                onChange={(e) => setNewBlock({...newBlock, start_date: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="end_date">End Date</Label>
                              <Input
                                id="end_date"
                                type="date"
                                value={newBlock.end_date}
                                onChange={(e) => setNewBlock({...newBlock, end_date: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="all_day"
                              checked={newBlock.all_day}
                              onCheckedChange={(checked) => setNewBlock({...newBlock, all_day: checked})}
                            />
                            <Label htmlFor="all_day">All Day</Label>
                          </div>
                          {!newBlock.all_day && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="start_time">Start Time</Label>
                                <Input
                                  id="start_time"
                                  type="time"
                                  value={newBlock.start_time}
                                  onChange={(e) => setNewBlock({...newBlock, start_time: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="end_time">End Time</Label>
                                <Input
                                  id="end_time"
                                  type="time"
                                  value={newBlock.end_time}
                                  onChange={(e) => setNewBlock({...newBlock, end_time: e.target.value})}
                                />
                              </div>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => {
                                addBlockedTime(newBlock);
                                setIsAddingBlock(false);
                              }}
                              className="flex-1"
                            >
                              Block Time
                            </Button>
                            <Button variant="outline" onClick={() => setIsAddingBlock(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
            </div>
            </div>
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}

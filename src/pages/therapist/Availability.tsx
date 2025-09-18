import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Trash2 } from "lucide-react";

const weekDays = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export default function TherapistAvailability() {
  return (
    <TherapistLayout>
      <div className="p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Availability</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Set your working hours and availability</p>
            </div>
            <div className="space-y-8">
            <div className="flex items-center justify-between">
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
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Time Block
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">This Week</p>
                    <p className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">18</p>
                    <p className="font-secondary text-text-muted text-xs">Available hours</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Booked</p>
                    <p className="font-primary text-2xl font-bold text-primary">12</p>
                    <p className="font-secondary text-text-muted text-xs">Sessions scheduled</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Remaining</p>
                    <p className="font-primary text-2xl font-bold text-[hsl(var(--success-text))]">6</p>
                    <p className="font-secondary text-text-muted text-xs">Open slots</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Utilization</p>
                    <p className="font-primary text-2xl font-bold text-[hsl(var(--warning-text))]">67%</p>
                    <p className="font-secondary text-text-muted text-xs">Of available hours</p>
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
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Booked</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-surface-accent rounded-full"></div>
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
                          {weekDays.map((day) => {
                            // Mock availability data
                            const isAvailable = Math.random() > 0.4;
                            const isBooked = isAvailable && Math.random() > 0.7;
                            
                            return (
                              <div
                                key={`${day}-${time}`}
                                className={`h-10 border rounded cursor-pointer transition-colors ${
                                  isBooked
                                    ? "bg-primary hover:bg-primary/80"
                                    : isAvailable
                                    ? "bg-[hsl(var(--success-bg))]/20 hover:bg-[hsl(var(--success-bg))]/30 border-success/40"
                                    : "bg-surface-accent hover:bg-surface-accent/80"
                                }`}
                                title={`${day} ${time} - ${
                                  isBooked ? "Booked" : isAvailable ? "Available" : "Unavailable"
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
                    <Button variant="ghost" className="w-full justify-start text-text-muted">
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
                        <p className="font-secondary text-text-muted text-xs">
                          Dec 23 - Jan 2
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button variant="ghost" className="w-full justify-start text-text-muted">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Time Off
                    </Button>
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

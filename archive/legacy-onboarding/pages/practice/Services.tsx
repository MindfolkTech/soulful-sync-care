import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Clock, Calendar, Users } from "lucide-react";

export default function PracticeServices() {
  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Services & Pricing</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Configure your session types, pricing, and availability settings</p>
            </div>
            
            <Stack className="space-y-6">
              {/* Session Settings */}
              <Card id="focus-rates">
                <CardHeader>
                  <CardTitle className="font-primary text-[hsl(var(--jovial-jade))] flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Session Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-5 lg:p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="sessionPrice" className="font-secondary text-[hsl(var(--text-primary))]">
                          Standard Session Price (per hour)
                        </Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--text-secondary))]">£</span>
                          <Input 
                            id="sessionPrice" 
                            type="number" 
                            defaultValue="75" 
                            className="pl-8 min-h-[--touch-target-min]"
                            aria-describedby="sessionPrice-help"
                          />
                        </div>
                        <p className="text-xs text-[hsl(var(--text-secondary))] mt-1">Your standard rate for therapy sessions</p>
                      </div>
                      
                      <div>
                        <Label htmlFor="consultationPrice" className="font-secondary text-[hsl(var(--text-primary))]">
                          Initial Consultation Price
                        </Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--text-secondary))]">£</span>
                          <Input 
                            id="consultationPrice" 
                            type="number" 
                            defaultValue="60" 
                            className="pl-8 min-h-[--touch-target-min]"
                          />
                        </div>
                        <p className="text-xs text-[hsl(var(--text-secondary))] mt-1">First meeting with new clients</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Session Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-primary text-[hsl(var(--jovial-jade))] flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Session Types & Duration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sessionDuration" className="font-secondary text-[hsl(var(--text-primary))]">
                        Standard Session Duration
                      </Label>
                      <select 
                        id="sessionDuration" 
                        defaultValue="60 minutes"
                        className="w-full px-3 py-2 border rounded-md bg-background font-secondary text-[hsl(var(--text-primary))] min-h-[--touch-target-min] mt-1"
                        aria-label="Select default session duration"
                      >
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                        <option>60 minutes</option>
                        <option>90 minutes</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="consultationDuration" className="font-secondary text-[hsl(var(--text-primary))]">
                        Consultation Duration
                      </Label>
                      <select 
                        id="consultationDuration" 
                        defaultValue="30 minutes"
                        className="w-full px-3 py-2 border rounded-md bg-background font-secondary text-[hsl(var(--text-primary))] min-h-[--touch-target-min] mt-1"
                      >
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                      <strong>Tip:</strong> Shorter consultation sessions help clients get to know you before committing to full therapy sessions.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Availability Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-primary text-[hsl(var(--jovial-jade))] flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Availability Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <HStack className="justify-between">
                      <div>
                        <Label className="font-secondary text-[hsl(var(--text-primary))]">Accept new clients</Label>
                        <p className="text-sm text-[hsl(var(--text-secondary))]">Allow new clients to book sessions</p>
                      </div>
                      <Switch defaultChecked aria-label="Toggle accepting new clients" />
                    </HStack>

                    <HStack className="justify-between">
                      <div>
                        <Label className="font-secondary text-[hsl(var(--text-primary))]">Instant booking</Label>
                        <p className="text-sm text-[hsl(var(--text-secondary))]">Clients can book without approval</p>
                      </div>
                      <Switch defaultChecked aria-label="Toggle instant booking for clients" />
                    </HStack>

                    <HStack className="justify-between">
                      <div>
                        <Label className="font-secondary text-[hsl(var(--text-primary))]">Weekend availability</Label>
                        <p className="text-sm text-[hsl(var(--text-secondary))]">Available for weekend sessions</p>
                      </div>
                      <Switch aria-label="Toggle weekend availability" />
                    </HStack>

                    <HStack className="justify-between">
                      <div>
                        <Label className="font-secondary text-[hsl(var(--text-primary))]">Evening sessions</Label>
                        <p className="text-sm text-[hsl(var(--text-secondary))]">Available after 6 PM</p>
                      </div>
                      <Switch defaultChecked aria-label="Toggle evening availability" />
                    </HStack>
                  </div>
                </CardContent>
              </Card>

              {/* Client Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-primary text-[hsl(var(--jovial-jade))] flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Client Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="maxClients" className="font-secondary text-[hsl(var(--text-primary))]">
                        Maximum Active Clients
                      </Label>
                      <Input 
                        id="maxClients" 
                        type="number" 
                        defaultValue="15" 
                        className="min-h-[--touch-target-min] mt-1"
                      />
                      <p className="text-xs text-[hsl(var(--text-secondary))] mt-1">Optional limit to manage workload</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="advanceBooking" className="font-secondary text-[hsl(var(--text-primary))]">
                        Advance Booking Period
                      </Label>
                      <select 
                        id="advanceBooking" 
                        defaultValue="4 weeks"
                        className="w-full px-3 py-2 border rounded-md bg-background font-secondary text-[hsl(var(--text-primary))] min-h-[--touch-target-min] mt-1"
                      >
                        <option>1 week</option>
                        <option>2 weeks</option>
                        <option>4 weeks</option>
                        <option>8 weeks</option>
                        <option>No limit</option>
                      </select>
                      <p className="text-xs text-[hsl(var(--text-secondary))] mt-1">How far in advance clients can book</p>
                    </div>
                  </div>

                  <HStack className="justify-between">
                    <div>
                      <Label className="font-secondary text-[hsl(var(--text-primary))]">Require consultation before therapy</Label>
                      <p className="text-sm text-[hsl(var(--text-secondary))]">New clients must book consultation first</p>
                    </div>
                    <Switch defaultChecked aria-label="Toggle consultation requirement" />
                  </HStack>
                </CardContent>
              </Card>

              {/* Save Changes */}
              <HStack className="justify-end pt-4">
                <Button variant="outline" className="min-h-[--touch-target-min]">
                  Cancel
                </Button>
                <Button variant="primary" className="min-h-[--touch-target-min]">
                  Save Changes
                </Button>
              </HStack>
            </Stack>
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}
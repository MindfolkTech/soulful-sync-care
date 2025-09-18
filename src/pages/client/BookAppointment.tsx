import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TimeSlotPicker } from "@/components/booking/time-slot-picker";
import { BookingDataNotice } from "@/components/legal/data-processing-notice";
import { useState } from "react";

export default function BookAppointment() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [sessionType, setSessionType] = useState("chemistry-15");
  const [comments, setComments] = useState("");

  const therapist = {
    name: "Dr. Sarah Chen",
    title: "Clinical Psychologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face"
  };

  const sessionTypes = [
    { id: "chemistry-15", label: "15-minute Chemistry Call", price: "Free", description: "Get to know each other" },
    { id: "session-30", label: "30-minute Session", price: "£40", description: "Focused session" },
    { id: "session-60", label: "60-minute Session", price: "£80", description: "Full therapy session" }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
  ];

  const formatDisplayTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-primary text-3xl font-bold text-[hsl(var(--text-primary))] mb-2">
                Book your session
              </h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">
                Schedule time with {therapist.name}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Session Type */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary">Session Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={sessionType} onValueChange={setSessionType}>
                      {sessionTypes.map((type) => (
                        <div key={type.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <RadioGroupItem value={type.id} id={type.id} />
                          <div className="flex-1">
                            <label htmlFor={type.id} className="cursor-pointer">
                              <div className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                                {type.label}
                              </div>
                              <div className="text-sm text-[hsl(var(--text-secondary))]">
                                {type.description}
                              </div>
                            </label>
                          </div>
                          <div className="font-secondary font-bold text-primary">
                            {type.price}
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Date Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary">Select Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                  </CardContent>
                </Card>

{/* Time Selection */}
                <TimeSlotPicker 
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                  therapistId={id}
                />

                {/* Comments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary">Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="comments" className="font-secondary">
                        Anything you'd like to share? (Optional)
                      </Label>
                      <Textarea
                        id="comments"
                        placeholder="Let your therapist know what you'd like to focus on..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="mt-2"
                        rows={4}
                      />
                      <p className="text-xs text-text-muted mt-1">
                        {comments.length}/500 characters
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Sidebar */}
              <div className="space-y-6">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="font-primary text-lg">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={therapist.image}
                        alt={therapist.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                          {therapist.name}
                        </div>
                        <div className="text-sm text-[hsl(var(--text-secondary))]">
                          {therapist.title}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm font-secondary">
                      <div className="flex justify-between">
                        <span className="text-[hsl(var(--text-secondary))]">Session:</span>
                        <span className="text-[hsl(var(--text-primary))]">15-min Chemistry Call</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[hsl(var(--text-secondary))]">Date:</span>
                        <span className="text-[hsl(var(--text-primary))]">
                          {selectedDate?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[hsl(var(--text-secondary))]">Time:</span>
                        <span className="text-[hsl(var(--text-primary))]">
                          {selectedTime ? formatDisplayTime(selectedTime) : "Not selected"}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span className="text-[hsl(var(--text-primary))]">Total:</span>
                        <span className="text-primary">Free</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Confirm Booking
                    </Button>

                    <BookingDataNotice className="mt-4" />
                    
                    <div className="text-xs text-text-muted text-center mt-4">
                      <p>By booking, you agree to our Terms of Service</p>
                      <p className="mt-1">Free cancellation up to 2 hours before</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

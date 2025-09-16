import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, CreditCard, Shield, Upload } from "lucide-react";

export default function Account() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-primary text-3xl font-bold text-text-primary">
                Account Settings
              </h1>
              <p className="font-secondary text-text-secondary mt-2">
                Manage your profile and preferences
              </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-primary flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b196?w=200&h=200&fit=crop&crop=face" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Change Photo
                          </Button>
                          <p className="text-sm text-text-muted mt-1">
                            JPG, PNG or GIF. Max size 2MB.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Jane" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="jane@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="+44 7700 900123" />
                        </div>
                      </div>

                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-primary font-semibold text-text-primary">
                            Email Notifications
                          </h4>
                          <p className="text-sm text-text-secondary">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-primary font-semibold text-text-primary">
                            SMS Reminders
                          </h4>
                          <p className="text-sm text-text-secondary">
                            Get text reminders for appointments
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-primary font-semibold text-text-primary">
                            Push Notifications
                          </h4>
                          <p className="text-sm text-text-secondary">
                            Receive push notifications in browser
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-primary font-semibold text-text-primary">
                            Marketing Communications
                          </h4>
                          <p className="text-sm text-text-secondary">
                            Receive updates about new features and offers
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <Button>Save Preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Privacy & Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-primary font-semibold text-text-primary">
                            Profile Visibility
                          </h4>
                          <p className="text-sm text-text-secondary">
                            Allow therapists to see your profile information
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-primary font-semibold text-text-primary">
                            Data Analytics
                          </h4>
                          <p className="text-sm text-text-secondary">
                            Help improve our service with anonymous usage data
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="pt-6 border-t space-y-4">
                      <h4 className="font-primary font-semibold text-text-primary">
                        Data Management
                      </h4>
                      <div className="flex space-x-4">
                        <Button variant="outline">Download My Data</Button>
                        <Button variant="outline">Delete Account</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Billing & Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-primary font-semibold text-text-primary mb-4">
                        Payment Methods
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-6 bg-[--garden-green] rounded flex items-center justify-center">
                              <span className="text-[--on-dark] text-xs font-bold">VISA</span>
                            </div>
                            <div>
                              <p className="font-secondary font-semibold text-text-primary">
                                •••• •••• •••• 4242
                              </p>
                              <p className="text-sm text-text-secondary">Expires 12/25</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4">
                        Add Payment Method
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-primary font-semibold text-text-primary mb-4">
                        Billing History
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-secondary font-semibold text-text-primary">
                              Session with Dr. Sarah Chen
                            </p>
                            <p className="text-sm text-text-secondary">Jan 12, 2024</p>
                          </div>
                          <div className="text-right">
                            <p className="font-secondary font-semibold text-text-primary">£80.00</p>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
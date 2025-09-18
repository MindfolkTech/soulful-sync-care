import { useState } from "react";
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Bell, CreditCard, Shield, Upload, Download, Trash2 } from "lucide-react";
import { DataRightsManager } from "@/utils/data-rights";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDownloadData = async () => {
    setIsDownloading(true);
    try {
      await DataRightsManager.downloadUserData('current-user');
      toast({
        title: "Data Export Complete",
        description: "Your data has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export your data.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await DataRightsManager.deleteUserAccount('current-user');
      toast({
        title: "Account Deleted",
        description: "Your account and all data have been permanently deleted.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: error instanceof Error ? error.message : "Failed to delete your account.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-primary text-3xl font-bold text-[hsl(var(--text-primary))]">
                Account Settings
              </h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))] mt-2">
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

                      <Button onClick={() => console.log('Save profile changes')}>Save Changes</Button>
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
                          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                            Email Notifications
                          </h4>
                          <p className="text-sm text-[hsl(var(--text-secondary))]">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                            SMS Reminders
                          </h4>
                          <p className="text-sm text-[hsl(var(--text-secondary))]">
                            Get text reminders for appointments
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                            Push Notifications
                          </h4>
                          <p className="text-sm text-[hsl(var(--text-secondary))]">
                            Receive push notifications in browser
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                            Marketing Communications
                          </h4>
                          <p className="text-sm text-[hsl(var(--text-secondary))]">
                            Receive updates about new features and offers
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <Button onClick={() => console.log('Save notification preferences')}>Save Preferences</Button>
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
                          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                            Profile Visibility
                          </h4>
                          <p className="text-sm text-[hsl(var(--text-secondary))]">
                            Allow therapists to see your profile information
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                            Data Analytics
                          </h4>
                          <p className="text-sm text-[hsl(var(--text-secondary))]">
                            Help improve our service with anonymous usage data
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                            Marketing Communications
                          </h4>
                          <p className="text-sm text-[hsl(var(--text-secondary))]">
                            Receive newsletters, promotions, and service updates
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                            Health Data Processing
                          </h4>
                          <p className="text-sm text-[hsl(var(--text-secondary))]">
                            Process health data for therapy matching and care
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                            Session Recording
                          </h4>
                          <p className="text-sm text-[hsl(var(--text-secondary))]">
                            Allow session recordings for quality and training (with consent)
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                            Research Participation
                          </h4>
                          <p className="text-sm text-[hsl(var(--text-secondary))]">
                            Participate in anonymized research to improve therapy outcomes
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="pt-6 border-t space-y-4">
                      <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                        Consent Management
                      </h4>
                      <div className="p-4 bg-background border rounded-lg">
                        <p className="text-sm font-secondary text-[hsl(var(--text-secondary))] mb-3">
                          You can withdraw or modify your consent at any time. Changes will take effect immediately.
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="font-secondary">
                            View Consent History
                          </Button>
                          <Button variant="outline" size="sm" className="font-secondary">
                            Withdraw All Consent
                          </Button>
                        </div>
                      </div>

                      <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                        Data Management
                      </h4>
                      <div className="flex space-x-4">
                        <Button 
                          variant="outline" 
                          onClick={handleDownloadData}
                          disabled={isDownloading}
                          className="font-secondary"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {isDownloading ? "Downloading..." : "Download My Data"}
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="font-secondary text-[hsl(var(--error-text))] hover:text-[hsl(var(--error-text))]"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Account
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-primary">
                                Delete Your Account
                              </AlertDialogTitle>
                              <AlertDialogDescription className="font-secondary">
                                This action cannot be undone. This will permanently delete your account 
                                and remove all your data from our servers, including:
                                <ul className="mt-2 ml-4 list-disc">
                                  <li>Your profile and assessment data</li>
                                  <li>All therapy sessions and messages</li>
                                  <li>Your preferences and settings</li>
                                  <li>Your account history</li>
                                </ul>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="font-secondary">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                                className="bg-destructive text-[hsl(var(--error-text))]-foreground hover:bg-destructive/90 font-secondary"
                              >
                                {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
                      <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))] mb-4">
                        Payment Methods
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-6 bg-[hsl(var(--garden-green))] rounded flex items-center justify-center">
                              <span className="text-[hsl(var(--on-dark))] text-xs font-bold">VISA</span>
                            </div>
                            <div>
                              <p className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                                •••• •••• •••• 4242
                              </p>
                              <p className="text-sm text-[hsl(var(--text-secondary))]">Expires 12/25</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => console.log('Remove payment method')}>Remove</Button>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4">
                        Add Payment Method
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))] mb-4">
                        Billing History
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-secondary font-semibold text-[hsl(var(--text-primary))]">
                              Session with Dr. Sarah Chen
                            </p>
                            <p className="text-sm text-[hsl(var(--text-secondary))]">Jan 12, 2024</p>
                          </div>
                          <div className="text-right">
                            <p className="font-secondary font-semibold text-[hsl(var(--text-primary))]">£80.00</p>
                            <Button variant="ghost" size="sm" onClick={() => console.log('Download invoice')}>Download</Button>
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

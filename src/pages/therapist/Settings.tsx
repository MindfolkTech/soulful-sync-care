import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, User, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function TherapistSettings() {
  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
            <div className="space-y-4">
                <h1 className="font-primary text-3xl">Settings</h1>
                <p className="text-muted-foreground">Manage your account and notification preferences.</p>
                <div className="space-y-8">
                    {/* Notification Preferences */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5"/> Notification Preferences</CardTitle>
                            <CardDescription>Choose how you want to be notified.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Notification settings form will go here.</p>
                        </CardContent>
                    </Card>

                    {/* Account Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><User className="w-5 h-5"/> Account Details</CardTitle>
                            <CardDescription>Manage your personal information and login details.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <p>Account details form will go here.</p>
                        </CardContent>
                    </Card>

                    {/* Profile & Verification */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5"/> Profile & Verification</CardTitle>
                            <CardDescription>Shortcuts to manage your public profile and verification status.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Link to="/t/profile" className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted">
                                <div>
                                    <h3 className="font-semibold">Manage Profile</h3>
                                    <p className="text-sm text-muted-foreground">Edit your public bio, photo, and therapeutic approach.</p>
                                </div>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                             <Link to="/t/onboarding/verification" className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted">
                                <div>
                                    <h3 className="font-semibold">Manage Verification</h3>
                                    <p className="text-sm text-muted-foreground">View or update your verification documents.</p>
                                </div>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}



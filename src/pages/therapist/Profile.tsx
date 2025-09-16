import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tag } from "@/components/ui/tag";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Upload, Eye, Play } from "lucide-react";

export default function TherapistProfile() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-primary text-3xl font-bold text-text-primary">
                  Your Profile
                </h1>
                <p className="font-secondary text-text-secondary mt-2">
                  Manage how clients see you
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Profile Status */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="font-secondary text-text-primary">Profile Active</span>
                    </div>
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-secondary text-text-secondary text-sm">Profile Views This Week</p>
                      <p className="font-primary text-lg font-semibold text-text-primary">28</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Preview */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary text-lg">Client View</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="relative inline-block">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                      <h3 className="font-primary text-xl font-semibold text-text-primary mt-3">
                        Dr. Sarah Chen
                      </h3>
                      <p className="font-secondary text-text-secondary">
                        Clinical Psychologist
                      </p>
                      <p className="font-secondary text-text-muted text-sm">
                        8 years experience
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="font-secondary text-text-secondary text-sm mb-2">Specialties</p>
                        <div className="flex flex-wrap gap-1">
                          <Tag category="specialty" size="sm">Anxiety</Tag>
                          <Tag category="specialty" size="sm">Depression</Tag>
                          <Tag category="specialty" size="sm">Trauma</Tag>
                        </div>
                      </div>

                      <div>
                        <p className="font-secondary text-text-secondary text-sm mb-2">Style</p>
                        <div className="flex flex-wrap gap-1">
                          <Tag category="personality" size="sm">Empathetic</Tag>
                          <Tag category="personality" size="sm">Structured</Tag>
                        </div>
                      </div>

                      <div>
                        <p className="font-secondary text-text-secondary text-sm mb-2">Languages</p>
                        <div className="flex flex-wrap gap-1">
                          <Tag category="language" size="sm">English</Tag>
                          <Tag category="language" size="sm">Mandarin</Tag>
                        </div>
                      </div>
                    </div>

                    <blockquote className="font-secondary text-text-secondary italic text-sm text-center">
                      "I believe in creating a safe space where you can explore your authentic self."
                    </blockquote>

                    <div className="text-center">
                      <p className="font-secondary font-semibold text-text-primary">£80/session</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Edit Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Change Photo
                        </Button>
                        <p className="text-sm text-text-muted mt-1 font-secondary">
                          Professional headshot recommended
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Sarah" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Chen" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input id="title" defaultValue="Clinical Psychologist" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <select className="w-full p-2 border rounded-md bg-background">
                          <option value="5-10 years" selected>5-10 years</option>
                          <option value="0-2 years">0-2 years</option>
                          <option value="2-5 years">2-5 years</option>
                          <option value="10+ years">10+ years</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Bio */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary">Professional Bio</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio (200-400 words)</Label>
                      <Textarea
                        id="bio"
                        rows={6}
                        defaultValue="I am a Clinical Psychologist with over 8 years of experience helping individuals navigate anxiety, depression, and trauma. My approach combines evidence-based therapies with a warm, empathetic style that creates a safe space for healing and growth."
                      />
                      <p className="text-xs text-text-muted font-secondary">287/400 words</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="quote">Client Quote (50-100 words)</Label>
                      <Textarea
                        id="quote"
                        rows={3}
                        defaultValue="I believe in creating a safe space where you can explore your authentic self and develop the tools you need to thrive."
                      />
                      <p className="text-xs text-text-muted font-secondary">76/100 words</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Introduction */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary">Video Introduction</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-secondary font-semibold text-text-primary">
                          Current Video (45 seconds)
                        </p>
                        <p className="font-secondary text-text-secondary text-sm">
                          Uploaded 2 weeks ago
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Replace
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-info/10 p-4 rounded-lg">
                      <p className="font-secondary text-info text-sm">
                        💡 Profiles with videos get 3x more chemistry call bookings
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Rates & Availability */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary">Rates & Availability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rate30">30-minute Rate</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">£</span>
                          <Input id="rate30" className="pl-8" defaultValue="40" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rate60">60-minute Rate</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">£</span>
                          <Input id="rate60" className="pl-8" defaultValue="80" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rate90">90-minute Rate</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">£</span>
                          <Input id="rate90" className="pl-8" defaultValue="120" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline">Manage Availability</Button>
                      <Button>Save Changes</Button>
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
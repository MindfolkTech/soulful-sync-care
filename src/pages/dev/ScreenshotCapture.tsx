import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import { ScreenshotCapture } from '@/components/dev/screenshot-capture';
import { ScreenshotAnalysis } from '@/components/dev/screenshot-analysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Monitor, 
  Smartphone, 
  Tablet,
  Code,
  Download,
  FileText,
  BarChart3
} from 'lucide-react';

export default function ScreenshotCapturePage() {
  return (
    <div className="min-h-screen bg-warm-white flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="font-primary text-3xl font-bold text-jovial-jade">
                Screenshot Analysis Tool
              </h1>
              <p className="font-secondary text-text-secondary max-w-2xl mx-auto">
                Automatically capture and analyze screenshots of every screen in the MindFolk app. 
                Get insights on accessibility, performance, and visual issues.
              </p>
            </div>

            {/* Analysis Component */}
            <div className="max-w-6xl mx-auto">
              <ScreenshotAnalysis />
            </div>

            {/* Capture Component */}
            <div className="max-w-4xl mx-auto">
              <ScreenshotCapture />
            </div>

            {/* Usage Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    CLI Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-secondary font-medium text-sm">Command Line Interface:</p>
                    <div className="bg-surface-accent p-3 rounded-lg font-mono text-sm">
                      <div>npm run screenshots</div>
                      <div>npm run screenshots mobile</div>
                      <div>npm run screenshots tablet</div>
                      <div>npm run screenshots all</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-secondary font-medium text-sm">Parameters:</p>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• <code>desktop</code> - Desktop screenshots (default)</li>
                      <li>• <code>mobile</code> - Mobile screenshots (375x667)</li>
                      <li>• <code>tablet</code> - Tablet screenshots (768x1024)</li>
                      <li>• <code>all</code> - All device types</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    What Gets Captured
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-secondary font-medium text-sm">Routes Captured:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <Badge variant="secondary" className="mb-1">Public</Badge>
                        <ul className="text-text-secondary space-y-1">
                          <li>• Landing Page</li>
                          <li>• Therapist Landing</li>
                          <li>• Sign In/Up</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-1">Client</Badge>
                        <ul className="text-text-secondary space-y-1">
                          <li>• Assessment</li>
                          <li>• Discover</li>
                          <li>• Favorites</li>
                          <li>• Appointments</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-1">Therapist</Badge>
                        <ul className="text-text-secondary space-y-1">
                          <li>• Onboarding</li>
                          <li>• Dashboard</li>
                          <li>• Clients</li>
                          <li>• Earnings</li>
                        </ul>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-1">Admin</Badge>
                        <ul className="text-text-secondary space-y-1">
                          <li>• Overview</li>
                          <li>• Users</li>
                          <li>• Therapists</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Device Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Desktop
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-text-secondary">Resolution: 1280x720</p>
                    <p className="text-sm text-text-secondary">Full page capture</p>
                    <p className="text-sm text-text-secondary">High quality (90%)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tablet className="w-5 h-5" />
                    Tablet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-text-secondary">Resolution: 768x1024</p>
                    <p className="text-sm text-text-secondary">Full page capture</p>
                    <p className="text-sm text-text-secondary">High quality (90%)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Mobile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-text-secondary">Resolution: 375x667</p>
                    <p className="text-sm text-text-secondary">Viewport capture</p>
                    <p className="text-sm text-text-secondary">High quality (90%)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}

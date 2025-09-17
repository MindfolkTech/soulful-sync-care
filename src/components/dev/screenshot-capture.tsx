import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Download, 
  Monitor, 
  Smartphone, 
  Tablet,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';

interface ScreenshotCaptureProps {
  className?: string;
}

interface CaptureStatus {
  isCapturing: boolean;
  progress: number;
  currentRoute: string;
  completed: string[];
  failed: string[];
  total: number;
}

export function ScreenshotCapture({ className }: ScreenshotCaptureProps) {
  const [status, setStatus] = useState<CaptureStatus>({
    isCapturing: false,
    progress: 0,
    currentRoute: '',
    completed: [],
    failed: [],
    total: 0
  });

  const [screenshots, setScreenshots] = useState<Map<string, string>>(new Map());

  const captureScreenshots = async (device: 'desktop' | 'mobile' | 'tablet') => {
    setStatus({
      isCapturing: true,
      progress: 0,
      currentRoute: '',
      completed: [],
      failed: [],
      total: 0
    });

    try {
      // Import the screenshot capture utility
      const { ScreenshotCapture, MIND_FOLK_ROUTES, MOBILE_ROUTES, TABLET_ROUTES } = await import('@/utils/screenshot-capture');
      
      const capture = new ScreenshotCapture();
      await capture.initialize();

      let routes = MIND_FOLK_ROUTES;
      let config = { fullPage: true, quality: 90 };

      switch (device) {
        case 'mobile':
          routes = MOBILE_ROUTES;
          config.fullPage = false;
          break;
        case 'tablet':
          routes = TABLET_ROUTES;
          break;
        default:
          routes = MIND_FOLK_ROUTES;
      }

      setStatus(prev => ({ ...prev, total: routes.length }));

      const results = new Map<string, string>();

      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        
        setStatus(prev => ({
          ...prev,
          currentRoute: route.name,
          progress: (i / routes.length) * 100
        }));

        try {
          const screenshotBuffer = await capture.captureRoute(route, config);
          const base64 = `data:image/png;base64,${screenshotBuffer.toString('base64')}`;
          results.set(route.name, base64);
          
          setStatus(prev => ({
            ...prev,
            completed: [...prev.completed, route.name]
          }));
        } catch (error) {
          console.error(`Failed to capture ${route.name}:`, error);
          setStatus(prev => ({
            ...prev,
            failed: [...prev.failed, route.name]
          }));
        }
      }

      setScreenshots(results);
      setStatus(prev => ({ ...prev, isCapturing: false, progress: 100 }));

      await capture.close();
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      setStatus(prev => ({ ...prev, isCapturing: false }));
    }
  };

  const downloadScreenshot = (name: string, base64: string) => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = `${name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllScreenshots = () => {
    screenshots.forEach((base64, name) => {
      setTimeout(() => downloadScreenshot(name, base64), 100);
    });
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Screenshot Capture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Capture Controls */}
          <div className="flex gap-2">
            <Button
              onClick={() => captureScreenshots('desktop')}
              disabled={status.isCapturing}
              className="flex-1"
            >
              <Monitor className="w-4 h-4 mr-2" />
              Desktop
            </Button>
            <Button
              onClick={() => captureScreenshots('mobile')}
              disabled={status.isCapturing}
              variant="outline"
              className="flex-1"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </Button>
            <Button
              onClick={() => captureScreenshots('tablet')}
              disabled={status.isCapturing}
              variant="outline"
              className="flex-1"
            >
              <Tablet className="w-4 h-4 mr-2" />
              Tablet
            </Button>
          </div>

          {/* Progress */}
          {status.isCapturing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Capturing screenshots...</span>
                <span>{status.completed.length + status.failed.length} / {status.total}</span>
              </div>
              <Progress value={status.progress} className="h-2" />
              {status.currentRoute && (
                <p className="text-sm text-[hsl(var(--text-secondary))]">
                  Current: {status.currentRoute}
                </p>
              )}
            </div>
          )}

          {/* Results Summary */}
          {!status.isCapturing && (status.completed.length > 0 || status.failed.length > 0) && (
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-success-bg" />
                  <span className="text-sm">{status.completed.length} completed</span>
                </div>
                {status.failed.length > 0 && (
                  <div className="flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-error-bg" />
                    <span className="text-sm">{status.failed.length} failed</span>
                  </div>
                )}
              </div>
              
              {screenshots.size > 0 && (
                <Button onClick={downloadAllScreenshots} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download All Screenshots
                </Button>
              )}
            </div>
          )}

          {/* Screenshot Grid */}
          {screenshots.size > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Captured Screenshots:</h4>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {Array.from(screenshots.entries()).map(([name, base64]) => (
                  <div key={name} className="relative group">
                    <img
                      src={base64}
                      alt={name}
                      className="w-full h-20 object-cover rounded border"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => downloadScreenshot(name, base64)}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-[hsl(var(--text-secondary))] mt-1 truncate">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

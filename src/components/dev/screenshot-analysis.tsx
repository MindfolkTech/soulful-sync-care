import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Download, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Loader2,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface AnalysisResult {
  route: string;
  name: string;
  accessibility: {
    score: number;
    issues: string[];
  };
  performance: {
    loadTime: number;
  };
  visual: {
    layoutIssues: string[];
  };
  content: {
    contentLength: {
      text: number;
      buttons: number;
    };
  };
}

interface AnalysisStatus {
  isAnalyzing: boolean;
  progress: number;
  currentRoute: string;
  completed: string[];
  failed: string[];
  total: number;
}

export function ScreenshotAnalysis({ className }: { className?: string }) {
  const [status, setStatus] = useState<AnalysisStatus>({
    isAnalyzing: false,
    progress: 0,
    currentRoute: '',
    completed: [],
    failed: [],
    total: 0
  });

  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [report, setReport] = useState<string>('');

  const runAnalysis = async () => {
    setStatus({
      isAnalyzing: true,
      progress: 0,
      currentRoute: '',
      completed: [],
      failed: [],
      total: 0
    });

    try {
      // Import the analysis utility
      const { ScreenshotAnalyzer, MIND_FOLK_ROUTES } = await import('@/utils/screenshot-analyzer');
      
      const analyzer = new ScreenshotAnalyzer();
      await analyzer.initialize();

      setStatus(prev => ({ ...prev, total: MIND_FOLK_ROUTES.length }));

      const analyses = [];
      for (let i = 0; i < MIND_FOLK_ROUTES.length; i++) {
        const route = MIND_FOLK_ROUTES[i];
        
        setStatus(prev => ({
          ...prev,
          currentRoute: route.name,
          progress: (i / MIND_FOLK_ROUTES.length) * 100
        }));

        try {
          const analysis = await analyzer.analyzeRoute(route.path, route.name);
          analyses.push(analysis);
          
          setStatus(prev => ({
            ...prev,
            completed: [...prev.completed, route.name]
          }));
        } catch (error) {
          console.error(`Failed to analyze ${route.name}:`, error);
          setStatus(prev => ({
            ...prev,
            failed: [...prev.failed, route.name]
          }));
        }
      }

      // Generate report
      const reportText = analyzer.generateReport(analyses);
      setReport(reportText);

      // Set results for display
      const displayResults = analyses.map(a => ({
        route: a.route,
        name: a.name,
        accessibility: a.analysis.accessibility,
        performance: a.analysis.performance,
        visual: a.analysis.visual,
        content: a.analysis.content
      }));
      setResults(displayResults);

      setStatus(prev => ({ ...prev, isAnalyzing: false, progress: 100 }));

      await analyzer.close();
    } catch (error) {
      console.error('Analysis failed:', error);
      setStatus(prev => ({ ...prev, isAnalyzing: false }));
    }
  };

  const downloadReport = () => {
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `screenshot-analysis-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getAccessibilityColor = (score: number) => {
    if (score >= 90) return 'text-success-bg';
    if (score >= 70) return 'text-warning-bg';
    return 'text-error-bg';
  };

  const getPerformanceColor = (loadTime: number) => {
    if (loadTime < 1000) return 'text-success-bg';
    if (loadTime < 3000) return 'text-warning-bg';
    return 'text-error-bg';
  };

  const avgAccessibilityScore = results.length > 0 
    ? results.reduce((sum, r) => sum + r.accessibility.score, 0) / results.length 
    : 0;

  const avgLoadTime = results.length > 0 
    ? results.reduce((sum, r) => sum + r.performance.loadTime, 0) / results.length 
    : 0;

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Screenshot Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Analysis Controls */}
          <div className="flex gap-2">
            <Button
              onClick={runAnalysis}
              disabled={status.isAnalyzing}
              className="flex-1"
            >
              {status.isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
            {report && (
              <Button onClick={downloadReport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            )}
          </div>

          {/* Progress */}
          {status.isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing routes...</span>
                <span>{status.completed.length + status.failed.length} / {status.total}</span>
              </div>
              <Progress value={status.progress} className="h-2" />
              {status.currentRoute && (
                <p className="text-sm text-text-secondary">
                  Current: {status.currentRoute}
                </p>
              )}
            </div>
          )}

          {/* Summary Stats */}
          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-garden-green" />
                    <span className="font-medium">Accessibility</span>
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${getAccessibilityColor(avgAccessibilityScore)}`}>
                    {avgAccessibilityScore.toFixed(1)}/100
                  </div>
                  <div className="text-sm text-text-secondary">
                    Average score across {results.length} routes
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-elated-emerald" />
                    <span className="font-medium">Performance</span>
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${getPerformanceColor(avgLoadTime)}`}>
                    {avgLoadTime.toFixed(0)}ms
                  </div>
                  <div className="text-sm text-text-secondary">
                    Average load time
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-jovial-jade" />
                    <span className="font-medium">Routes</span>
                  </div>
                  <div className="text-2xl font-bold mt-1 text-jovial-jade">
                    {results.length}
                  </div>
                  <div className="text-sm text-text-secondary">
                    Successfully analyzed
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Issues Summary */}
          {results.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Issues Summary:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning-bg" />
                    <span className="font-medium">Accessibility Issues</span>
                  </div>
                  <div className="text-sm text-text-secondary">
                    {results.filter(r => r.accessibility.score < 80).length} routes need improvement
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-error-bg" />
                    <span className="font-medium">Performance Issues</span>
                  </div>
                  <div className="text-sm text-text-secondary">
                    {results.filter(r => r.performance.loadTime > 3000).length} routes are slow
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Results */}
          {results.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Route Analysis:</h4>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {results.map((result, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{result.name}</div>
                        <div className="text-sm text-text-secondary">{result.route}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className={`text-sm font-medium ${getAccessibilityColor(result.accessibility.score)}`}>
                            {result.accessibility.score}/100
                          </div>
                          <div className="text-xs text-text-secondary">A11y</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-medium ${getPerformanceColor(result.performance.loadTime)}`}>
                            {result.performance.loadTime}ms
                          </div>
                          <div className="text-xs text-text-secondary">Load</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-jovial-jade">
                            {result.content.contentLength.buttons}
                          </div>
                          <div className="text-xs text-text-secondary">Buttons</div>
                        </div>
                      </div>
                    </div>
                    {result.accessibility.issues.length > 0 && (
                      <div className="mt-2 text-sm text-warning-bg">
                        Issues: {result.accessibility.issues.join(', ')}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

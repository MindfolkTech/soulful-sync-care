import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Cookie, Settings, X } from "lucide-react";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false
    };
    setPreferences(onlyEssential);
    saveConsent(onlyEssential);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Set actual cookies based on preferences
    if (prefs.analytics) {
      // Enable analytics cookies
      document.cookie = 'analytics-consent=true; path=/; max-age=31536000'; // 1 year
    } else {
      // Remove analytics cookies
      document.cookie = 'analytics-consent=false; path=/; max-age=0';
    }
    
    if (prefs.marketing) {
      // Enable marketing cookies
      document.cookie = 'marketing-consent=true; path=/; max-age=31536000';
    } else {
      // Remove marketing cookies
      document.cookie = 'marketing-consent=false; path=/; max-age=0';
    }
  };

  const handlePreferenceChange = (key: keyof CookiePreferences, checked: boolean) => {
    if (key === 'essential') return; // Can't disable essential cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto shadow-lg border-2">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Cookie className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-primary text-lg font-semibold text-text-primary mb-2">
                  We use cookies
                </h3>
                <p className="font-secondary text-text-secondary text-sm">
                  We use cookies to improve your experience, analyze site usage, and assist in our marketing efforts. 
                  You can choose which cookies to accept or reject.
                </p>
              </div>

              {showSettings ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="essential" 
                      checked={preferences.essential} 
                      disabled
                    />
                    <Label htmlFor="essential" className="text-sm font-secondary">
                      Essential cookies (required for site functionality)
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="analytics" 
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => handlePreferenceChange('analytics', checked === true)}
                    />
                    <Label htmlFor="analytics" className="text-sm font-secondary">
                      Analytics cookies (help us improve our service)
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="marketing" 
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => handlePreferenceChange('marketing', checked === true)}
                    />
                    <Label htmlFor="marketing" className="text-sm font-secondary">
                      Marketing cookies (for personalized content)
                    </Label>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowSettings(true)}
                    className="font-secondary"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Cookie Settings
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRejectAll}
                    className="font-secondary"
                  >
                    Reject All
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleAcceptAll}
                    className="font-secondary"
                  >
                    Accept All
                  </Button>
                </div>
              )}

              {showSettings && (
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowSettings(false)}
                    className="font-secondary"
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSavePreferences}
                    className="font-secondary"
                  >
                    Save Preferences
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBanner(false)}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

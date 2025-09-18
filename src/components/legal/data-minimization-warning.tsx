import { AlertTriangle, Info, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DataMinimizationWarningProps {
  type: 'optional' | 'required' | 'sensitive';
  dataType: string;
  purpose: string;
  onSkip?: () => void;
  onContinue?: () => void;
  className?: string;
}

export function DataMinimizationWarning({
  type,
  dataType,
  purpose,
  onSkip,
  onContinue,
  className = ""
}: DataMinimizationWarningProps) {
  const getIcon = () => {
    switch (type) {
      case 'optional': return <Info className="w-4 h-4" />;
      case 'required': return <Shield className="w-4 h-4" />;
      case 'sensitive': return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'optional': return 'bg-surface-accent/10 border-surface-accent';
      case 'required': return 'bg-[hsl(var(--garden-green))]/10 border-[hsl(var(--garden-green))]';
      case 'sensitive': return 'bg-[hsl(var(--warning-bg))]/10 border-warning';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'optional': return 'Optional Data Collection';
      case 'required': return 'Required Data Collection';
      case 'sensitive': return 'Sensitive Data Collection';
    }
  };

  const getMessage = () => {
    switch (type) {
      case 'optional': 
        return `This ${dataType} is optional and helps us ${purpose}. You can skip this step.`;
      case 'required': 
        return `This ${dataType} is required to ${purpose}. We only collect what's necessary.`;
      case 'sensitive': 
        return `This ${dataType} is sensitive health data. We need explicit consent to ${purpose}.`;
    }
  };

  return (
    <Card className={`${getColor()} ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1 space-y-3">
            <div>
              <h4 className="font-primary font-semibold text-[hsl(var(--text-primary))] text-sm">
                {getTitle()}
              </h4>
              <p className="text-xs font-secondary text-[hsl(var(--text-secondary))] mt-1">
                {getMessage()}
              </p>
            </div>
            
            {type === 'sensitive' && (
              <div className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                <p><strong>Your rights:</strong></p>
                <ul className="list-disc ml-4 mt-1 space-y-1">
                  <li>Withdraw consent at any time</li>
                  <li>Access and correct your data</li>
                  <li>Request data deletion</li>
                </ul>
              </div>
            )}

            {type === 'optional' && onSkip && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onSkip}
                  className="font-secondary"
                >
                  Skip This Step
                </Button>
                {onContinue && (
                  <Button 
                    size="sm" 
                    onClick={onContinue}
                    className="font-secondary"
                  >
                    Continue
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Pre-configured warnings for common scenarios
export const DemographicsWarning = ({ onSkip, onContinue }: { onSkip?: () => void; onContinue?: () => void }) => (
  <DataMinimizationWarning
    type="optional"
    dataType="demographic information"
    purpose="find therapists who understand your background"
    onSkip={onSkip}
    onContinue={onContinue}
  />
);

export const HealthDataWarning = ({ onContinue }: { onContinue?: () => void }) => (
  <DataMinimizationWarning
    type="sensitive"
    dataType="mental health information"
    purpose="provide appropriate therapy matching and care"
    onContinue={onContinue}
  />
);

export const PaymentDataWarning = ({ onContinue }: { onContinue?: () => void }) => (
  <DataMinimizationWarning
    type="required"
    dataType="payment information"
    purpose="process your subscription and session payments"
    onContinue={onContinue}
  />
);

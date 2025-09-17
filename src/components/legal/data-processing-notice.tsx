import { Info, Shield, Eye, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DataProcessingNoticeProps {
  type: 'collection' | 'sharing' | 'storage' | 'analytics';
  dataTypes: string[];
  purpose: string;
  legalBasis: string;
  retentionPeriod?: string;
  thirdParties?: string[];
  className?: string;
}

export function DataProcessingNotice({
  type,
  dataTypes,
  purpose,
  legalBasis,
  retentionPeriod,
  thirdParties,
  className = ""
}: DataProcessingNoticeProps) {
  const getIcon = () => {
    switch (type) {
      case 'collection': return <Database className="w-4 h-4" />;
      case 'sharing': return <Eye className="w-4 h-4" />;
      case 'storage': return <Shield className="w-4 h-4" />;
      case 'analytics': return <Info className="w-4 h-4" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'collection': return 'Data Collection Notice';
      case 'sharing': return 'Data Sharing Notice';
      case 'storage': return 'Data Storage Notice';
      case 'analytics': return 'Analytics Notice';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'collection': return 'bg-garden-green/10 border-garden-green';
      case 'sharing': return 'bg-warning/10 border-warning';
      case 'storage': return 'bg-primary/10 border-primary';
      case 'analytics': return 'bg-surface-accent/10 border-surface-accent';
    }
  };

  return (
    <Card className={`${getColor()} ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1 space-y-2">
            <h4 className="font-primary font-semibold text-text-primary text-sm">
              {getTitle()}
            </h4>
            
            <div className="space-y-1 text-xs font-secondary text-text-secondary">
              <div>
                <strong>Data types:</strong> {dataTypes.join(', ')}
              </div>
              <div>
                <strong>Purpose:</strong> {purpose}
              </div>
              <div>
                <strong>Legal basis:</strong> {legalBasis}
              </div>
              {retentionPeriod && (
                <div>
                  <strong>Retention:</strong> {retentionPeriod}
                </div>
              )}
              {thirdParties && thirdParties.length > 0 && (
                <div>
                  <strong>Shared with:</strong> {thirdParties.join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Pre-configured notices for common scenarios
export const AssessmentDataNotice = () => (
  <DataProcessingNotice
    type="collection"
    dataTypes={["Mental health concerns", "Therapy preferences", "Demographic data"]}
    purpose="Therapist matching and personalized care"
    legalBasis="Consent (Article 6(1)(a)) and Vital Interests (Article 9(2)(c))"
    retentionPeriod="Until account deletion or 7 years (health records)"
  />
);

export const BookingDataNotice = () => (
  <DataProcessingNotice
    type="collection"
    dataTypes={["Appointment details", "Payment information", "Session notes"]}
    purpose="Service delivery and payment processing"
    legalBasis="Contract (Article 6(1)(b))"
    retentionPeriod="7 years (health records)"
    thirdParties={["Stripe (payments)", "Daily.co (video sessions)"]}
  />
);

export const MessagingDataNotice = () => (
  <DataProcessingNotice
    type="storage"
    dataTypes={["Messages", "File attachments", "Communication metadata"]}
    purpose="Secure therapy communication"
    legalBasis="Contract (Article 6(1)(b)) and Vital Interests (Article 9(2)(c))"
    retentionPeriod="7 years (health records)"
    thirdParties={["End-to-end encrypted storage"]}
  />
);

export const AnalyticsDataNotice = () => (
  <DataProcessingNotice
    type="analytics"
    dataTypes={["Usage patterns", "Anonymized interactions", "Performance metrics"]}
    purpose="Service improvement and platform optimization"
    legalBasis="Legitimate Interest (Article 6(1)(f)) with consent"
    retentionPeriod="2 years (anonymized)"
  />
);

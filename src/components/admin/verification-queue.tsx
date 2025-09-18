import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, FileText, User, Calendar, Clock, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TherapistApplication {
  id: string;
  name: string;
  email: string;
  submittedAt: string;
  status: "pending" | "under_review" | "approved" | "rejected";
  licenseNumber: string;
  specialties: string[];
  experience: string;
  documents: {
    license: string;
    insurance: string;
    cv: string;
  };
  backgroundCheck: boolean;
}

// Mock data
const mockApplications: TherapistApplication[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@email.com",
    submittedAt: "2024-01-15T10:30:00Z",
    status: "pending",
    licenseNumber: "LPC-12345",
    specialties: ["Anxiety", "Depression", "PTSD"],
    experience: "8 years",
    documents: {
      license: "license_doc.pdf",
      insurance: "insurance_doc.pdf",
      cv: "cv_doc.pdf"
    },
    backgroundCheck: true
  },
  {
    id: "2", 
    name: "Dr. Michael Chen",
    email: "michael.chen@email.com",
    submittedAt: "2024-01-14T14:20:00Z",
    status: "under_review",
    licenseNumber: "LMFT-67890",
    specialties: ["Couples Therapy", "Family Therapy"],
    experience: "12 years",
    documents: {
      license: "license_doc.pdf",
      insurance: "insurance_doc.pdf", 
      cv: "cv_doc.pdf"
    },
    backgroundCheck: true
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@email.com", 
    submittedAt: "2024-01-13T09:15:00Z",
    status: "pending",
    licenseNumber: "LCSW-11111",
    specialties: ["Trauma", "Addiction", "Mindfulness"],
    experience: "6 years",
    documents: {
      license: "license_doc.pdf",
      insurance: "insurance_doc.pdf",
      cv: "cv_doc.pdf"
    },
    backgroundCheck: false
  }
];

export function VerificationQueue() {
  const [applications, setApplications] = useState<TherapistApplication[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<TherapistApplication | null>(null);
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: "approved" as const } : app
      )
    );
    toast({
      title: "Application Approved",
      description: "Therapist has been approved and notified.",
    });
  };

  const handleReject = (id: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "rejected" as const } : app
      )
    );
    toast({
      title: "Application Rejected", 
      description: "Therapist has been rejected and notified.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: TherapistApplication["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">Pending</Badge>;
      case "under_review":
        return <Badge variant="secondary" className="bg-info text-info-foreground">Under Review</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const pendingApplications = applications.filter(app => app.status === "pending");
  const reviewingApplications = applications.filter(app => app.status === "under_review");
  const processedApplications = applications.filter(app => ["approved", "rejected"].includes(app.status));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-primary text-[hsl(var(--text-2xl))] text-[hsl(var(--text-primary))]">Therapist Verification Queue</h1>
          <p className="font-secondary text-[hsl(var(--text-secondary))]">Review and process therapist applications</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">
            {pendingApplications.length} Pending
          </Badge>
          <Badge variant="secondary" className="bg-info text-info-foreground">
            {reviewingApplications.length} In Review
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3" role="tablist" aria-label="Application status filter tabs">
          <TabsTrigger value="pending" className="flex items-center gap-2 min-h-[--touch-target-min]" aria-label={`View pending applications (${pendingApplications.length} applications)`}>
            <Clock className="h-4 w-4" />
            Pending ({pendingApplications.length})
          </TabsTrigger>
          <TabsTrigger value="reviewing" className="flex items-center gap-2 min-h-[--touch-target-min]" aria-label={`View applications under review (${reviewingApplications.length} applications)`}>
            <Eye className="h-4 w-4" />
            In Review ({reviewingApplications.length})
          </TabsTrigger>
          <TabsTrigger value="processed" className="flex items-center gap-2 min-h-[--touch-target-min]" aria-label={`View processed applications (${processedApplications.length} applications)`}>
            <CheckCircle className="h-4 w-4" />
            Processed ({processedApplications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <ApplicationsList 
            applications={pendingApplications}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewDetails={setSelectedApplication}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="reviewing" className="space-y-4">
          <ApplicationsList
            applications={reviewingApplications}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewDetails={setSelectedApplication}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="processed" className="space-y-4">
          <ApplicationsList
            applications={processedApplications}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewDetails={setSelectedApplication}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
            hideActions={true}
          />
        </TabsContent>
      </Tabs>

      {/* Application Details Dialog */}
      {selectedApplication && (
        <ApplicationDetailsDialog
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          getStatusBadge={getStatusBadge}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}

interface ApplicationsListProps {
  applications: TherapistApplication[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (application: TherapistApplication) => void;
  getStatusBadge: (status: TherapistApplication["status"]) => JSX.Element;
  formatDate: (dateString: string) => string;
  hideActions?: boolean;
}

function ApplicationsList({ 
  applications, 
  onApprove, 
  onReject, 
  onViewDetails, 
  getStatusBadge, 
  formatDate,
  hideActions = false 
}: ApplicationsListProps) {
  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-[hsl(var(--text-secondary))] mb-4" />
            <p className="font-secondary text-[hsl(var(--text-secondary))]">No applications in this category</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table role="table" aria-label="Therapist applications table">
          <TableHeader role="rowgroup">
            <TableRow role="row">
              <TableHead>Therapist</TableHead>
              <TableHead>License</TableHead>
              <TableHead>Specialties</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              {!hideActions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody role="rowgroup">
            {applications.map((application) => (
              <TableRow key={application.id} role="row" aria-label={`Application from ${application.name}, status: ${application.status}`}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[hsl(var(--surface-accent))] flex items-center justify-center">
                      <User className="h-5 w-5 text-[hsl(var(--text-primary))]" />
                    </div>
                    <div>
                      <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))]">{application.name}</h4>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{application.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-secondary text-[hsl(var(--text-primary))]">{application.licenseNumber}</p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {application.specialties.slice(0, 2).map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))]">
                        {specialty}
                      </Badge>
                    ))}
                    {application.specialties.length > 2 && (
                      <Badge variant="secondary" className="bg-[hsl(var(--tag-misc-bg))] text-[hsl(var(--tag-misc-text))]">
                        +{application.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-secondary text-[hsl(var(--text-primary))]">{application.experience}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[hsl(var(--text-secondary))]" />
                    <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                      {formatDate(application.submittedAt)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(application.status)}
                </TableCell>
                {!hideActions && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(application)}
                        className="min-h-[--touch-target-min] min-w-[--touch-target-min]"
                        aria-label={`View details for ${application.name}'s application`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {application.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onApprove(application.id)}
                            className="text-[hsl(var(--success-text))] hover:bg-[hsl(var(--success-bg))] hover:text-[hsl(var(--success-text))] min-h-[--touch-target-min] min-w-[--touch-target-min]"
                            aria-label={`Approve ${application.name}'s application`}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onReject(application.id)}
                            className="text-destructive hover:bg-[hsl(var(--error-bg))] hover:text-[hsl(var(--error-text))] min-h-[--touch-target-min] min-w-[--touch-target-min]"
                            aria-label={`Reject ${application.name}'s application`}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

interface ApplicationDetailsDialogProps {
  application: TherapistApplication;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  getStatusBadge: (status: TherapistApplication["status"]) => JSX.Element;
  formatDate: (dateString: string) => string;
}

function ApplicationDetailsDialog({
  application,
  onClose,
  onApprove,
  onReject,
  getStatusBadge,
  formatDate
}: ApplicationDetailsDialogProps) {
  return (
    <Dialog open={!!application} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-primary text-[hsl(var(--text-primary))]">Application Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="font-primary text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Name</p>
                  <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))]">{application.name}</h4>
                </div>
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Email</p>
                  <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{application.email}</p>
                </div>
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">License Number</p>
                  <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{application.licenseNumber}</p>
                </div>
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Experience</p>
                  <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{application.experience}</p>
                </div>
              </div>
              <div>
                <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-2">Status</p>
                {getStatusBadge(application.status)}
              </div>
              <div>
                <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {application.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))]">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="font-primary text-lg">Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[hsl(var(--text-secondary))]" />
                    <div>
                      <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">Professional License</p>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{application.documents.license}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="min-h-[--touch-target-min]" aria-label={`View ${application.documents.license} document`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[hsl(var(--text-secondary))]" />
                    <div>
                      <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">Insurance Certificate</p>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{application.documents.insurance}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="min-h-[--touch-target-min] min-w-[--touch-target-min] text-[hsl(var(--garden-green))]" aria-label="View insurance certificate document">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[hsl(var(--text-secondary))]" />
                    <div>
                      <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">Curriculum Vitae</p>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{application.documents.cv}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="min-h-[--touch-target-min] min-w-[--touch-target-min] text-[hsl(var(--garden-green))]" aria-label="View curriculum vitae document">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Background Check */}
          <Card>
            <CardHeader>
              <CardTitle className="font-primary text-lg">Background Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {application.backgroundCheck ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-[hsl(var(--success-text))]" />
                    <p className="font-secondary text-[hsl(var(--text-primary))]">Background check completed</p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-destructive" />
                    <p className="font-secondary text-[hsl(var(--text-primary))]">Background check pending</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {application.status === "pending" && (
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  onReject(application.id);
                  onClose();
                }}
                className="text-destructive hover:bg-[hsl(var(--error-bg))] hover:text-[hsl(var(--error-text))] min-h-[--touch-target-min] max-w-[280px]"
                aria-label={`Reject ${application.name}'s application permanently`}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Application
              </Button>
              <Button
                onClick={() => {
                  onApprove(application.id);
                  onClose();
                }}
                className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))] hover:bg-[hsl(var(--success-bg))]/90 min-h-[--touch-target-min] max-w-[280px]"
                aria-label={`Approve ${application.name}'s application and grant access`}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Application
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

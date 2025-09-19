import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Flag, Shield, Eye, Trash2, CheckCircle, XCircle, MessageSquare, User, Calendar, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FlaggedContent {
  id: string;
  type: "profile" | "message" | "review" | "image";
  reportedBy: string;
  reportedUser: string;
  reason: string;
  content: string;
  status: "pending" | "reviewed" | "approved" | "removed";
  severity: "low" | "medium" | "high" | "critical";
  reportedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
}

// Mock data
const mockFlaggedContent: FlaggedContent[] = [
  {
    id: "1",
    type: "message",
    reportedBy: "user123@email.com",
    reportedUser: "therapist456@email.com",
    reason: "Inappropriate language",
    content: "Message content that was flagged for inappropriate language...",
    status: "pending",
    severity: "medium",
    reportedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    type: "profile",
    reportedBy: "user789@email.com",
    reportedUser: "therapist123@email.com",
    reason: "Fake credentials",
    content: "Profile claims false educational background and certifications...",
    status: "pending",
    severity: "high",
    reportedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    type: "review",
    reportedBy: "system",
    reportedUser: "client555@email.com",
    reason: "Spam/fake review",
    content: "Posting multiple fake positive reviews for the same therapist...",
    status: "reviewed",
    severity: "low",
    reportedAt: "2024-01-13T09:15:00Z",
    reviewedBy: "admin@mindfolk.com",
    reviewedAt: "2024-01-13T11:30:00Z",
    notes: "Confirmed fake reviews, user warned"
  },
  {
    id: "4",
    type: "image",
    reportedBy: "user999@email.com",
    reportedUser: "therapist888@email.com",
    reason: "Inappropriate image",
    content: "Profile image contains inappropriate content...",
    status: "pending",
    severity: "critical",
    reportedAt: "2024-01-12T16:45:00Z",
  }
];

export function ModerationTable() {
  const [flaggedContent, setFlaggedContent] = useState<FlaggedContent[]>(mockFlaggedContent);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedContent, setSelectedContent] = useState<FlaggedContent | null>(null);
  const { toast } = useToast();

  const handleApprove = (id: string, notes?: string) => {
    setFlaggedContent(prev => 
      prev.map(item => 
        item.id === id ? { 
          ...item, 
          status: "approved" as const, 
          reviewedBy: "admin@mindfolk.com",
          reviewedAt: new Date().toISOString(),
          notes 
        } : item
      )
    );
    toast({
      title: "Content Approved",
      description: "Content has been approved and is now visible.",
    });
  };

  const handleRemove = (id: string, notes?: string) => {
    setFlaggedContent(prev =>
      prev.map(item =>
        item.id === id ? { 
          ...item, 
          status: "removed" as const,
          reviewedBy: "admin@mindfolk.com", 
          reviewedAt: new Date().toISOString(),
          notes
        } : item
      )
    );
    toast({
      title: "Content Removed",
      description: "Content has been removed from the platform.",
      variant: "destructive",
    });
  };

  const handleBulkAction = (action: "approve" | "remove") => {
    const actionText: FlaggedContent["status"] = action === "approve" ? "approved" : "removed";
    setFlaggedContent(prev =>
      prev.map(item =>
        selectedItems.includes(item.id) ? {
          ...item,
          status: actionText,
          reviewedBy: "admin@mindfolk.com",
          reviewedAt: new Date().toISOString(),
        } : item
      )
    );
    setSelectedItems([]);
    toast({
      title: `Bulk ${action} completed`,
      description: `${selectedItems.length} items have been ${actionText}.`,
    });
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    const pendingItems = flaggedContent.filter(item => item.status === "pending").map(item => item.id);
    setSelectedItems(prev =>
      prev.length === pendingItems.length ? [] : pendingItems
    );
  };

  const getSeverityBadge = (severity: FlaggedContent["severity"]) => {
    switch (severity) {
      case "low":
        return <Badge variant="secondary" className="bg-[hsl(var(--success-bg))]/20 text-[hsl(var(--success-text))]">Low</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))]/20 text-[hsl(var(--warning-text))]">Medium</Badge>;
      case "high":
        return <Badge variant="secondary" className="bg-error/20 text-error-foreground">High</Badge>;
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
    }
  };

  const getStatusBadge = (status: FlaggedContent["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">Pending</Badge>;
      case "reviewed":
        return <Badge variant="secondary" className="bg-info text-info-foreground">Reviewed</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]">Approved</Badge>;
      case "removed":
        return <Badge variant="destructive">Removed</Badge>;
    }
  };

  const getTypeIcon = (type: FlaggedContent["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "profile":
        return <User className="h-4 w-4" />;
      case "review":
        return <MessageSquare className="h-4 w-4" />;
      case "image":
        return <Eye className="h-4 w-4" />;
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

  const pendingContent = flaggedContent.filter(item => item.status === "pending");
  const reviewedContent = flaggedContent.filter(item => item.status !== "pending");

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Container>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-primary text-2xl text-[hsl(var(--text-primary))]">Content Moderation</h2>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Review and manage flagged content</p>
            </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">
            {pendingContent.length} Pending Review
          </Badge>
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Selected ({selectedItems.length})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-primary">Approve Selected Content?</AlertDialogTitle>
                    <AlertDialogDescription className="font-secondary">
                      This will approve {selectedItems.length} flagged items and make them visible to users.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleBulkAction("approve")}>
                      Approve All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-[hsl(var(--error-text))] hover:bg-[hsl(var(--error-bg))] hover:text-[hsl(var(--error-text))]">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Selected ({selectedItems.length})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-primary">Remove Selected Content?</AlertDialogTitle>
                    <AlertDialogDescription className="font-secondary">
                      This will permanently remove {selectedItems.length} flagged items from the platform. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleBulkAction("remove")} className="bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))] hover:bg-[hsl(var(--error-bg))]/90">
                      Remove All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Pending Review ({pendingContent.length})
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Reviewed ({reviewedContent.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <ModerationTableView
            content={pendingContent}
            selectedItems={selectedItems}
            onToggleItem={toggleItemSelection}
            onToggleAll={toggleAllSelection}
            onApprove={handleApprove}
            onRemove={handleRemove}
            onViewDetails={setSelectedContent}
            getSeverityBadge={getSeverityBadge}
            getStatusBadge={getStatusBadge}
            getTypeIcon={getTypeIcon}
            formatDate={formatDate}
            showActions={true}
            showSelection={true}
          />
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-4">
          <ModerationTableView
            content={reviewedContent}
            selectedItems={[]}
            onToggleItem={() => {}}
            onToggleAll={() => {}}
            onApprove={handleApprove}
            onRemove={handleRemove}
            onViewDetails={setSelectedContent}
            getSeverityBadge={getSeverityBadge}
            getStatusBadge={getStatusBadge}
            getTypeIcon={getTypeIcon}
            formatDate={formatDate}
            showActions={false}
            showSelection={false}
          />
        </TabsContent>
      </Tabs>

      {/* Content Details Dialog */}
      {selectedContent && (
        <ContentDetailsDialog
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
          onApprove={handleApprove}
          onRemove={handleRemove}
          getSeverityBadge={getSeverityBadge}
          getStatusBadge={getStatusBadge}
          getTypeIcon={getTypeIcon}
          formatDate={formatDate}
        />
      )}
        </div>
      </Container>
    </div>
  );
}

interface ModerationTableViewProps {
  content: FlaggedContent[];
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  onToggleAll: () => void;
  onApprove: (id: string, notes?: string) => void;
  onRemove: (id: string, notes?: string) => void;
  onViewDetails: (content: FlaggedContent) => void;
  getSeverityBadge: (severity: FlaggedContent["severity"]) => JSX.Element;
  getStatusBadge: (status: FlaggedContent["status"]) => JSX.Element;
  getTypeIcon: (type: FlaggedContent["type"]) => JSX.Element;
  formatDate: (dateString: string) => string;
  showActions: boolean;
  showSelection: boolean;
}

function ModerationTableView({
  content,
  selectedItems,
  onToggleItem,
  onToggleAll,
  onApprove,
  onRemove,
  onViewDetails,
  getSeverityBadge,
  getStatusBadge,
  getTypeIcon,
  formatDate,
  showActions,
  showSelection
}: ModerationTableViewProps) {
  if (content.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-[hsl(var(--text-secondary))] mb-4" />
            <p className="font-secondary text-[hsl(var(--text-secondary))]">No content in this category</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {showSelection && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === content.length && content.length > 0}
                    onCheckedChange={onToggleAll}
                  />
                </TableHead>
              )}
              <TableHead>Type</TableHead>
              <TableHead>Reported User</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reported</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.map((item) => (
              <TableRow key={item.id}>
                {showSelection && (
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => onToggleItem(item.id)}
                    />
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <span className="font-secondary capitalize text-[hsl(var(--text-primary))]">{item.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-secondary text-[hsl(var(--text-primary))]">{item.reportedUser}</p>
                  <p className="font-secondary text-xs text-[hsl(var(--text-secondary))]">by {item.reportedBy}</p>
                </TableCell>
                <TableCell>
                  <p className="font-secondary text-[hsl(var(--text-primary))]">{item.reason}</p>
                </TableCell>
                <TableCell>
                  {getSeverityBadge(item.severity)}
                </TableCell>
                <TableCell>
                  {getStatusBadge(item.status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[hsl(var(--text-secondary))]" />
                    <span className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                      {formatDate(item.reportedAt)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {showActions && item.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onApprove(item.id)}
                          className="text-[hsl(var(--success-text))] hover:bg-[hsl(var(--success-bg))] hover:text-[hsl(var(--success-text))]"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onRemove(item.id)}
                          className="text-[hsl(var(--error-text))] hover:bg-[hsl(var(--error-bg))] hover:text-[hsl(var(--error-text))]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

interface ContentDetailsDialogProps {
  content: FlaggedContent;
  onClose: () => void;
  onApprove: (id: string, notes?: string) => void;
  onRemove: (id: string, notes?: string) => void;
  getSeverityBadge: (severity: FlaggedContent["severity"]) => JSX.Element;
  getStatusBadge: (status: FlaggedContent["status"]) => JSX.Element;
  getTypeIcon: (type: FlaggedContent["type"]) => JSX.Element;
  formatDate: (dateString: string) => string;
}

function ContentDetailsDialog({
  content,
  onClose,
  onApprove,
  onRemove,
  getSeverityBadge,
  getStatusBadge,
  getTypeIcon,
  formatDate
}: ContentDetailsDialogProps) {
  const [moderationNotes, setModerationNotes] = useState("");
  const [moderationAction, setModerationAction] = useState<"approve" | "remove" | null>(null);

  const handleSubmitDecision = () => {
    if (moderationAction === "approve") {
      onApprove(content.id, moderationNotes);
    } else if (moderationAction === "remove") {
      onRemove(content.id, moderationNotes);
    }
    onClose();
  };

  return (
    <Dialog open={!!content} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-primary flex items-center gap-2">
            {getTypeIcon(content.type)}
            Flagged Content Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="font-primary text-lg">Report Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Content Type</p>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(content.type)}
                    <p className="font-secondary font-medium text-[hsl(var(--text-primary))] capitalize">{content.type}</p>
                  </div>
                </div>
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Reported User</p>
                  <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{content.reportedUser}</p>
                </div>
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Reported By</p>
                  <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{content.reportedBy}</p>
                </div>
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Report Date</p>
                  <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{formatDate(content.reportedAt)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-2">Severity</p>
                  {getSeverityBadge(content.severity)}
                </div>
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-2">Status</p>
                  {getStatusBadge(content.status)}
                </div>
              </div>
              <div>
                <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-2">Reason</p>
                <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{content.reason}</p>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle className="font-primary text-lg">Flagged Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--surface-accent))]">
                <p className="font-secondary text-[hsl(var(--text-primary))]">{content.content}</p>
              </div>
            </CardContent>
          </Card>

          {/* Review History */}
          {content.reviewedBy && (
            <Card>
              <CardHeader>
                <CardTitle className="font-primary text-lg">Review History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Reviewed By</p>
                    <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{content.reviewedBy}</p>
                  </div>
                  <div>
                    <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Review Date</p>
                    <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">
                      {content.reviewedAt ? formatDate(content.reviewedAt) : "N/A"}
                    </p>
                  </div>
                </div>
                {content.notes && (
                  <div>
                    <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-2">Notes</p>
                    <p className="font-secondary text-[hsl(var(--text-primary))]">{content.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Moderation Actions */}
          {content.status === "pending" && (
            <Card>
              <CardHeader>
                <CardTitle className="font-primary text-lg">Moderation Decision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-2">Decision</p>
                  <Select value={moderationAction || ""} onValueChange={(value) => setModerationAction(value as "approve" | "remove")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select moderation action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approve">Approve Content</SelectItem>
                      <SelectItem value="remove">Remove Content</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-2">Notes (Optional)</p>
                  <Textarea
                    placeholder="Add notes about your moderation decision..."
                    value={moderationNotes}
                    onChange={(e) => setModerationNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmitDecision}
                    disabled={!moderationAction}
                    className={moderationAction === "remove" 
                      ? "bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))] hover:bg-[hsl(var(--error-bg))]/90"
                      : "bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))] hover:bg-[hsl(var(--success-bg))]/90"
                    }
                  >
                    {moderationAction === "approve" && <CheckCircle className="h-4 w-4 mr-2" />}
                    {moderationAction === "remove" && <Trash2 className="h-4 w-4 mr-2" />}
                    Submit Decision
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

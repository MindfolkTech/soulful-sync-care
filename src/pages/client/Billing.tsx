import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentForm } from "@/components/payment/payment-form";
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Receipt, 
  Download, 
  AlertTriangle,
  CheckCircle2,
  Settings,
  Plus,
  Clock
} from "lucide-react";

export default function Billing() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  // Mock subscription data
  const subscription = {
    plan: "Premium Therapy Plan",
    status: "active",
    nextBilling: "2024-02-15",
    amount: 149.99,
    interval: "monthly",
    sessionsIncluded: 4,
    sessionsUsed: 2,
    addOnSessions: 1
  };

  // Mock payment methods
  const paymentMethods = [
    {
      id: "1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true
    },
    {
      id: "2", 
      type: "card",
      brand: "mastercard",
      last4: "8888",
      expiry: "08/25",
      isDefault: false
    }
  ];

  // Mock billing history
  const billingHistory = [
    {
      id: "inv_001",
      date: "2024-01-15",
      description: "Premium Therapy Plan - January 2024",
      amount: 149.99,
      status: "paid",
      invoice: "INV-2024-001"
    },
    {
      id: "inv_002",
      date: "2024-01-10", 
      description: "Additional Session",
      amount: 45.00,
      status: "paid",
      invoice: "INV-2024-002"
    },
    {
      id: "inv_003",
      date: "2023-12-15",
      description: "Premium Therapy Plan - December 2023", 
      amount: 149.99,
      status: "paid",
      invoice: "INV-2023-042"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "secondary";
      case "paid": return "secondary";
      case "pending": return "default";
      case "failed": return "destructive";
      case "canceled": return "outline";
      default: return "secondary";
    }
  };

  const getBrandIcon = (brand: string) => {
    return <CreditCard className="h-4 w-4" />; // In real app, use actual brand icons
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Billing & Payments</h1>
          <p className="text-muted-foreground">
            Manage your subscription, payments, and billing information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Current Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{subscription.plan}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${subscription.amount}/{subscription.interval}
                    </p>
                  </div>
                  <Badge variant={getStatusColor(subscription.status)}>
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {subscription.sessionsUsed + subscription.addOnSessions}
                    </div>
                    <p className="text-xs text-muted-foreground">Sessions This Month</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {subscription.sessionsIncluded - subscription.sessionsUsed}
                    </div>
                    <p className="text-xs text-muted-foreground">Sessions Remaining</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Next billing date</span>
                  </div>
                  <span className="text-sm">{subscription.nextBilling}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Plan
                  </Button>
                  <Button variant="outline" size="sm">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Billing History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="all">All Transactions</TabsTrigger>
                    <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                    <TabsTrigger value="sessions">Additional Sessions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-3">
                    {billingHistory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Receipt className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.description}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {item.date}
                              <span>•</span>
                              <span>{item.invoice}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold">${item.amount}</div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusColor(item.status)} className="text-xs">
                              {item.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="subscriptions">
                    {/* Filtered subscription transactions */}
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Subscription billing history will appear here
                    </p>
                  </TabsContent>

                  <TabsContent value="sessions">
                    {/* Filtered session transactions */}
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Additional session charges will appear here
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Methods
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => setShowPaymentForm(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Method
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                        {getBrandIcon(method.brand)}
                      </div>
                      <div>
                        <div className="font-medium">
                          •••• •••• •••• {method.last4}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Expires {method.expiry}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {method.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Book Additional Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Update Billing Info
                </Button>
              </CardContent>
            </Card>

            {/* Usage Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Month's Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Included Sessions</span>
                    <span>{subscription.sessionsUsed}/{subscription.sessionsIncluded}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ 
                        width: `${(subscription.sessionsUsed / subscription.sessionsIncluded) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {subscription.addOnSessions > 0 && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-900 dark:text-yellow-100">
                        Additional Sessions
                      </span>
                    </div>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                      You've used {subscription.addOnSessions} additional sessions this month
                    </p>
                  </div>
                )}

                <div className="text-center pt-3 border-t">
                  <div className="text-2xl font-bold">${subscription.amount}</div>
                  <p className="text-sm text-muted-foreground">Current monthly cost</p>
                </div>
              </CardContent>
            </Card>

            {/* Next Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Upcoming Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold">${subscription.amount}</div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Due {subscription.nextBilling}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    Auto-pay enabled
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Form Modal/Sheet would go here */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Add Payment Method</h3>
              <PaymentForm onClose={() => setShowPaymentForm(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
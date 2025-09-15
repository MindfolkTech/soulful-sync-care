import { Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TherapistNav } from "@/components/layout/therapist-nav";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  Banknote,
  CreditCard,
  ArrowUp,
  ArrowDown,
  ArrowLeft
} from "lucide-react";

export default function TherapistEarnings() {
  const earningsData = {
    currentWeek: 640,
    lastWeek: 520,
    thisMonth: 2560,
    lastMonth: 2100,
    totalEarned: 12800,
    pendingPayout: 320,
    nextPayout: "2024-01-15"
  };

  const recentTransactions = [
    {
      id: "1",
      date: "2024-01-08",
      amount: 120,
      type: "Session Payment",
      status: "completed",
      client: "J.D."
    },
    {
      id: "2", 
      date: "2024-01-07",
      amount: 80,
      type: "Chemistry Call",
      status: "completed",
      client: "M.S."
    },
    {
      id: "3",
      date: "2024-01-06",
      amount: 120,
      type: "Session Payment",
      status: "pending",
      client: "A.R."
    },
    {
      id: "4",
      date: "2024-01-05",
      amount: 80,
      type: "Chemistry Call",
      status: "completed",
      client: "L.K."
    }
  ];

  const payoutMethods = [
    {
      id: "1",
      type: "Bank Transfer",
      icon: Banknote,
      isDefault: true,
      lastUsed: "2024-01-08"
    },
    {
      id: "2",
      type: "PayPal",
      icon: CreditCard,
      isDefault: false,
      lastUsed: "2023-12-15"
    }
  ];

  const weeklyChange = ((earningsData.currentWeek - earningsData.lastWeek) / earningsData.lastWeek) * 100;
  const monthlyChange = ((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100;

  return (
    <div className="min-h-screen bg-warm-white flex flex-col">
      <Header />
      <TherapistNav />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <Button asChild variant="outline" size="sm" className="hover:bg-surface-accent">
                    <Link to="/t/dashboard">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Dashboard
                    </Link>
                  </Button>
                </div>
                <h1 className="font-crimson text-3xl font-bold text-jovial-jade">
                  Earnings Dashboard
                </h1>
                <p className="font-helvetica text-text-secondary mt-2">
                  Track your income and manage payouts
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-surface-accent transition-colors duration-200"
                >
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Export Report
                </Button>
                <Button 
                  size="sm"
                  className="bg-garden-green hover:bg-elated-emerald text-white transition-colors duration-200"
                >
                  Request Payout
                </Button>
              </div>
            </div>

            {/* Earnings Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-helvetica text-text-secondary text-sm">This Week</p>
                      <p className="font-crimson text-3xl font-bold text-jovial-jade mt-1">£{earningsData.currentWeek}</p>
                      <p className={`font-helvetica text-xs flex items-center mt-2 ${weeklyChange >= 0 ? 'text-success-bg' : 'text-error-bg'}`}>
                        {weeklyChange >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                        {Math.abs(weeklyChange).toFixed(1)}% from last week
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-surface-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <DollarSign className="w-7 h-7 text-garden-green" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-helvetica text-text-secondary text-sm">This Month</p>
                      <p className="font-crimson text-3xl font-bold text-jovial-jade mt-1">£{earningsData.thisMonth}</p>
                      <p className={`font-helvetica text-xs flex items-center mt-2 ${monthlyChange >= 0 ? 'text-success-bg' : 'text-error-bg'}`}>
                        {monthlyChange >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                        {Math.abs(monthlyChange).toFixed(1)}% from last month
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-surface-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <TrendingUp className="w-7 h-7 text-garden-green" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-helvetica text-text-secondary text-sm">Pending Payout</p>
                      <p className="font-crimson text-3xl font-bold text-jovial-jade mt-1">£{earningsData.pendingPayout}</p>
                      <p className="font-helvetica text-text-secondary text-xs mt-2">
                        Next payout: {new Date(earningsData.nextPayout).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-surface-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Clock className="w-7 h-7 text-garden-green" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-helvetica text-text-secondary text-sm">Total Earned</p>
                      <p className="font-crimson text-3xl font-bold text-jovial-jade mt-1">£{earningsData.totalEarned}</p>
                      <p className="font-helvetica text-text-secondary text-xs mt-2">
                        All time earnings
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-surface-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Banknote className="w-7 h-7 text-garden-green" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Transactions */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-crimson text-xl text-jovial-jade">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-surface-accent rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.status === 'completed' ? 'bg-success-bg' : 'bg-warning-bg'
                          }`}>
                            {transaction.status === 'completed' ? (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : (
                              <Clock className="w-5 h-5 text-warning-text" />
                            )}
                          </div>
                          <div>
                            <p className="font-crimson font-semibold text-jovial-jade">{transaction.type}</p>
                            <p className="font-helvetica text-text-secondary text-sm">
                              {transaction.client} • {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-crimson font-bold text-jovial-jade">£{transaction.amount}</p>
                          <Badge 
                            variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                            className={transaction.status === 'completed' ? 'bg-success-bg text-success-text' : 'bg-warning-bg text-warning-text'}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Payout Methods */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-crimson text-xl text-jovial-jade">Payout Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {payoutMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 bg-surface-accent rounded-lg">
                        <div className="flex items-center gap-3">
                          <method.icon className="w-6 h-6 text-garden-green" />
                          <div>
                            <p className="font-crimson font-semibold text-jovial-jade">{method.type}</p>
                            <p className="font-helvetica text-text-secondary text-sm">
                              Last used: {new Date(method.lastUsed).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {method.isDefault && (
                          <Badge className="bg-garden-green text-white">Default</Badge>
                        )}
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 hover:bg-surface-accent transition-colors duration-200"
                    >
                      Add Payment Method
                    </Button>
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

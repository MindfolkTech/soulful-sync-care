import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, List, BarChart2 } from "lucide-react";

// Placeholder components for tab content
const OverviewView = () => (
    <Card>
        <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
        </CardHeader>
        <CardContent>
            <p>A summary of earnings, payouts, and financial metrics will be displayed here.</p>
        </CardContent>
    </Card>
);

const TransactionsView = () => (
    <Card>
        <CardHeader>
            <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
            <p>A detailed list of all transactions will be displayed here.</p>
        </CardContent>
    </Card>
);

const AnalyticsView = () => (
    <Card>
        <CardHeader>
            <CardTitle>Business Analytics</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Charts and data related to profile performance and business analytics will be here.</p>
        </CardContent>
    </Card>
);


export default function TherapistEarnings() {
  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
            <div className="space-y-4">
                <h1 className="font-primary text-3xl">Earnings & Analytics</h1>
                <p className="text-muted-foreground">Track your income and business performance.</p>
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview"><Eye className="w-4 h-4 mr-2" /> Overview</TabsTrigger>
                        <TabsTrigger value="transactions"><List className="w-4 h-4 mr-2" /> Transactions</TabsTrigger>
                        <TabsTrigger value="analytics"><BarChart2 className="w-4 h-4 mr-2" /> Analytics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                        <OverviewView />
                    </TabsContent>
                    <TabsContent value="transactions" className="mt-4">
                        <TransactionsView />
                    </TabsContent>
                    <TabsContent value="analytics" className="mt-4">
                        <AnalyticsView />
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}

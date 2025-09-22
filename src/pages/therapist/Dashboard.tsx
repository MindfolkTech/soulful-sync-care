import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { OnboardingChecklist } from "@/components/therapist/setup/OnboardingChecklist";
import { 
    Calendar, 
    Users, 
    CheckSquare, 
    DollarSign,
    ArrowRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Mock Data
const upcomingAppointments = [
    { id: 1, clientName: 'Eleanor Vance', time: '10:00 AM', duration: '50 min', type: 'Video Session' },
    { id: 2, clientName: 'Marcus Holloway', time: '11:00 AM', duration: '50 min', type: 'Video Session' },
];

const recentClients = [
    { id: 1, name: 'Ava Moreno', initials: 'AM', lastContact: '2 days ago' },
    { id: 2, clientName: 'Liam Chen', initials: 'LC', lastContact: '4 days ago' },
];

const tasks = [
    { id: 1, text: 'Review notes for Eleanor Vance', completed: false },
    { id: 2, text: 'Follow up with Liam Chen', completed: false },
    { id: 3, text: 'Prepare invoice for Ava Moreno', completed: true },
];

const earningsSummary = {
    monthToDate: '£2,450.00',
    nextPayout: '£850.00',
    payoutDate: 'Oct 5, 2023',
};

const WelcomeHeader = () => {
    const { user } = useAuth();
    // In a real app, you'd fetch the therapist's name from your DB
    const therapistName = user?.user_metadata?.first_name || 'Therapist';
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))]">Welcome Back, {therapistName}!</h1>
            <p className="font-secondary text-[hsl(var(--text-secondary))]">Here's a summary of your practice today.</p>
        </div>
    );
};

const UpcomingAppointments = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5" /> Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
            {upcomingAppointments.map(appt => (
                <div key={appt.id} className="flex items-center justify-between mb-2 pb-2 border-b last:border-b-0">
                    <div>
                        <p className="font-semibold">{appt.clientName}</p>
                        <p className="text-sm text-muted-foreground">{appt.time} - {appt.duration}</p>
                    </div>
                    <Button size="sm">Join Now</Button>
                </div>
            ))}
        </CardContent>
    </Card>
);

const RecentClients = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Recent Clients</CardTitle>
        </CardHeader>
        <CardContent>
            {recentClients.map(client => (
                <div key={client.id} className="flex items-center gap-3 mb-2 pb-2 border-b last:border-b-0">
                    <Avatar>
                        <AvatarFallback>{client.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{client.name}</p>
                        <p className="text-sm text-muted-foreground">Last contact: {client.lastContact}</p>
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
);

const TaskHub = () => (
     <Card>
        <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5" /> Task Hub
                </div>
                <Link to="/t/schedule" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                    View All <ArrowRight className="w-4 h-4"/>
                </Link>
            </CardTitle>
        </CardHeader>
        <CardContent>
            {tasks.map(task => (
                <div key={task.id} className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked={task.completed} className="form-checkbox h-5 w-5 rounded text-primary border-muted-foreground focus:ring-primary"/>
                    <span className={task.completed ? 'line-through text-muted-foreground' : ''}>{task.text}</span>
                </div>
            ))}
        </CardContent>
    </Card>
);

const EarningsSummary = () => (
    <Card>
        <CardHeader>
             <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" /> Earnings
                </div>
                <Link to="/t/earnings" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                    View Details <ArrowRight className="w-4 h-4"/>
                </Link>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <div>
                <p className="text-sm text-muted-foreground">Month-to-date</p>
                <p className="text-2xl font-bold">{earningsSummary.monthToDate}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Next Payout ({earningsSummary.payoutDate})</p>
                <p className="text-lg font-semibold">{earningsSummary.nextPayout}</p>
            </div>
        </CardContent>
    </Card>
);


export default function TherapistDashboard() {
  return (
    <>
      <OnboardingChecklist />
      <TherapistLayout>
        <WelcomeHeader />
        <div className="p-4 md:p-6 lg:p-8 pt-0">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                    <UpcomingAppointments />
                </div>
                <TaskHub />
                <RecentClients />
                <div className="lg:col-span-2">
                    <EarningsSummary />
                </div>
            </div>
          </Container>
        </div>
      </TherapistLayout>
    </>
  );
}

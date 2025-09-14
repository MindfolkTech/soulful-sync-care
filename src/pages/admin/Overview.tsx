import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Calendar, DollarSign } from "lucide-react";

export default function AdminOverview() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <h1 className="font-primary text-3xl font-bold text-text-primary mb-8">Admin Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-secondary text-text-secondary text-sm">Total Users</p>
                    <p className="font-primary text-2xl font-bold text-text-primary">1,247</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-secondary text-text-secondary text-sm">Active Therapists</p>
                    <p className="font-primary text-2xl font-bold text-text-primary">89</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-secondary text-text-secondary text-sm">Sessions Today</p>
                    <p className="font-primary text-2xl font-bold text-text-primary">156</p>
                  </div>
                  <Calendar className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-secondary text-text-secondary text-sm">Revenue</p>
                    <p className="font-primary text-2xl font-bold text-text-primary">£12.4K</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-info" />
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
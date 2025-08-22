import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { auth } from '@/lib/auth';
import connectMongoDB from '@/lib/mongoose';
import DailyData from '@/models/DailyData';
import Target from '@/models/Target';
import {
  CalendarDays,
  IndianRupee,
  Mail,
  Target as TargetIcon,
  TrendingUp,
  Users,
} from 'lucide-react';

export default async function OfficeDashboard() {
  const session = await auth();
  await connectMongoDB();

  // Fetch today's data
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayData = await DailyData.findOne({
    userId: session.user.id,
    date: today,
  });

  // Fetch current year targets
  const currentYear = new Date().getFullYear();
  const financialYear = `${currentYear}-${currentYear + 1}`;

  const targets = await Target.findOne({
    officeId: session.user.officeId,
    financialYear,
  });

  // Calculate achievements (this would be more complex in real app)
  const achievements = {
    accountOpen: todayData?.totalAccountOpened || 0,
    collectionAmount: todayData?.collectionAmount || 0,
    philately: todayData?.philatelyCount || 0,
    insurance: todayData?.generalInsurancePolicy || 0,
  };

  const stats = [
    {
      title: "Today's Accounts",
      value: achievements.accountOpen,
      target: targets?.accountOpen || 100,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Collection Amount',
      value: achievements.collectionAmount,
      target: targets?.bookingArticleAmount || 50000,
      icon: IndianRupee,
      color: 'text-green-600',
    },
    {
      title: 'Insurance Policies',
      value: achievements.insurance,
      target: 20,
      icon: TargetIcon,
      color: 'text-purple-600',
    },
    {
      title: 'Philately Count',
      value: achievements.philately,
      target: targets?.philatelyTarget || 50,
      icon: Mail,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user.email}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="mt-2">
                <Progress
                  value={(stat.value / stat.target) * 100}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.value} of {stat.target} target
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Today's Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayData?.isSubmitted ? (
              <div className="text-center py-4">
                <div className="text-green-600 font-medium">
                  ✓ Data Submitted Successfully
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Submitted at {todayData.submittedAt?.toLocaleTimeString()}
                </p>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-orange-600 font-medium">
                  ⚠ Pending Data Entry
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Please submit today's data before midnight
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-md text-blue-700 transition-colors">
                Submit Daily Data
              </button>
              <button className="p-2 text-sm bg-green-50 hover:bg-green-100 rounded-md text-green-700 transition-colors">
                View Reports
              </button>
              <button className="p-2 text-sm bg-purple-50 hover:bg-purple-100 rounded-md text-purple-700 transition-colors">
                Check Targets
              </button>
              <button className="p-2 text-sm bg-orange-50 hover:bg-orange-100 rounded-md text-orange-700 transition-colors">
                Mazdoor Bill
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

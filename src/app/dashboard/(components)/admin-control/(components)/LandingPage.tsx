'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const stats = [
  { label: 'Total Teams', value: 12 },
  { label: 'Total Projects', value: 34 },
  { label: 'Running Projects', value: 8 },
];

const recentActivities = [
  {
    user: 'Alice Johnson',
    action: 'created a new project',
    time: '5 minutes ago',
  },
  {
    user: 'Mark Smith',
    action: 'updated Team Alpha',
    time: '30 minutes ago',
  },
  {
    user: 'Nina Patel',
    action: 'archived Project Orion',
    time: '1 hour ago',
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 mx-7 mt-3">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between border rounded-lg p-4 bg-muted">
              <div>
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
              </div>
              <Badge variant="secondary">{activity.time}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

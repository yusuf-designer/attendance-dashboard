import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Search,
  Users,
} from 'lucide-react';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const attendanceStats = [
  { label: 'Present today', value: '132', change: '+8.4%', icon: Users, tone: 'emerald' },
  { label: 'On-time rate', value: '94.6%', change: '+2.1%', icon: Clock3, tone: 'sky' },
  { label: 'Late arrivals', value: '11', change: '-3.7%', icon: AlertCircle, tone: 'amber' },
  { label: 'Avg. hours', value: '7.8h', change: '+0.8h', icon: Activity, tone: 'violet' },
];

const attendanceTrend = [
  { day: 'Mon', present: 82, target: 74 },
  { day: 'Tue', present: 88, target: 78 },
  { day: 'Wed', present: 76, target: 80 },
  { day: 'Thu', present: 91, target: 82 },
  { day: 'Fri', present: 94, target: 84 },
  { day: 'Sat', present: 64, target: 60 },
];

const attendanceBreakdown = [
  { name: 'Present', value: 68, color: '#34d399' },
  { name: 'Absence', value: 18, color: '#fca5a5' },
  { name: 'Late', value: 9, color: '#fbbf24' },
  { name: 'Remote', value: 5, color: '#60a5fa' },
];

const teamMembers = [
  { name: 'Adele Morgan', department: 'Product Design', status: 'Present', checkIn: '08:55 AM', hours: '8.2h', progress: 96 },
  { name: 'Daniel Brooks', department: 'Engineering', status: 'Late', checkIn: '09:23 AM', hours: '7.4h', progress: 82 },
  { name: 'Priya Shah', department: 'Operations', status: 'Remote', checkIn: '09:00 AM', hours: '8.0h', progress: 91 },
  { name: 'Marcus Lee', department: 'Sales', status: 'Absent', checkIn: '—', hours: '0.0h', progress: 0 },
  { name: 'Sofia Nguyen', department: 'Support', status: 'Present', checkIn: '08:48 AM', hours: '8.6h', progress: 98 },
];

const schedule = [
  { time: '09:00', event: 'Team stand-up', count: '18/20' },
  { time: '11:00', event: 'Client review', count: '12/14' },
  { time: '13:30', event: 'Workshop', count: '28/30' },
  { time: '15:15', event: 'Sprint retro', count: '16/18' },
];

const statusStyles: Record<string, string> = {
  Present: 'bg-emerald-100 text-emerald-700',
  Late: 'bg-amber-100 text-amber-700',
  Remote: 'bg-sky-100 text-sky-700',
  Absent: 'bg-rose-100 text-rose-700',
};

export function AttendanceDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Workspace</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Attendance Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search staff"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white sm:w-52"
              />
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100">
              <Bell className="h-4 w-4" />
            </button>
            <Button className="gap-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800">
              <CalendarClock className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {attendanceStats.map((stat) => {
            const Icon = stat.icon;
            const toneClasses =
              stat.tone === 'emerald'
                ? 'bg-emerald-100 text-emerald-700'
                : stat.tone === 'sky'
                  ? 'bg-sky-100 text-sky-700'
                  : stat.tone === 'amber'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-violet-100 text-violet-700';

            return (
              <Card key={stat.label} className="overflow-hidden border-slate-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{stat.value}</h2>
                    </div>
                    <div className={`rounded-xl p-2.5 ${toneClasses}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 font-medium text-emerald-700">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {stat.change}
                    </span>
                    <span className="text-slate-500">vs last week</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Attendance trend</CardTitle>
                <CardDescription>Weekly attendance vs team target</CardDescription>
              </div>
              <Badge variant="success" className="gap-1 rounded-full">
                <CheckCircle2 className="h-3.5 w-3.5" />
                96% engaged
              </Badge>
            </CardHeader>
            <CardContent className="h-[300px] p-0 px-6 pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceTrend} barGap={10}>
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}
                  />
                  <Bar dataKey="present" radius={[8, 8, 0, 0]} fill="#14b8a6" />
                  <Bar dataKey="target" radius={[8, 8, 0, 0]} fill="#dbeafe" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Attendance split</CardTitle>
              <CardDescription>Current breakdown by status</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={attendanceBreakdown} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={3}>
                      {attendanceBreakdown.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 grid w-full gap-2">
                {attendanceBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </div>
                    <span className="font-medium text-slate-800">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.75fr_1fr]">
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team attendance</CardTitle>
                <CardDescription>Live status for this week</CardDescription>
              </div>
              <Button variant="outline" className="rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                View all
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.name}>
                      <TableCell className="font-medium text-slate-800">{member.name}</TableCell>
                      <TableCell className="text-slate-600">{member.department}</TableCell>
                      <TableCell>
                        <Badge className={`rounded-full ${statusStyles[member.status]}`} variant="secondary">
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">{member.checkIn}</TableCell>
                      <TableCell className="font-medium text-slate-800">{member.hours}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${member.status === 'Absent' ? 'bg-rose-400' : member.status === 'Late' ? 'bg-amber-400' : member.status === 'Remote' ? 'bg-sky-400' : 'bg-emerald-500'}`}
                              style={{ width: `${member.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-500">{member.progress}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-slate-200 bg-slate-900 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Today’s focus</CardTitle>
                  <div className="rounded-xl bg-white/10 p-2 text-sky-300">
                    <BriefcaseBusiness className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-300">Attendance health</p>
                  <h3 className="mt-2 text-4xl font-bold">91.4%</h3>
                </div>
                <div className="space-y-3 text-sm text-slate-200">
                  <div className="flex items-center justify-between">
                    <span>Present</span>
                    <span className="font-medium text-white">118</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Late</span>
                    <span className="font-medium text-white">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Remote</span>
                    <span className="font-medium text-white">15</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Upcoming sessions</CardTitle>
                <CardDescription>Coverage by time slot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedule.map((item) => (
                  <div key={item.time} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{item.time}</p>
                      <p className="mt-1 font-medium text-slate-800">{item.event}</p>
                    </div>
                    <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">{item.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Shield, Activity, Lock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SecurityPage() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      lastActive: "2023-05-10 14:30",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Manager",
      lastActive: "2023-05-10 12:15",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      initials: "SJ",
    },
    {
      id: 3,
      name: "Mike Brown",
      email: "mike.b@example.com",
      role: "Staff",
      lastActive: "2023-05-09 16:45",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      initials: "MB",
    },
    {
      id: 4,
      name: "Lisa Wong",
      email: "lisa.w@example.com",
      role: "Staff",
      lastActive: "2023-05-08 09:30",
      status: "Inactive",
      avatar: "/placeholder-user.jpg",
      initials: "LW",
    },
    {
      id: 5,
      name: "David Miller",
      email: "david.m@example.com",
      role: "Manager",
      lastActive: "2023-05-10 10:00",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      initials: "DM",
    },
  ]

  const recentActivity = [
    { id: 1, user: "John Doe", action: "User login", timestamp: "2023-05-10 14:30:25", ip: "192.168.1.1" },
    {
      id: 2,
      user: "Sarah Johnson",
      action: "Updated inventory count",
      timestamp: "2023-05-10 12:15:10",
      ip: "192.168.1.5",
    },
    { id: 3, user: "Admin", action: "System backup", timestamp: "2023-05-10 00:00:00", ip: "192.168.1.10" },
    {
      id: 4,
      user: "Mike Brown",
      action: "Created purchase order",
      timestamp: "2023-05-09 16:45:32",
      ip: "192.168.1.8",
    },
    {
      id: 5,
      user: "David Miller",
      action: "Modified user permissions",
      timestamp: "2023-05-09 10:12:45",
      ip: "192.168.1.15",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>
      case "Inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Security Dashboard" description="Manage users, permissions and system security" />

      <div className="p-4 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Out of 30 total users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Level</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">High</div>
              <p className="text-xs text-muted-foreground">All systems secure</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Activity</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Actions today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Today</div>
              <p className="text-xs text-muted-foreground">00:00 UTC</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage system users and permissions</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search users..." className="w-full pl-8" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>System and user activity log</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.user}</TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{activity.timestamp}</TableCell>
                      <TableCell>{activity.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

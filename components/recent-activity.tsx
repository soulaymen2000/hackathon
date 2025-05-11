import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "purchase",
      description: "New purchase order #PO-2023-056 created",
      timestamp: "2 hours ago",
      user: { name: "John Doe", avatar: "/placeholder-user.jpg", initials: "JD" },
    },
    {
      id: 2,
      type: "sale",
      description: "Order #SO-2023-189 shipped to customer",
      timestamp: "4 hours ago",
      user: { name: "Sarah Johnson", avatar: "/placeholder-user.jpg", initials: "SJ" },
    },
    {
      id: 3,
      type: "stock",
      description: "Inventory count adjusted for SKU: OM-1234",
      timestamp: "Yesterday",
      user: { name: "Mike Brown", avatar: "/placeholder-user.jpg", initials: "MB" },
    },
    {
      id: 4,
      type: "security",
      description: "New user account created for warehouse staff",
      timestamp: "2 days ago",
      user: { name: "Admin User", avatar: "/placeholder-user.jpg", initials: "AU" },
    },
    {
      id: 5,
      type: "purchase",
      description: "Purchase order #PO-2023-055 received",
      timestamp: "3 days ago",
      user: { name: "John Doe", avatar: "/placeholder-user.jpg", initials: "JD" },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across all departments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 border-b pb-4">
              <Avatar>
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.description}</p>
                <p className="text-sm text-muted-foreground">
                  By {activity.user.name} · {activity.timestamp}
                </p>
              </div>
              <Badge type={activity.type} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function Badge({ type }: { type: string }) {
  const getTypeStyles = () => {
    switch (type) {
      case "purchase":
        return "bg-blue-100 text-blue-800"
      case "sale":
        return "bg-green-100 text-green-800"
      case "stock":
        return "bg-amber-100 text-amber-800"
      case "security":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getTypeStyles()}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  )
}

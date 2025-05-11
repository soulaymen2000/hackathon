import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingDown } from "lucide-react"

export function PredictionAlerts() {
  const expiringProducts = [
    { id: 1, name: "Organic Milk", sku: "OM-1234", expiresIn: 5, category: "Dairy" },
    { id: 2, name: "Fresh Bread", sku: "FB-5678", expiresIn: 2, category: "Bakery" },
    { id: 3, name: "Chicken Breast", sku: "CB-9012", expiresIn: 3, category: "Meat" },
    { id: 4, name: "Yogurt", sku: "YG-3456", expiresIn: 7, category: "Dairy" },
  ]

  const decliningProducts = [
    { id: 1, name: "Winter Jackets", sku: "WJ-7890", trend: -15, category: "Apparel" },
    { id: 2, name: "Desk Lamps", sku: "DL-1234", trend: -23, category: "Home Goods" },
    { id: 3, name: "Fitness Trackers", sku: "FT-5678", trend: -18, category: "Electronics" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex-1">
            <CardTitle>Expiring Products</CardTitle>
            <CardDescription>Products expiring soon</CardDescription>
          </div>
          <AlertCircle className="h-5 w-5 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expiringProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={product.expiresIn <= 3 ? "destructive" : "outline"}>{product.expiresIn} days</Badge>
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex-1">
            <CardTitle>Declining Demand</CardTitle>
            <CardDescription>Products with decreasing sales</CardDescription>
          </div>
          <TrendingDown className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {decliningProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">{product.trend}%</Badge>
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

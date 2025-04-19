"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, BarChart, LineChart } from "@/components/ui/chart"
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-gray-500">Welcome back to your WareFlow dashboard.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-blue-100">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <h3 className="text-2xl font-bold">248</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-pink-100">
                <ShoppingCart className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Orders</p>
                <h3 className="text-2xl font-bold">42</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-orange-100">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <h3 className="text-2xl font-bold">$12,580</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Customers</p>
                <h3 className="text-2xl font-bold">156</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AreaChart
                  data={[
                    { name: "Jan", total: 4500 },
                    { name: "Feb", total: 6200 },
                    { name: "Mar", total: 7800 },
                    { name: "Apr", total: 5400 },
                    { name: "May", total: 9200 },
                    { name: "Jun", total: 8100 },
                    { name: "Jul", total: 10500 },
                    { name: "Aug", total: 11200 },
                    { name: "Sep", total: 9600 },
                    { name: "Oct", total: 12580 },
                    { name: "Nov", total: 0 },
                    { name: "Dec", total: 0 },
                  ]}
                  categories={["total"]}
                  index="name"
                  colors={["#ff006e"]}
                  valueFormatter={(value) => `$${value.toLocaleString()}`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: "Electronics", value: 85 },
                    { name: "Clothing", value: 42 },
                    { name: "Home Goods", value: 36 },
                    { name: "Toys", value: 25 },
                    { name: "Books", value: 60 },
                  ]}
                  index="name"
                  categories={["value"]}
                  colors={["#fb5607"]}
                  valueFormatter={(value) => `${value} items`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Trends</CardTitle>
              <CardDescription>Stock levels over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChart
                data={[
                  { name: "May", Electronics: 120, Clothing: 85, "Home Goods": 65 },
                  { name: "Jun", Electronics: 140, Clothing: 75, "Home Goods": 80 },
                  { name: "Jul", Electronics: 110, Clothing: 95, "Home Goods": 70 },
                  { name: "Aug", Electronics: 90, Clothing: 115, "Home Goods": 75 },
                  { name: "Sep", Electronics: 105, Clothing: 90, "Home Goods": 85 },
                  { name: "Oct", Electronics: 85, Clothing: 42, "Home Goods": 36 },
                ]}
                index="name"
                categories={["Electronics", "Clothing", "Home Goods"]}
                colors={["#3a86ff", "#ff006e", "#fb5607"]}
                valueFormatter={(value) => `${value} units`}
                className="aspect-[4/3]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Distribution of orders by status</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={[
                  { name: "Pending", value: 12 },
                  { name: "Processing", value: 18 },
                  { name: "Shipped", value: 8 },
                  { name: "Delivered", value: 4 },
                ]}
                index="name"
                categories={["value"]}
                colors={["#8338ec"]}
                valueFormatter={(value) => `${value} orders`}
                className="aspect-[4/3]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

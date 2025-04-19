"use client"

import { useState } from "react"
import { ArrowUpDown, Calendar, Check, Clock, Eye, MoreHorizontal, Package, Search, Truck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for orders
const initialOrders = [
  {
    id: "ORD-2024-001",
    customer: "John Smith",
    date: "2024-10-15",
    total: 129.99,
    status: "Pending",
    items: [
      { id: "INV001", name: "Wireless Headphones", quantity: 1, price: 89.99 },
      { id: "INV004", name: "Desk Lamp", quantity: 1, price: 40.0 },
    ],
    address: "123 Main St, Anytown, CA 12345",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
  },
  {
    id: "ORD-2024-002",
    customer: "Sarah Johnson",
    date: "2024-10-14",
    total: 199.99,
    status: "Processing",
    items: [{ id: "INV003", name: "Smart Watch", quantity: 1, price: 199.99 }],
    address: "456 Oak Ave, Somewhere, NY 67890",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
  },
  {
    id: "ORD-2024-003",
    customer: "Michael Brown",
    date: "2024-10-12",
    total: 149.97,
    status: "Shipped",
    items: [{ id: "INV006", name: "Denim Jeans", quantity: 3, price: 49.99 }],
    address: "789 Pine Rd, Elsewhere, TX 54321",
    email: "mbrown@example.com",
    phone: "(555) 456-7890",
  },
  {
    id: "ORD-2024-004",
    customer: "Emily Davis",
    date: "2024-10-10",
    total: 259.98,
    status: "Delivered",
    items: [{ id: "INV007", name: "Coffee Maker", quantity: 2, price: 129.99 }],
    address: "321 Cedar Ln, Nowhere, FL 13579",
    email: "emily.d@example.com",
    phone: "(555) 234-5678",
  },
  {
    id: "ORD-2024-005",
    customer: "David Wilson",
    date: "2024-10-09",
    total: 59.97,
    status: "Cancelled",
    items: [{ id: "INV002", name: "Cotton T-Shirt", quantity: 3, price: 19.99 }],
    address: "654 Birch St, Anywhere, WA 97531",
    email: "dwilson@example.com",
    phone: "(555) 876-5432",
  },
  {
    id: "ORD-2024-006",
    customer: "Jessica Martinez",
    date: "2024-10-08",
    total: 169.98,
    status: "Processing",
    items: [
      { id: "INV001", name: "Wireless Headphones", quantity: 1, price: 89.99 },
      { id: "INV002", name: "Cotton T-Shirt", quantity: 4, price: 19.99 },
    ],
    address: "987 Maple Dr, Someplace, IL 24680",
    email: "jmartinez@example.com",
    phone: "(555) 345-6789",
  },
  {
    id: "ORD-2024-007",
    customer: "Robert Taylor",
    date: "2024-10-07",
    total: 399.98,
    status: "Pending",
    items: [{ id: "INV003", name: "Smart Watch", quantity: 2, price: 199.99 }],
    address: "246 Elm Ct, Otherplace, GA 86420",
    email: "rtaylor@example.com",
    phone: "(555) 654-3210",
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Filter orders based on search term and active tab
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && order.status.toLowerCase() === activeTab.toLowerCase()
  })

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "Processing":
        return <Package className="h-4 w-4" />
      case "Shipped":
        return <Truck className="h-4 w-4" />
      case "Delivered":
        return <Check className="h-4 w-4" />
      case "Cancelled":
        return <X className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-gray-500">Manage customer orders</p>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">
                        <div className="flex items-center gap-1">
                          Order ID
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          Date
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Total
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No orders found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              {formatDate(order.date)}
                            </div>
                          </TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {order.status}
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault()
                                        setSelectedOrder(order)
                                      }}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl">
                                    <DialogHeader>
                                      <DialogTitle>Order Details</DialogTitle>
                                      <DialogDescription>Complete information about the order.</DialogDescription>
                                    </DialogHeader>
                                    {selectedOrder && (
                                      <div className="grid gap-6">
                                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                                          <div>
                                            <h3 className="text-lg font-semibold">{selectedOrder.id}</h3>
                                            <p className="text-sm text-gray-500">
                                              Placed on {formatDate(selectedOrder.date)}
                                            </p>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Badge className={getStatusColor(selectedOrder.status)}>
                                              <span className="flex items-center gap-1">
                                                {getStatusIcon(selectedOrder.status)}
                                                {selectedOrder.status}
                                              </span>
                                            </Badge>
                                            <Select
                                              defaultValue={selectedOrder.status}
                                              onValueChange={(value) => handleUpdateStatus(selectedOrder.id, value)}
                                            >
                                              <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Update status" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Processing">Processing</SelectItem>
                                                <SelectItem value="Shipped">Shipped</SelectItem>
                                                <SelectItem value="Delivered">Delivered</SelectItem>
                                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                          <div>
                                            <h4 className="text-sm font-medium mb-2">Customer Information</h4>
                                            <div className="space-y-1">
                                              <p className="font-medium">{selectedOrder.customer}</p>
                                              <p className="text-sm">{selectedOrder.email}</p>
                                              <p className="text-sm">{selectedOrder.phone}</p>
                                            </div>
                                          </div>
                                          <div>
                                            <h4 className="text-sm font-medium mb-2">Shipping Address</h4>
                                            <p className="text-sm whitespace-pre-line">{selectedOrder.address}</p>
                                          </div>
                                        </div>

                                        <div>
                                          <h4 className="text-sm font-medium mb-2">Order Items</h4>
                                          <div className="rounded-md border">
                                            <Table>
                                              <TableHeader>
                                                <TableRow>
                                                  <TableHead>Product</TableHead>
                                                  <TableHead className="text-right">Quantity</TableHead>
                                                  <TableHead className="text-right">Price</TableHead>
                                                  <TableHead className="text-right">Total</TableHead>
                                                </TableRow>
                                              </TableHeader>
                                              <TableBody>
                                                {selectedOrder.items.map((item) => (
                                                  <TableRow key={item.id}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                                    <TableCell className="text-right">
                                                      ${item.price.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                      ${(item.quantity * item.price).toFixed(2)}
                                                    </TableCell>
                                                  </TableRow>
                                                ))}
                                                <TableRow>
                                                  <TableCell colSpan={3} className="text-right font-medium">
                                                    Total
                                                  </TableCell>
                                                  <TableCell className="text-right font-bold">
                                                    ${selectedOrder.total.toFixed(2)}
                                                  </TableCell>
                                                </TableRow>
                                              </TableBody>
                                            </Table>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    <DialogClose asChild>
                                      <Button className="mt-4">Close</Button>
                                    </DialogClose>
                                  </DialogContent>
                                </Dialog>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(
                                      order.id,
                                      order.status === "Pending"
                                        ? "Processing"
                                        : order.status === "Processing"
                                          ? "Shipped"
                                          : order.status === "Shipped"
                                            ? "Delivered"
                                            : order.status,
                                    )
                                  }
                                  disabled={order.status === "Delivered" || order.status === "Cancelled"}
                                >
                                  <Truck className="mr-2 h-4 w-4" />
                                  Update Status
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleUpdateStatus(order.id, "Cancelled")}
                                  disabled={order.status === "Delivered" || order.status === "Cancelled"}
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Cancel Order
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

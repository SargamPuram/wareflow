"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Plus, Search, Trash, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for inventory items
const initialInventory = [
  {
    id: "INV001",
    name: "Wireless Headphones",
    category: "Electronics",
    quantity: 45,
    price: 89.99,
    supplier: "TechGear Inc.",
    status: "In Stock",
  },
  {
    id: "INV002",
    name: "Cotton T-Shirt",
    category: "Clothing",
    quantity: 120,
    price: 19.99,
    supplier: "FashionHub",
    status: "In Stock",
  },
  {
    id: "INV003",
    name: "Smart Watch",
    category: "Electronics",
    quantity: 18,
    price: 199.99,
    supplier: "TechGear Inc.",
    status: "Low Stock",
  },
  {
    id: "INV004",
    name: "Desk Lamp",
    category: "Home Goods",
    quantity: 32,
    price: 45.5,
    supplier: "HomeEssentials",
    status: "In Stock",
  },
  {
    id: "INV005",
    name: "Bluetooth Speaker",
    category: "Electronics",
    quantity: 0,
    price: 79.99,
    supplier: "SoundWave",
    status: "Out of Stock",
  },
  {
    id: "INV006",
    name: "Denim Jeans",
    category: "Clothing",
    quantity: 85,
    price: 49.99,
    supplier: "FashionHub",
    status: "In Stock",
  },
  {
    id: "INV007",
    name: "Coffee Maker",
    category: "Home Goods",
    quantity: 12,
    price: 129.99,
    supplier: "HomeEssentials",
    status: "Low Stock",
  },
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: 0,
    price: 0,
    supplier: "",
  })

  // Filter inventory based on search term
  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddItem = () => {
    const id = `INV${String(inventory.length + 1).padStart(3, "0")}`
    const status = newItem.quantity === 0 ? "Out of Stock" : newItem.quantity < 20 ? "Low Stock" : "In Stock"

    setInventory([
      ...inventory,
      {
        id,
        ...newItem,
        status,
      },
    ])

    setNewItem({
      name: "",
      category: "",
      quantity: 0,
      price: 0,
      supplier: "",
    })

    setIsAddDialogOpen(false)
  }

  const handleEditItem = () => {
    if (!currentItem) return

    const status = currentItem.quantity === 0 ? "Out of Stock" : currentItem.quantity < 20 ? "Low Stock" : "In Stock"

    setInventory(inventory.map((item) => (item.id === currentItem.id ? { ...currentItem, status } : item)))

    setIsEditDialogOpen(false)
  }

  const handleDeleteItem = (id: string) => {
    setInventory(inventory.filter((item) => item.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800"
      case "Out of Stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-pink-600 hover:bg-pink-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Enter the details of the new product to add to inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Home Goods">Home Goods</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select onValueChange={(value) => setNewItem({ ...newItem, supplier: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TechGear Inc.">TechGear Inc.</SelectItem>
                    <SelectItem value="FashionHub">FashionHub</SelectItem>
                    <SelectItem value="HomeEssentials">HomeEssentials</SelectItem>
                    <SelectItem value="SoundWave">SoundWave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleAddItem}>
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Products</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Product Name
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Quantity</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Price
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Supplier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell className="hidden lg:table-cell">{item.supplier}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
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
                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    setCurrentItem(item)
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Product</DialogTitle>
                                  <DialogDescription>Update the details of the selected product.</DialogDescription>
                                </DialogHeader>
                                {currentItem && (
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-name">Product Name</Label>
                                      <Input
                                        id="edit-name"
                                        value={currentItem.name}
                                        onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-category">Category</Label>
                                      <Select
                                        defaultValue={currentItem.category}
                                        onValueChange={(value) => setCurrentItem({ ...currentItem, category: value })}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Electronics">Electronics</SelectItem>
                                          <SelectItem value="Clothing">Clothing</SelectItem>
                                          <SelectItem value="Home Goods">Home Goods</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-quantity">Quantity</Label>
                                        <Input
                                          id="edit-quantity"
                                          type="number"
                                          value={currentItem.quantity}
                                          onChange={(e) =>
                                            setCurrentItem({ ...currentItem, quantity: Number(e.target.value) })
                                          }
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-price">Price ($)</Label>
                                        <Input
                                          id="edit-price"
                                          type="number"
                                          step="0.01"
                                          value={currentItem.price}
                                          onChange={(e) =>
                                            setCurrentItem({ ...currentItem, price: Number(e.target.value) })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-supplier">Supplier</Label>
                                      <Select
                                        defaultValue={currentItem.supplier}
                                        onValueChange={(value) => setCurrentItem({ ...currentItem, supplier: value })}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="TechGear Inc.">TechGear Inc.</SelectItem>
                                          <SelectItem value="FashionHub">FashionHub</SelectItem>
                                          <SelectItem value="HomeEssentials">HomeEssentials</SelectItem>
                                          <SelectItem value="SoundWave">SoundWave</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleEditItem}>
                                    Save Changes
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteItem(item.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
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
    </div>
  )
}

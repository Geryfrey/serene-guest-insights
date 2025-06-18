import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockHotels, mockUsers } from "@/services/mockData";
import { Hotel, User, UserRole } from "@/types";
import { Edit, Plus, Trash } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DialogMode = "add" | "edit" | null;

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users");
  
  // User management state
  const [userDialogMode, setUserDialogMode] = useState<DialogMode>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "hotel_manager",
    hotelId: undefined,
  });
  
  // Hotel management state
  const [hotelDialogMode, setHotelDialogMode] = useState<DialogMode>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [newHotel, setNewHotel] = useState<Partial<Hotel>>({
    name: "",
    location: "",
    managerId: "",
  });
  
  // Handle user dialog
  const openUserDialog = (mode: DialogMode, user?: User) => {
    setUserDialogMode(mode);
    if (mode === "edit" && user) {
      setSelectedUser(user);
      setNewUser({
        name: user.name,
        email: user.email,
        role: user.role,
        hotelId: user.hotelId,
      });
    } else if (mode === "add") {
      setSelectedUser(null);
      setNewUser({
        name: "",
        email: "",
        role: "hotel_manager",
        hotelId: undefined,
      });
    }
  };
  
  const closeUserDialog = () => {
    setUserDialogMode(null);
    setSelectedUser(null);
    setNewUser({
      name: "",
      email: "",
      role: "hotel_manager",
      hotelId: undefined,
    });
  };
  
  const handleSaveUser = () => {
    // In a real app, this would save to a database
    console.log("Saving user:", userDialogMode === "edit" ? { ...selectedUser, ...newUser } : newUser);
    closeUserDialog();
  };
  
  // Handle hotel dialog
  const openHotelDialog = (mode: DialogMode, hotel?: Hotel) => {
    setHotelDialogMode(mode);
    if (mode === "edit" && hotel) {
      setSelectedHotel(hotel);
      setNewHotel({
        name: hotel.name,
        location: hotel.location,
        managerId: hotel.managerId,
      });
    } else if (mode === "add") {
      setSelectedHotel(null);
      setNewHotel({
        name: "",
        location: "",
        managerId: "",
      });
    }
  };
  
  const closeHotelDialog = () => {
    setHotelDialogMode(null);
    setSelectedHotel(null);
    setNewHotel({
      name: "",
      location: "",
      managerId: "",
    });
  };
  
  const handleSaveHotel = () => {
    // In a real app, this would save to a database
    console.log("Saving hotel:", hotelDialogMode === "edit" ? { ...selectedHotel, ...newHotel } : newHotel);
    closeHotelDialog();
  };
  
  // Get available managers for hotel assignment
  const availableManagers = mockUsers.filter(user => 
    user.role === "hotel_manager" && 
    (user.hotelId === undefined || user.hotelId === newHotel.managerId || (selectedHotel && user.hotelId === selectedHotel.id))
  );
  
  return (
    <>
      <Header />
      <PageLayout className="p-4 md:p-6 max-w-screen-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-serif">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage users, hotels, and system settings
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between">
              <h2 className="text-xl font-serif">User Management</h2>
              <Button onClick={() => openUserDialog("add")}>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Hotel</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className="capitalize">{user.role}</span>
                        </TableCell>
                        <TableCell>
                          {user.hotelId
                            ? mockHotels.find((h) => h.id === user.hotelId)?.name || "-"
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openUserDialog("edit", user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hotels" className="space-y-6">
            <div className="flex justify-between">
              <h2 className="text-xl font-serif">Hotel Management</h2>
              <Button onClick={() => openHotelDialog("add")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Hotel
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHotels.map((hotel) => (
                      <TableRow key={hotel.id}>
                        <TableCell className="font-medium">{hotel.name}</TableCell>
                        <TableCell>{hotel.location}</TableCell>
                        <TableCell>
                          {mockUsers.find((u) => u.id === hotel.managerId)?.name || "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openHotelDialog("edit", hotel)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-6">
            <h2 className="text-xl font-serif">System Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Integration</CardTitle>
                  <CardDescription>
                    Configure third-party API integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="google-api">Google Reviews API Key</Label>
                    <Input id="google-api" type="password" value="●●●●●●●●●●●●●●●●" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twilio-api">Twilio API Key</Label>
                    <Input id="twilio-api" type="password" value="●●●●●●●●●●●●●●●●" />
                  </div>
                  <Button className="w-full">Save API Settings</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>ML Model Settings</CardTitle>
                  <CardDescription>
                    Configure machine learning model parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sentiment-threshold">Sentiment Confidence Threshold</Label>
                    <Input id="sentiment-threshold" type="number" min="0" max="1" step="0.01" value="0.6" />
                    <p className="text-xs text-muted-foreground">
                      Minimum confidence score for sentiment classification (0-1)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic-threshold">Topic Detection Threshold</Label>
                    <Input id="topic-threshold" type="number" min="0" max="1" step="0.01" value="0.3" />
                    <p className="text-xs text-muted-foreground">
                      Minimum confidence score for topic detection (0-1)
                    </p>
                  </div>
                  <Button className="w-full">Update ML Settings</Button>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>
                    Monitor system performance and usage statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl font-semibold">98.7%</div>
                      <div className="text-sm text-muted-foreground">System Uptime</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl font-semibold">542</div>
                      <div className="text-sm text-muted-foreground">Feedback Processed (Last 24h)</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-2xl font-semibold">345ms</div>
                      <div className="text-sm text-muted-foreground">Avg. Response Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </PageLayout>
      
      {/* User Dialog */}
      <Dialog open={userDialogMode !== null} onOpenChange={(open) => !open && closeUserDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {userDialogMode === "add" ? "Add New User" : "Edit User"}
            </DialogTitle>
            <DialogDescription>
              {userDialogMode === "add"
                ? "Create a new user account"
                : "Update user information"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({ ...newUser, role: value as UserRole })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel_manager">Hotel Manager</SelectItem>
                  <SelectItem value="service_manager">Service Manager</SelectItem>
                  <SelectItem value="food_manager">Food Manager</SelectItem>
                  <SelectItem value="facilities_manager">Facilities Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newUser.role === "hotel_manager" && (
              <div className="space-y-2">
                <Label htmlFor="hotel">Assigned Hotel</Label>
                <Select
                  value={newUser.hotelId}
                  onValueChange={(value) => setNewUser({ ...newUser, hotelId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hotel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {mockHotels.map((hotel) => (
                      <SelectItem key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={closeUserDialog}>
              Cancel
            </Button>
            <Button onClick={handleSaveUser}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Hotel Dialog */}
      <Dialog open={hotelDialogMode !== null} onOpenChange={(open) => !open && closeHotelDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {hotelDialogMode === "add" ? "Add New Hotel" : "Edit Hotel"}
            </DialogTitle>
            <DialogDescription>
              {hotelDialogMode === "add"
                ? "Create a new hotel property"
                : "Update hotel information"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="hotel-name">Hotel Name</Label>
              <Input
                id="hotel-name"
                value={newHotel.name}
                onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newHotel.location}
                onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="manager">Hotel Manager</Label>
              <Select
                value={newHotel.managerId}
                onValueChange={(value) => setNewHotel({ ...newHotel, managerId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {availableManagers.map((manager) => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={closeHotelDialog}>
              Cancel
            </Button>
            <Button onClick={handleSaveHotel}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

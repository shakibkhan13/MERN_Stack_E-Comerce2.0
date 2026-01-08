/* eslint-disable react-hooks/exhaustive-deps */
import type { User } from "@/lib/type";
import { useEffect, useState } from "react";
import { Edit, Trash, Plus, Users, Search, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import UserSkeleton from "@/skeletons/UserSkeleton";
import ImageUpload from "@/components/ui/image.upload";
import { useUserHandler } from "@/hooks/users.handlers.js";

const UsersPage = () => {

  const [userToDelete] = useState<User | null>(null);


  const {
    fetchUsers,
    loading,
    refreshing,
    handleRefresh,
    isAdmin,
    total,

    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    filteredUsers,

    isModalOpen,
    setIsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,

    formAdd,
    formEdit,
    formLoading,
    handleAddUser,
    handleUpdateUser,

    selectedUser,
    handleEdit,
    handleView,
    handleDeleteUser,
    isDeleteModalOpen, 
    setIsDeleteModalOpen, 
    setIsAddUserModal, 
    isAddUserModal, 
    confirmDeleteUser, 
  } = useUserHandler();

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "deliveryman":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <UserSkeleton isAdmin={isAdmin} />;

  return (
    <div className="p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-gray-600">View and manage all system users</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">{total}</span>
          </div>

          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>

          {isAdmin && (
            <Button onClick={() => setIsAddUserModal(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="deliveryman">Delivery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow >
            <TableHead className="text-center py-3">Avatar</TableHead>
            <TableHead className="text-left py-3">Name</TableHead>
            <TableHead className="text-left py-3">Email</TableHead>
            <TableHead className="text-center py-3">Role</TableHead>
            <TableHead className="text-center py-3">Created</TableHead>
            <TableHead className="text-center py-3">Actions</TableHead>
          </TableRow>
        </TableHeader>


        <TableBody>
          {filteredUsers.map((user: User) => (
            <TableRow key={user._id} className="hover:bg-gray-50">
              <TableCell className="text-center py-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <span className="text-lg font-semibold">{user.name[0]}</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-left py-2">{user.name}</TableCell>
              <TableCell className="text-left py-2">{user.email}</TableCell>
              <TableCell className="text-center py-2">
                <Badge className={cn(getRoleColor(user.role))}>{user.role}</Badge>
              </TableCell>
              <TableCell className="text-center py-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center py-2 flex items-center justify-center gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleView(user)}>
                  <Eye className="h-4 w-4" />
                </Button>
                {isAdmin && (
                  <>
                    <Button size="icon" variant="ghost" className="text-blue-600" onClick={() => handleEdit(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-600" onClick={() => handleDeleteUser(user)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {userToDelete?.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser}>
              Delete
            </AlertDialogAction>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      {/* View User Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View complete user information</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-2xl">{selectedUser.name[0]}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <Badge className={cn(getRoleColor(selectedUser.role))}>
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-600">User ID</Label>
                <p>{selectedUser._id}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-600">Created At</Label>
                <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <Form {...formEdit}>
            <form
              onSubmit={formEdit.handleSubmit(handleUpdateUser)}
              className="space-y-4 mt-2"
            >
              <FormField
                control={formEdit.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={formLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formEdit.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} disabled={formLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formEdit.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={formLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="deliveryman">Delivery Man</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formEdit.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        disabled={formLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={formLoading}>
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add User Modal */}
      <Dialog open={isAddUserModal} onOpenChange={setIsAddUserModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new system user</DialogDescription>
          </DialogHeader>

          <Form {...formAdd}>
            <form
              onSubmit={formAdd.handleSubmit(handleAddUser)}
              className="space-y-4 mt-2"
            >
              <FormField
                control={formAdd.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={formLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formAdd.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} disabled={formLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formAdd.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} disabled={formLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formAdd.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={formLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="deliveryman">Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formAdd.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        disabled={formLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={formLoading}>
                  Add User
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>


    </div>
  );
};

export default UsersPage;

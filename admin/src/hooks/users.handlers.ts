import { User } from "@/lib/type";
import { useState } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";
import useAuthStore from "@/store/useAuthStore";
import z from "zod";
import { userSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

type FormData = z.infer<typeof userSchema>;

export const useUserHandler = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddUserModal, setIsAddUserModal] = useState(false); 

  const axiosPrivate = useAxiosPrivate();
  const { checkIsAdmin } = useAuthStore();
  const isAdmin = checkIsAdmin();

  const formAdd = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      avatar: "",
    },
  });

  const formEdit = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      avatar: "",
    },
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosPrivate.get("/users");
      if (res?.data) {
        setUsers(res.data.users);
        setTotal(res.data.users.length);
      }
    } catch (error) {
      console.error(error);
      toast.error("Users load failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await axiosPrivate.get("/users");
      if (res?.data) {
        setUsers(res.data.users);
        setTotal(res.data.users.length);
      }
    } catch (error) {
      console.error("User refreshing failed.", error);
      toast.error("User refreshing failed");
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddUser = async (data: FormData) => {
   setFormLoading(true);
   try {
     await axiosPrivate.post("/users", data); // call API
     toast.success("User created successfully!");
     formAdd.reset(); // reset form
     setIsAddUserModal(false); // close modal
     fetchUsers(); // refresh users list
   } catch (error) {
     console.error("User creation failed", error);
     toast.error("User creation failed");
   } finally {
     setFormLoading(false);
   }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    formEdit.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
    };
    
    const confirmDeleteUser = async () => {
      if (!selectedUser) return;

      try {
        await axiosPrivate.delete(`/users/${selectedUser._id}`);
        toast.success("User deleted successfully!");
        setIsDeleteModalOpen(false);
        fetchUsers(); // refresh the users list
      } catch (error) {
        console.error("User delete failed", error);
        toast.error("User delete failed");
      }
    };

  const handleUpdateUser = async (data: FormData) => {
    if (!selectedUser) return;
    setFormLoading(true);

    try {
      await axiosPrivate.put(`/users/${selectedUser._id}`, data);
      toast.success("User updated successfully");
      setIsEditModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("User update failed", error);
      toast.error("User update failed");
    } finally {
      setFormLoading(false);
    }
  };

  const handleUserDelete = async () => {
    if (!selectedUser) return;

    try {
      await axiosPrivate.delete(`/users/${selectedUser._id}`);
      toast.success("User deleted successfully");
      setIsDeleteModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("User delete failed", error);
      toast.error("User delete failed");
    }
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchSearch && matchesRole;
  });

  return {
    formAdd,
    formEdit,
    fetchUsers,
    handleRefresh,
    handleAddUser,
    handleEdit,
    handleDeleteUser,
    handleUpdateUser,
    handleUserDelete,
    handleView,
    filteredUsers,
    loading,
    refreshing,
    isEditModalOpen,
    isModalOpen,
    formLoading,
    total,
    page,
    setPage,
    totalPages,
    setTotal,
    setSearchTerm,
    setRoleFilter,
    perPage,
    setTotalPages,
    setIsEditModalOpen,
    isAdmin,
    searchTerm,
    roleFilter,
    setIsModalOpen,
    selectedUser,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isAddUserModal,
    setIsAddUserModal,
    confirmDeleteUser,
  };
};

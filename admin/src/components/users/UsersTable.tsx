import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { User } from "@/lib/type";
import UserActions from "./UserActions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getRoleColor } from "./roleUtils";
import UserAvatar from "./UsersAvatar";

type Props = {
    users: User[];
    isAdmin: boolean;
    onView: (u: User) => void;
    onEdit: (u: User) => void;
    onDelete: (u: User) => void;
};

export default function UsersTable({
    users,
    isAdmin,
    onView,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead>Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>
                                <UserAvatar name={user.name} avatar={user.avatar} />
                            </TableCell>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Badge className={cn(getRoleColor(user.role))}>
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {new Date(user.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <UserActions
                                    user={user}
                                    isAdmin={isAdmin}
                                    onView={() => onView(user)}
                                    onEdit={() => onEdit(user)}
                                    onDelete={() => onDelete(user)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    search: string;
    role: string;
    onSearchChange: (v: string) => void;
    onRoleChange: (v: string) => void;
};

export default function UsersFilters({
    search,
    role,
    onSearchChange,
    onRoleChange,
}: Props) {
    return (
        <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-64"
                />
            </div>

            <Select value={role} onValueChange={onRoleChange}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="deliveryman">Delivery Person</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

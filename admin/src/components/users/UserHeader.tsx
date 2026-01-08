import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Users } from "lucide-react";

type Props = {
    total: number;
    isAdmin: boolean;
    refreshing: boolean;
    onRefresh: () => void;
    onAdd: () => void;
};

export default function UsersHeader({
    total,
    isAdmin,
    refreshing,
    onRefresh,
    onAdd,
}: Props) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Users Management</h1>
                <p className="text-gray-600">View and manage all system users</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Users className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">{total}</span>
                </div>

                <Button
                    variant="outline"
                    onClick={onRefresh}
                    disabled={refreshing}
                    className="border-blue-600 text-blue-600"
                >
                    <RefreshCw
                        className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                    />
                    Refresh
                </Button>

                {isAdmin && (
                    <Button onClick={onAdd} className="bg-blue-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                )}
            </div>
        </div>
    );
}

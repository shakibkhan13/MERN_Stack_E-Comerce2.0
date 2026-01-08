import type { User } from "@/lib/type";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getRoleColor } from "./roleUtils";
import { cn } from "@/lib/utils";

type Props = {
    open: boolean;
    user: User | null;
    onClose: () => void;
};

export default function UserViewDialog({ open, user, onClose }: Props) {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <UserAvatar name={user.name} avatar={user.avatar} size="lg" />

                    <div>
                        <p className="font-semibold text-xl">{user.name}</p>
                        <p className="text-gray-600">{user.email}</p>
                        <Badge className={cn("mt-2", getRoleColor(user.role))}>
                            {user.role}
                        </Badge>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">User ID</p>
                        <p className="break-all">{user._id}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

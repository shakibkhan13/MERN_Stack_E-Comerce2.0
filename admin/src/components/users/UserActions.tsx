import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash } from "lucide-react";
import type { User } from "@/lib/type";

type Props = {
    user: User;
    isAdmin: boolean;
    onView: (u: User) => void;
    onEdit: (u: User) => void;
    onDelete: (u: User) => void;
};

export default function UserActions({
    user,
    isAdmin,
    onView,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onView(user)}>
                <Eye className="h-4 w-4" />
            </Button>

            {isAdmin && (
                <>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
                        <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600"
                        onClick={() => onDelete(user)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </>
            )}
        </div>
    );
}

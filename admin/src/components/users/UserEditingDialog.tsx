import type { User } from "@/lib/type";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
    open: boolean;
    user: User | null;
    onClose: () => void;
    onSave: (data: Partial<User>) => void;
};

export default function UserEditDialog({
    open,
    user,
    onClose,
    onSave,
}: Props) {
    const [name, setName] = useState(user?.name ?? "");

    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>

                <Input value={name} onChange={(e) => setName(e.target.value)} />

                <Button
                    className="mt-4"
                    onClick={() => onSave({ name })}
                >
                    Save Changes
                </Button>
            </DialogContent>
        </Dialog>
    );
}

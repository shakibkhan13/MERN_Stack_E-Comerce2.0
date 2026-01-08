import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import type { User } from "@/lib/type";

type Props = {
    open: boolean;
    user: User | null;
    onClose: () => void;
    onConfirm: () => void;
};

export default function UserDeleteDialog({
    open,
    user,
    onClose,
    onConfirm,
}: Props) {
    if (!user) return null;

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete User?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <b>{user.name}</b>?
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="flex justify-end gap-2">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Delete
                    </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

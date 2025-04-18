import { PropsWithChildren, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';

type Props = {
    itemName?: string;
    itemType?: string;
    onConfirm: () => void;
};

export function ConfirmationDialog({
    itemName,
    itemType = 'item',
    onConfirm,
    children,
}: PropsWithChildren<Props>) {
    const [confirmText, setConfirmText] = useState('');
    const isConfirmDisabled = confirmText !== itemName;

    if (itemName === undefined) {
        return (
            <Dialog>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="h-5 w-5" />
                            <DialogTitle>Delete {itemType}</DialogTitle>
                        </div>
                        <DialogDescription className="pt-2">
                            This action cannot be undone. This will permanently
                            delete the {itemType} and all of its data.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-between">
                        <DialogClose>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={onConfirm}
                            disabled={isConfirmDisabled}
                        >
                            Delete {itemType}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        <DialogTitle>Delete {itemType}</DialogTitle>
                    </div>
                    <DialogDescription className="pt-2">
                        This action cannot be undone. This will permanently
                        delete the{' '}
                        <span className="font-medium">{itemName}</span>{' '}
                        {itemType} and all of its data.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="confirm">
                            Please type{' '}
                            <span className="font-medium">{itemName}</span> to
                            confirm
                        </Label>
                        <Input
                            id="confirm"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            placeholder={itemName}
                            className="w-full"
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-between">
                    <DialogClose>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isConfirmDisabled}
                    >
                        Delete {itemType}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

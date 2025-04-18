import { PropsWithChildren, useState } from 'react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

type Props = {
    title: string;
    report: (reason: string) => Promise<void>;
};

export const ReportDialog = ({
    title,
    report,
    children,
}: PropsWithChildren<Props>) => {
    const [reason, setReason] = useState('');
    const [open, setOpen] = useState(false);

    const { mutate, status } = useMutation({
        mutationFn: report,
        onSuccess: () => {
            toast.info('Report submitted');
            setOpen(false);
        },
        onError: (error) => toast.error(error.message),
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-right">
                            Reason
                        </Label>
                        <Input
                            id="name"
                            required
                            className="col-span-3"
                            value={reason}
                            onChange={(event) => setReason(event.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={status === 'pending'}
                    >
                        Cancel
                    </Button>
                    {status === 'pending' ? (
                        <Button disabled>
                            <Loader2 className="animate-spin" />
                            Reporting
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={() => mutate(reason)}
                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        >
                            Report
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router';
import { Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import * as api from '@/api';
import { User } from '@/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { ImageCropper } from './image-cropper';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export type FileWithPreview = FileWithPath & {
    preview: string;
};

const accept = {
    'image/*': [],
};

const schema = z.object({
    avatar: z.instanceof(File).optional(),
    fullName: z.string().optional(),
    hobbies: z.string().optional(),
    dob: z
        .preprocess(
            (arg) => {
                if (typeof arg === 'string' || arg instanceof Date) {
                    return new Date(arg);
                }
                return arg;
            },
            z.date().refine((date) => date.getTime() < Date.now(), {
                message: 'Date must be in the past',
            }),
        )
        .optional(),
    bio: z.string().optional(),
});

export const UserProfileUpdateForm = ({
    defaultValues,
}: {
    defaultValues: User;
}) => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const queryClient = useQueryClient();
    const { mutate: update, status } = useMutation({
        mutationFn: api.user.update,
        onSuccess: () => {
            toast.success('Profile updated successfully');
            queryClient.invalidateQueries({
                queryKey: ['self'],
            });
            queryClient.invalidateQueries({
                queryKey: ['user', defaultValues.username],
            });
            navigate(`/user/${defaultValues.username}`);
        },
        onError: (error) => toast.error(error.message),
    });

    const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
        null,
    );
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [cropped, setCropped] = useState<File | undefined>(undefined);
    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            const file = acceptedFiles[0];
            if (!file) {
                alert('Selected image is too large!');
                return;
            }

            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            setSelectedFile(fileWithPreview);
            setDialogOpen(true);
        },

        [],
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) =>
                    update({ avatar: cropped, ...values }),
                )}
                className="space-y-8"
            >
                {' '}
                <div className="flex flex-col items-center justify-center">
                    <div className="relative ">
                        {selectedFile ? (
                            <ImageCropper
                                dialogOpen={isDialogOpen}
                                setDialogOpen={setDialogOpen}
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                                setCropped={setCropped}
                            />
                        ) : (
                            <Avatar
                                {...getRootProps()}
                                className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
                            >
                                <input {...getInputProps()} />
                                <AvatarImage src={defaultValues.avatarPath} />
                            </Avatar>
                        )}
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="hobbies"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hobbies</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us about yourself"
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {status === 'pending' ? (
                    <Button disabled>
                        <Loader2 className="animate-spin" />
                        Updating
                    </Button>
                ) : (
                    <Button type="submit">Update</Button>
                )}
            </form>
        </Form>
    );
};

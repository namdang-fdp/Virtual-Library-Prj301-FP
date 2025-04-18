import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { useNavigate } from 'react-router';
import { TagInput, Tag } from 'emblor';
import { useState } from 'react';
import * as api from '@/api';
import { Textarea } from './ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

const schema = z.object({
    isbn: z
        .string()
        .regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, 'Invalid isbn'),
    title: z.string().min(1, 'Title is required'),
    authors: z.array(z.string()).min(1, 'At least one author is required'),
    genres: z.array(z.string()).min(1, 'At least one genre is required'),
    publicationDate: z.preprocess(
        (arg) => {
            if (typeof arg === 'string' || arg instanceof Date) {
                return new Date(arg);
            }
            return arg;
        },
        z.date().refine((date) => date.getTime() < Date.now(), {
            message: 'Date must be in the past',
        }),
    ),
    summary: z.string(),
    pdf: z
        .instanceof(File)
        .refine((file) => file.size > 0, 'PDF file is required'),
    cover: z
        .instanceof(File)
        .refine((file) => file.size > 0, 'Cover image is required'),
});

export const BookUploadForm = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
    const [genreTags, setGenreTags] = useState<Tag[]>([]);
    const [authorTags, setAuthorTags] = useState<Tag[]>([]);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            isbn: '',
            title: '',
            authors: [],
            genres: [],
            publicationDate: new Date(),
            summary: '',
        },
    });

    const { setValue } = form;

    const { status, mutate } = useMutation({
        mutationFn: async ({ cover, pdf, ...values }: z.infer<typeof schema>) => {
            console.log(values)
            return api.book.uploadBook(values, cover, pdf);
        },
        onSuccess: () => toast.info('Upload success'),
        onError: (error) => toast.error(error.message),
    });

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Book Upload
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((data) => mutate(data))}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="isbn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ISBN</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ISBN"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Book title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="authors"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-left">
                                            Authors
                                        </FormLabel>
                                        <FormControl>
                                            <TagInput
                                                {...field}
                                                placeholder="Enter a author"
                                                className="sm:min-w-[450px]"
                                                tags={authorTags}
                                                setTags={(newTags) => {
                                                    setAuthorTags(newTags);
                                                    setValue(
                                                        'authors',
                                                        (
                                                            newTags as [
                                                                Tag,
                                                                ...Tag[],
                                                            ]
                                                        ).map(
                                                            (tag) => tag.text,
                                                        ),
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="genres"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-left">
                                            Genres
                                        </FormLabel>
                                        <FormControl>
                                            <TagInput
                                                {...field}
                                                placeholder="Enter a topic"
                                                className="sm:min-w-[450px]"
                                                tags={genreTags}
                                                setTags={(newTags) => {
                                                    setGenreTags(newTags);
                                                    setValue(
                                                        'genres',
                                                        (
                                                            newTags as [
                                                                Tag,
                                                                ...Tag[],
                                                            ]
                                                        ).map(
                                                            (tag) => tag.text,
                                                        ),
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="publicationDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Publication Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="summary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Summary</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Summary of the book"
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pdf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PDF File</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.files?.[0],
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cover"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cover Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.files?.[0],
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {status === 'pending' ? (
                                <Button disabled>
                                    <Loader2 className="animate-spin" />
                                    Uploading
                                </Button>
                            ) : (
                                <Button type="submit">Upload</Button>
                            )}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

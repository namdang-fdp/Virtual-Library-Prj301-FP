import { BookUploadForm } from '@/components/book-upload-form';

export const BookUpload = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-2xl">
                <BookUploadForm/>
            </div>
        </div>
    );
};

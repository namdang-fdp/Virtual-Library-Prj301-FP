import { PdfViewer } from '@/components/pdf-viewer';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import * as api from '@/api';
import { toast } from 'sonner';

export const BookRead = () => {
    const { id } = useParams();

    const {
        data: book,
        status,
        error,
    } = useQuery({
        queryKey: ['book', id],
        queryFn: () => api.book.get(id!),
    });

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.message);
        return <div></div>;
    }

    return (
        <div className="h-[calc(100vh-69px)]">
            <PdfViewer url={book.pdfPath} />
        </div>
    );
};

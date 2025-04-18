import { Book } from '@/api/book';
import { BookCard } from './book-card';

export const BookGrid = ({ books }: { books: Book[] }) => {
    return (
        <div className="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-5">
            {books.map((book, index) => (
                <div key={index}>
                    <BookCard {...book} />
                </div>
            ))}
        </div>
    );
};

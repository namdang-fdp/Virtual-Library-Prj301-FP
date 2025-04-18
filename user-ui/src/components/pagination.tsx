import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';
import { Button } from './ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
    pageIndex: number;
    setPageIndex: Dispatch<SetStateAction<number>>;
    entryCount: number;
    pageCount: number;
};

export const Pagination = ({
    pageSize,
    setPageSize,
    pageIndex,
    setPageIndex,
    entryCount,
    pageCount,
}: Props) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 px-4 py-3">
            <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <span>Entries per page:</span>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={(value) => {
                            setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[60px] border-0 bg-transparent p-0 focus:ring-0 focus:ring-offset-0">
                            <SelectValue>{pageSize}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {[15, 20, 30, 50, 100].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={pageSize.toString()}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-sm">
                    {pageIndex * pageSize + 1}-
                    {Math.min((pageIndex + 1) * pageSize, entryCount)} {' of '}
                    {entryCount} entries
                </div>
            </div>

            <div className="flex items-center mt-3 sm:mt-0">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => setPageIndex(0)}
                        disabled={pageIndex === 0}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => setPageIndex((prev) => prev - 1)}
                        disabled={pageIndex === 0}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center mx-2">
                        {Array.from(
                            { length: Math.min(5, pageCount) },
                            (_, i) => {
                                let pageNumber;
                                if (pageCount <= 5) {
                                    pageNumber = i;
                                } else {
                                    const middlePoint = Math.min(
                                        Math.max(2, pageIndex),
                                        pageCount - 3,
                                    );
                                    pageNumber =
                                        i + Math.max(0, middlePoint - 2);
                                }

                                const isActive = pageNumber === pageIndex;

                                return (
                                    <Button
                                        key={pageNumber}
                                        variant="ghost"
                                        size="sm"
                                        className={`h-8 min-w-[32px] rounded-md px-3 text-sm font-medium ${
                                            isActive
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                        onClick={() => setPageIndex(pageNumber)}
                                    >
                                        {pageNumber + 1}
                                    </Button>
                                );
                            },
                        )}
                        {pageCount > 5 && (
                            <>
                                <span className="mx-1 text-gray-400">...</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 min-w-[32px] rounded-md px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    onClick={() => setPageIndex(pageCount - 1)}
                                >
                                    {pageCount}
                                </Button>
                            </>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => setPageIndex((prev) => prev + 1)}
                        disabled={pageIndex === pageCount - 1}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => setPageIndex(pageCount - 1)}
                        disabled={pageIndex === pageCount - 1}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

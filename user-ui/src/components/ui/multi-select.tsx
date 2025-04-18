import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Option = { label: string; value: string };

type Props = {
    placeholder: string;
    options: Option[];
    selectedOptions: string[];
    setSelectedOptions: Dispatch<SetStateAction<string[]>>;
    className?: string;
};

export const MultiSelect = ({
    placeholder,
    options: values,
    selectedOptions: selectedItems,
    setSelectedOptions: setSelectedItems,
    className,
}: Props) => {
    const handleSelectChange = (value: string) => {
        if (!selectedItems.includes(value)) {
            setSelectedItems((prev) => [...prev, value]);
        } else {
            const referencedArray = [...selectedItems];
            const indexOfItemToBeRemoved = referencedArray.indexOf(value);
            referencedArray.splice(indexOfItemToBeRemoved, 1);
            setSelectedItems(referencedArray);
        }
    };

    const isOptionSelected = (value: string): boolean => {
        return selectedItems.includes(value) ? true : false;
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild
                    className={cn('w-full', className)}
                >
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-between"
                    >
                        <div>{placeholder}</div>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56"
                    onCloseAutoFocus={(e) => e.preventDefault()}
                >
                    {values.map(
                        (value: Props['options'][0], index: number) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    onSelect={(e) => e.preventDefault()}
                                    key={index}
                                    checked={isOptionSelected(value.value)}
                                    onCheckedChange={() =>
                                        handleSelectChange(value.value)
                                    }
                                >
                                    {value.label}
                                </DropdownMenuCheckboxItem>
                            );
                        },
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

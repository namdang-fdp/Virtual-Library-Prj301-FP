import { useAppSelector } from '@/App';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const BreadcrumbHeader = () => {
    const state = useAppSelector((state) => state.state.value);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                {state.split('.').map((part, i) => (
                    <>
                        <BreadcrumbSeparator
                            className={i == 0 ? 'hidden md:block' : ''}
                        />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{part}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

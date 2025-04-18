import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router';

export const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Toaster richColors />
        </div>
    );
};

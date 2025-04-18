import { UserProfileUpdateForm } from '@/components/user-profile-update-form';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as api from '@/api';

export const UserProfileUpdate = () => {
    const {
        data: user,
        status,
        error,
    } = useQuery({
        queryKey: ['self'],
        queryFn: () => api.user.self(),
    });

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.message);
        return <div></div>;
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-2xl">
                <UserProfileUpdateForm defaultValues={user} />
            </div>
        </div>
    );
};

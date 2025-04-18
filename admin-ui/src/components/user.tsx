import { TrashIcon } from 'lucide-react';
import { DataTable } from './data-table';
import { fetchWrapper } from '@/lib/utils';

export const User = () => {
    return (
        <DataTable
            dataApi='user'
            queryKey="title"
            columns={[
                {
                    accessorKey: 'id',
                    header: 'Id',
                },
                {
                    accessorKey: 'username',
                    header: 'Username',
                },
                {
                    accessorKey: 'fullName',
                    header: 'Full Name',
                },
                {
                    accessorKey: 'createdAt',
                    header: 'Created At',
                },
            ]}
            action={{
                delete: {
                    itemType: 'user',
                    itemNameColumn: 'username',
                    icon: TrashIcon,
                    fn: async (data) => {
                        const response = await fetchWrapper('user/', {
                            method: 'DELETE',
                            body: JSON.stringify({
                                id: data.id,
                            }),
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        });

                        if (!response.ok)
                            throw new Error('Failed to delete user');
                    },
                },
            }}
        />
    );
};

import { DeleteIcon, Trash2Icon, TrashIcon } from 'lucide-react';
import { DataTable } from './data-table';
import { fetchWrapper } from '@/lib/utils';

export const UserReport = () => {
    return (
        <DataTable
            dataApi="user/report"
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
                    accessorKey: 'reportingUser',
                    header: 'Reporting User',
                },
                {
                    accessorKey: 'reason',
                    header: 'Reason',
                },
                {
                    accessorKey: 'createdAt',
                    header: 'Created At',
                },
            ]}
            action={{
                dismiss: {
                    itemType: 'report',
                    itemNameColumn: 'username',
                    icon: Trash2Icon,
                    fn: async (data) => {
                        const response = await fetchWrapper('user/report', {
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
                            throw new Error('Failed to dismiss report');
                    },
                },
                delete: {
                    itemType: 'user',
                    itemNameColumn: 'username',
                    icon: TrashIcon,
                    fn: async (data) => {
                        const response = await fetchWrapper('user', {
                            method: 'DELETE',
                            body: JSON.stringify({
                                id: data.userId,
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

import { Button } from './ui/button';
import { Flag } from 'lucide-react';
import { ReportDialog } from './report-dialog';
import * as api from '@/api';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import type { User } from '@/api/user';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export const UserProfileHeader = ({ user }: { user: User }) => {
    const { data: enableReport } = useQuery({
        queryKey: ['enableReport', user],
        queryFn: async () => {
            const self = await api.user.self();
            return self.username !== user.username;
        },
    });

    return (
        <div className="relative container mx-auto px-4 mt-10 mb-10">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="h-28 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
                    <div className="absolute inset-0 opacity-30">
                        <svg
                            className="w-full h-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <pattern
                                    id="grid"
                                    width="10"
                                    height="10"
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path
                                        d="M 10 0 L 0 0 0 10"
                                        fill="none"
                                        stroke="rgba(0,0,0,0.05)"
                                        strokeWidth="0.5"
                                    />
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#grid)" />
                        </svg>
                    </div>
                </div>

                <div className="px-8 py-6 relative">
                    <div className="flex justify-between items-end -mt-16 mb-6">
                        <Avatar className="h-24 w-24 border-4 border-white rounded-full shadow-sm">
                            <AvatarImage
                                src={user.avatarPath}
                                alt={user.username}
                            />
                            <AvatarFallback className="text-xl font-bold bg-blue-100 text-blue-800">
                                {user.username
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <ReportDialog
                            title="Report User"
                            report={(reason) =>
                                api.user.report(user.username, reason)
                            }
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className={cn(
                                    'text-gray-500 hover:text-red-600 rounded-lg border-gray-200',
                                    enableReport ? '' : 'hidden',
                                )}
                            >
                                <Flag className="h-4 w-4 mr-1" />
                                <span className="text-sm">Report</span>
                            </Button>
                        </ReportDialog>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                {user.fullName}
                            </h1>
                            <p className="text-gray-500">@{user.username}</p>
                        </div>

                        {user.bio && (
                            <p className="text-gray-700 max-w-3xl leading-relaxed">
                                {user.bio}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

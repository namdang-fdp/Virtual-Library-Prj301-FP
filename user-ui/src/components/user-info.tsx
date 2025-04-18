import { User } from '@/api/user';
import { formatISO } from '@/lib/utils';
import { Calendar, Heart, MessageSquare, Users } from 'lucide-react';

export const UserInfo = ({
    user,
    comment,
}: {
    user: User;
    comment: number;
}) => {
    return (
        <div className="w-full lg:w-80">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">
                        About
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-black group-hover:text-white transition-colors">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">
                                    Birthday
                                </span>
                                <p className="font-medium">{user.dob}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-black group-hover:text-white transition-colors">
                                <Heart size={18} />
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">
                                    Hobbies
                                </span>
                                <p className="font-medium">{user.hobbies}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100"></div>

                <div className="p-6">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">
                        Stats
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-black group-hover:text-white transition-colors">
                                <MessageSquare size={18} />
                            </div>
                            <div className="flex-1">
                                <span className="text-sm text-gray-500">
                                    Comments
                                </span>
                                <p className="font-bold text-xl">{comment}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-black group-hover:text-white transition-colors">
                                <Users size={18} />
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">
                                    Participated Since
                                </span>
                                <p className="font-medium">{formatISO(user.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

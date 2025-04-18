import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import {
    Book,
    ChevronRight,
    ChevronsUpDown,
    LayoutDashboard,
    LogOut,
    LucideIcon,
    MessageSquare,
    User,
} from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from './ui/collapsible';
import { stateSlice } from '@/slices/state';
import { State } from '@/state';
import { useDispatch } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const UserProfile = ({
    user,
}: {
    user: {
        name: string;
        avatar: string;
    };
}) => {
    const { isMobile } = useSidebar();

    const logout = () => {
        localStorage.removeItem('token');

        location.reload();
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                />
                                <AvatarFallback className="rounded-lg">
                                    AD
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                {user.name}
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user.avatar}
                                        alt={user.name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        AD
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    {user.name}
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

const SingleSection = (item: {
    title: string;
    state: State;
    icon?: LucideIcon;
    isActive?: boolean;
}) => {
    const dispatch = useDispatch();

    return (
        <SidebarMenuItem>
            <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <a
                    onClick={() =>
                        dispatch(stateSlice.actions.setState(item.state))
                    }
                    className="cursor-pointer"
                >
                    {item.title}
                </a>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

const CollapsibleSection = (item: {
    title: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
        title: string;
        state: State;
    }[];
}) => {
    const dispatch = useDispatch();

    return (
        <SidebarMenu>
            <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
            >
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                        <a
                                            onClick={() =>
                                                dispatch(
                                                    stateSlice.actions.setState(
                                                        subItem.state,
                                                    ),
                                                )
                                            }
                                            className="cursor-pointer"
                                        >
                                            {subItem.title}
                                        </a>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        </SidebarMenu>
    );
};

const user = {
    name: 'admin',
    avatar: '/avatars/admin.jpg',
};

export const AppSidebar = ({
    ...props
}: React.ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <UserProfile user={user} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SingleSection
                        title="Overview"
                        state="overview"
                        icon={LayoutDashboard}
                        isActive={true}
                    />
                    <CollapsibleSection
                        title="Book"
                        icon={Book}
                        isActive={true}
                        items={[
                            {
                                title: 'All',
                                state: 'book.all',
                            },
                            {
                                title: 'Report',
                                state: 'book.report',
                            },
                        ]}
                    />
                    <CollapsibleSection
                        title="User"
                        icon={User}
                        isActive={true}
                        items={[
                            {
                                title: 'All',
                                state: 'user.all',
                            },
                            {
                                title: 'Report',
                                state: 'user.report',
                            },
                        ]}
                    />
                    <CollapsibleSection
                        title="Comment"
                        icon={MessageSquare}
                        isActive={true}
                        items={[
                            {
                                title: 'Report',
                                state: 'comment.report',
                            },
                        ]}
                    />
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};

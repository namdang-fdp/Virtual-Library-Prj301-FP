import { useState, useEffect } from 'react';
import { BookOpen, Home, Library, Menu, Upload, User, X } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router';
import { UserMenu } from './user-menu';

const routes = [
    {
        href: '/',
        label: 'Home',
        icon: Home,
    },
    {
        href: '/book',
        label: 'Book',
        icon: BookOpen,
    },
    {
        href: '/book/upload',
        label: 'Upload',
        icon: Upload,
    },
];

export const Navbar = () => {
    const { pathname } = useLocation();
    const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md transition-all duration-500 shadow-md">
            <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
                <Link
                    to="/"
                    className="mr-6 flex items-center gap-2 font-serif font-semibold text-lg transition-all duration-300 hover:scale-105"
                >
                    <Library className="h-6 w-6 text-primary transition-all duration-500" />
                    <span className="hidden sm:inline bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Virtual Book Archive
                    </span>
                    <span className="sm:hidden bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        VBA
                    </span>
                </Link>

                <nav className="flex items-center gap-8 text-sm font-medium">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            to={route.href}
                            className="group relative"
                            onMouseEnter={() => setHoveredRoute(route.href)}
                            onMouseLeave={() => setHoveredRoute(null)}
                        >
                            <div
                                className={cn(
                                    'flex items-center gap-2 transition-all duration-300 relative z-10',
                                    route.href === pathname
                                        ? 'text-primary'
                                        : 'text-foreground group-hover:text-primary',
                                )}
                            >
                                <route.icon className="h-4 w-4 transition-all duration-300" />
                                {route.label}
                            </div>

                            <span
                                className={cn(
                                    'absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300',
                                    route.href === pathname
                                        ? 'w-full opacity-100'
                                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100',
                                )}
                            />

                            {(route.href === pathname ||
                                hoveredRoute === route.href) && (
                                <span className="absolute inset-0 rounded-md -z-10 bg-primary/5 blur-sm transition-all duration-300" />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="ml-auto">
                    <UserMenu />
                </div>
            </div>
        </nav>
    );
};

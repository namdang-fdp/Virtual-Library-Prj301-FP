import { cn, fetchWrapper } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

export const LoginForm = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        try {
            const response = await fetchWrapper(
                'auth/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                },
            );

            if (!response.ok) {
                toast.error('Invalid username or password');
                return;
            }

            const token = await response.text();

            localStorage.setItem('token', token);

            location.reload();
        } catch (error) {
            toast.error('Invalid username or password', {
                description: error,
            });
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="username"
                                    placeholder="username"
                                    required
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </div>
                            <Button
                                type="button"
                                className="w-full"
                                onClick={onSubmit}
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

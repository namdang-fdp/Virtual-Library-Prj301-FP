import { fetchWrapper } from '.';

type SignupRequest = {
    username: string;
    password: string;
    fullName: string;
};

export const signup = async (values: SignupRequest) => {
    const response = await fetchWrapper('auth/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error('Username already existed');
    }

    return await response.text();
};

type LoginRequest = {
    username: string;
    password: string;
};

export const login = async (values: LoginRequest) => {
    const response = await fetchWrapper('auth/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error('Username or password is not correct');
    }

    return await response.text();
};

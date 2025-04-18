import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from './store';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const App = () => {
    const token = localStorage.getItem('token');

    return (
        <QueryClientProvider client={queryClient}>
            <div>
                {token === null ? <Login /> : <Main />}
                <Toaster richColors />
            </div>
        </QueryClientProvider>
    );
};

export default App;

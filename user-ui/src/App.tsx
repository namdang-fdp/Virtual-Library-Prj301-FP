import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages/home';
import { Login } from './pages/auth/login';
import { Signup } from './pages/auth/signup';
import { BookSearch } from './pages/book/search';
import { BookSummary } from './pages/book/summary';
import { BookRead } from './pages/book/read';
import { BookUpload } from './pages/book/upload';
import { UserProfile } from './pages/user/profile';
import { UserProfileUpdate } from './pages/user/profile-update';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from './layout';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="user">
                            <Route
                                path="update"
                                element={<UserProfileUpdate />}
                            />
                            <Route path=":username" element={<UserProfile />} />
                        </Route>
                        <Route path="book">
                            <Route index element={<BookSearch />} />
                            <Route path="upload" element={<BookUpload />} />
                            <Route path=":id">
                                <Route index element={<BookSummary />} />
                                <Route
                                    path="read"
                                    element={<BookRead />}
                                ></Route>
                            </Route>
                        </Route>

                        <Route path="auth/login" element={<Login />} />
                        <Route path="auth/signup" element={<Signup />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;

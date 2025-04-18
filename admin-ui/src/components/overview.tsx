import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertTriangle,
    Book,
    BookHeart,
    LucideIcon,
    TrendingUp,
    User,
} from 'lucide-react';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from './ui/chart';
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { fetchWrapper, months } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useMemo } from 'react';

const Section = (item: {
    title: string;
    icon: LucideIcon;
    data: string | number;
    detail?: string;
}) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {item.title}
                </CardTitle>
                <item.icon />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{item.data}</div>
                {item.detail ?? (
                    <p className="text-xs text-muted-foreground">
                        {item.detail}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

type MonthCount = {
    month: number;
    count: number;
}[];

const Chart = ({
    title,
    label,
    data: rawData,
}: {
    title: string;
    label: string;
    data: MonthCount;
}) => {
    const data = useMemo(
        () =>
            months.map((month, i) => {
                const item = rawData.find((d) => d.month == i + 1);
                return { month, count: item?.count ?? 0 };
            }),
        [rawData],
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        count: {
                            label: label,
                            color: '#3b82f6',
                        },
                    }}
                >
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                background: '#fff',
                                border: '1px solid #e5e7eb',
                            }}
                            itemStyle={{ color: '#000' }}
                        />
                        <Bar
                            dataKey="count"
                            fill="var(--color-count)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

type Data = {
    bookCount: number;
    mostViewedBook: {
        title: string;
        view: number;
    };
    bookCountByMonth: MonthCount;

    userCount: number;
    userCountByMonth: MonthCount;

    reportCount: number;
};

const dataApi = 'overview';

export const Overview = () => {
    const { isPending, error, data } = useQuery({
        queryKey: [dataApi],
        queryFn: () =>
            fetchWrapper(dataApi)
                .then((res) => res.json())
                .then((res) => res as Data),
    });

    if (isPending) return null;

    if (error)
        toast.error("Failed to fetch overview data", {
            description: error,
        });

    return (
        <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Section
                    title="Total Users"
                    icon={User}
                    data={data!.userCount}
                />
                <Section
                    title="Total Reports"
                    icon={AlertTriangle}
                    data={data!.reportCount}
                />
                <Section
                    title="Total Books"
                    icon={Book}
                    data={data!.bookCount}
                />
                <Section
                    title="Most Viewed Books"
                    icon={BookHeart}
                    data={data!.mostViewedBook.view}
                    detail={data!.mostViewedBook.title}
                />
            </div>
            <div className="grid gap-4 grid-cols-2 my-4">
                <Chart
                    title="Book"
                    label="Book"
                    data={data!.bookCountByMonth}
                />
                <Chart
                    title="User"
                    label="User"
                    data={data!.userCountByMonth}
                />{' '}
            </div>
        </div>
    );
};

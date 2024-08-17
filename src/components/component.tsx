import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoveHorizontalIcon } from "@/components/icons/MoveHorizontalIcon";
import { MountainIcon } from "@/components/icons/mountain-icon";
import { FileIcon } from "@/components/icons/file-icon";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Component() {
  const data = {
    labels: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'],
    datasets: [
      {
        label: 'Popularity',
        data: [75, 50, 45, 20, 60], // 예시 데이터
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 그래프의 비율을 유지하지 않도록 설정
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Most Popular Coding Frameworks',
      },
    },
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-background border-b flex items-center justify-between px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="w-8 h-8" />
            <span className="text-2xl font-semibold">해와달</span>
          </Link>
          <Link href="#" className="text-lg text-muted-foreground hover:text-foreground" prefetch={false}>
            Task Board
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Image
                  src="/1.png"
                  width={64}
                  height={64}
                  alt="Avatar"
                  className="rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Signed in as Taeyang Kim</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex-1 grid grid-cols-2 gap-6 p-6">
        <div className="bg-background rounded-lg shadow-sm border p-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-semibold">Assignment Board</h2>
          </div>
          <div className="pt-4 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileIcon className="w-6 h-6 text-muted-foreground" />
                <div>
                  <div className="text-lg font-medium">Assignment 1</div>
                  <div className="text-sm text-muted-foreground">Due: 2023-05-15</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoveHorizontalIcon className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileIcon className="w-6 h-6 text-muted-foreground" />
                <div>
                  <div className="text-lg font-medium">Assignment 2</div>
                  <div className="text-sm text-muted-foreground">Due: 2023-05-22</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoveHorizontalIcon className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileIcon className="w-6 h-6 text-muted-foreground" />
                <div>
                  <div className="text-lg font-medium">Assignment 3</div>
                  <div className="text-sm text-muted-foreground">Due: 2023-05-29</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoveHorizontalIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          {/* 상단 부분에 인기 프레임워크 그래프 표시 */}
          <Card className="p-4">
            <CardHeader className="flex items-center justify-between pb-4">
              <CardTitle className="text-2xl">Most Popular Coding Frameworks</CardTitle>
            </CardHeader>
            <CardContent className="h-96 p-4"> {/* 높이를 키워서 그래프가 더 크고 중앙에 위치하도록 설정 */}
              <div className="h-full pt-24">
                <Bar data={data} options={options} />
              </div>
            </CardContent>
          </Card>
          {/* 하단의 리더보드는 그대로 유지 */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-2xl">Leaderboard</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg font-medium">Taeyang Kim</div>
                      <div className="text-sm text-muted-foreground">1st Place</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold">1500</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>JA</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg font-medium">Seunghyeon An</div>
                      <div className="text-sm text-muted-foreground">2nd Place</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold">1200</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg font-medium">Seongjun Moon</div>
                      <div className="text-sm text-muted-foreground">3rd Place</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold">2100</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

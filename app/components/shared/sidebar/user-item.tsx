import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/lib/store"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { updateCurrentPage } from "@/lib/features/userSlice";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react"
import { parseDateTime } from "@/lib/utils";

const UserItem = (): JSX.Element => {
    const router = useRouter()
    const dispatch = useAppDispatch<AppDispatch>();
    const info = useAppSelector((state: RootState) => state.user.info)
    const currentPage = useAppSelector((state: RootState) => state.user.currentPage)

    interface NavPhases {
        [key: string]: React.ReactNode;
    }

    const navOptions: NavPhases = {
        dashboard: (<Button onClick={() => {
            router.push('/user')
            dispatch(updateCurrentPage('user'))

        }}>
            User Info
        </Button>),
        user: (<Button onClick={() => {
            router.push('/dashboard')
            dispatch(updateCurrentPage('dashboard'))

        }}>
            Dashboard
        </Button>)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    <h1 className="truncate ...">
                        {info?.name}
                    </h1>
                </Button>
            </PopoverTrigger>
            <PopoverContent asChild className="p-0 w-fit">
                <Card>
                    <CardHeader>
                        <CardTitle>{info?.name}</CardTitle>
                        <CardDescription>{info?.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                        {navOptions[currentPage]}
                        <Button asChild variant="secondary">
                            <a href="/api/auth/logout">Logout</a>
                        </Button>
                    </CardContent>
                    <CardFooter className="text-xs">
                        Last Updated: {parseDateTime(info?.updated_at)}
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover>

    )
}

export default UserItem
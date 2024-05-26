import { useState } from "react"
import { AppDispatch } from "@/lib/store"
import { useAppDispatch } from "@/lib/hooks"
import { updateNewSessionPhase } from "@/lib/features/dashboardSlice"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const UploadResume = (): JSX.Element => {
    const dispatch = useAppDispatch<AppDispatch>();

    const [isFile, setIsFile] = useState(false)
    const [fileType, setfileType] = useState('')

    const handleFormatChange = (value: string) => {
        setfileType(value)
    }

    interface formatChanges {
        [key: string]: React.ReactNode;
    }
    const fileFormat: formatChanges = {
        '': <></>,
        link: <Input className="mt-6" />,
        pdf: <Input className="mt-6" type="file" accept=".pdf" />,
        docx: <Input className="mt-6" type="file" accept=".docx" />
    }

    return (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>Upload resume</CardTitle>
                <CardDescription>
                    First, Conduify requires some background information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Select onValueChange={handleFormatChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an upload format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Upload Format</SelectLabel>
                            <SelectItem value="link">URL Link</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="docx">Word Document</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {fileFormat[fileType]}
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => {
                        dispatch(updateNewSessionPhase('configInterview'))
                    }}
                >Proceed with upload</Button>
            </CardFooter>
        </Card>
    )
}

export default UploadResume
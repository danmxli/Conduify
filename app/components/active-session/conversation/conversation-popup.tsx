import { FC, useState, useEffect, useRef, useCallback } from "react"
import Webcam from "react-webcam";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { v4 as uuidv4 } from 'uuid';
import { GoRocket } from "react-icons/go";
import { RiLoader2Line, RiWebcamLine, RiVideoUploadLine } from "react-icons/ri";
import { TbLayoutGridRemove } from "react-icons/tb";


interface DialogItem {
    role: string
    content: string
}

interface ConversationPopupProps {
    question: DialogItem;
    userResponse: string;
    updateUserResponse: (newResponse: string) => void;
    onSubmit: (text: string) => Promise<void>;
}

const ConversationPopup: FC<ConversationPopupProps> = (props): JSX.Element => {
    const ffmpegRef = useRef(new FFmpeg());

    // webcam
    const webcamRef = useRef<Webcam | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

    const handleDataAvailable = useCallback(
        ({ data }: BlobEvent) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);

        mediaRecorderRef.current = new MediaRecorder(
            webcamRef?.current?.stream as MediaStream, {
            mimeType: "video/webm"
        }
        );
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const handleDownload = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });

        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });

            // write file to mem
            const unique_id = uuidv4();
            await ffmpeg.writeFile(`${unique_id}.webm`, await fetchFile(blob));
            await ffmpeg.exec(
                ["-i",
                    `${unique_id}.webm`,
                    `${unique_id}.mp3`]
            );


        }
    };

    const stop = () => {
        const videoElement = webcamRef.current?.video;
        const stream = videoElement?.srcObject as MediaStream | null;

        if (stream) {
            const tracks = stream.getTracks();

            tracks.forEach(track => track.stop());
            videoElement && (videoElement.srcObject = null);
        }
    };


    // handle open, close conversation popup
    const [openConversation, setOpenConversation] = useState(false)
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setCapturing(false)
            stop
            setRecordedChunks([])
            setOpenConversation(false)
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    })

    return (
        <>
            <button
                className="w-full p-6 border hover:border-indigo-600 shadow rounded-2xl flex items-center justify-center gap-3"
                onClick={() => {
                    setOpenConversation(true)
                }}
            >
                <GoRocket className="text-xl" /> Respond to question
            </button>

            {openConversation && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
                    <div className="bg-white p-6 border shadow rounded-2xl w-11/12 h-5/6 grid grid-cols-3">

                        <div className="h-full flex flex-col pr-6 border-r">
                            <div className="flex-grow max-h-fit">
                                <h1>{props.question.content}</h1>
                            </div>

                            <div className="border-t pt-6 flex items-center justify-end gap-3">
                                {capturing ? (
                                    <button
                                        className="bg-gray-50 hover:bg-gray-100 p-3 pt-1.5 pb-1.5 rounded shadow flex items-center justify-center gap-3"
                                        onClick={handleStopCaptureClick}
                                    ><RiLoader2Line className="animate-spin" />Stop Capture</button>
                                ) : (
                                    <>
                                        {recordedChunks.length > 0 ? (
                                            <>
                                                <button
                                                    className="bg-gray-50 hover:bg-gray-100 p-3 pt-1.5 pb-1.5 rounded shadow flex items-center justify-center gap-3"
                                                    onClick={handleDownload}
                                                ><RiVideoUploadLine />Submit</button>
                                                <button
                                                    className="bg-gray-50 hover:bg-gray-100 p-3 pt-1.5 pb-1.5 rounded shadow flex items-center justify-center gap-3"
                                                    onClick={() => {
                                                        setRecordedChunks([])
                                                    }}
                                                ><TbLayoutGridRemove />Redo</button>
                                            </>
                                        ) : (
                                            <button
                                                className="bg-gray-50 hover:bg-gray-100 p-3 pt-1.5 pb-1.5 rounded shadow flex items-center justify-center gap-3"
                                                onClick={handleStartCaptureClick}
                                            ><RiWebcamLine />New Capture</button>
                                        )}
                                    </>

                                )}
                            </div>

                        </div>

                        <div className="col-span-2 pl-6 flex items-center justify-center">
                            <div>
                                <Webcam mirrored audio={true} ref={webcamRef} />
                            </div>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}

export default ConversationPopup
import OpenAI from "openai";
import { IncomingForm } from 'formidable';
const fs = require("fs");

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: any, res: any) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // vercel tmp audio file storage
    const fData = await new Promise<{ fields: any; files: any }>(
        (resolve, reject) => {
            const form = new IncomingForm({
                multiples: false,
                uploadDir: "/tmp",
                keepExtensions: true,
            });
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                resolve({ fields, files });
            });
        }
    );

    const videoFile = fData.files.file;
    const videoFilePath = videoFile?.filepath;
    console.log(videoFilePath);

    try {
        const resp = await openai.audio.transcriptions.create(
            {
                model: "whisper-1",
                file: fs.createReadStream(videoFilePath)
            }
        );

        const transcript = resp.text;

        res.status(200).json({ transcript });
        return resp.text;
    } catch (error) {
        console.error("server error", error);
        res.status(500).json({ error: "Error" });
    }
}

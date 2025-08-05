"use client"

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";


import { useRef, useState } from "react";


interface FileUploadProps {
    onSuccess: (res: any) => void;
    onProgress?: (progress: number) => void;
    fileType?: "video" | "image";
}


const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Invalid file type. Please upload  video file.");
                return true
            }

        }
        const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file || !validateFile(file)) return
            setUploading(true);
            setError(null);

            try {
                const autRes = await fetch("api/auth/imagekit-auth");
                const autData = await autRes.json()

                const res = await upload({
                    file,
                    fileName: file.name,
                    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
                    signature: autData.signature,
                    expire: autData.expire,
                    token: autData.token,

                    onProgress: (event) => {
                        if (event.lengthComputable && onProgress) {
                            const percent = (event.loaded / event.total) * 100;
                            onProgress(Math.round(percent));

                        }
                    },

                })
                onSuccess(res);
            } catch (error) {
                console.log("upload error", error);

            } finally {
                setUploading(false);
            }
        }
        return (
            <>
                <input
                    type="file"
                    accept={fileType === "video" ? "video/*" : "image/*"}
                    onChange={handleFileChange}
                />
                {uploading && (
                    <span>Loding...</span>
                )}


            </>
        );
    };
}

export default FileUpload;
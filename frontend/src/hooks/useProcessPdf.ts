import { useState } from "react";
import api from "../services/api";
import type { ProcessResponse } from "../types/pdf";

export function useProcessPdf() {
    const [loading, setLoading] = useState(false);

    async function process(file: File): Promise<ProcessResponse> {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await api.post<ProcessResponse>(
                "/pdf/process",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("FULL RESPONSE:", response);
            console.log("RESPONSE DATA:", response.data);

            return response.data;
        } catch (error) {
            console.error("Error processing PDF:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        process,
        loading,
    };
}
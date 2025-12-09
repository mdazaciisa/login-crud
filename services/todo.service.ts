import { API_URL } from "@/constants/config";
import { Task } from "@/constants/types";

export const todoService = {
    async getTodos(token: string): Promise<Task[]> {
        const response = await fetch(`${API_URL}/todos`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener las tareas");
        }

        const json = await response.json();
        return json.data || [];
    },

    async createTodo(token: string, title: string, imageUri: string, location: { latitude: number; longitude: number }): Promise<Task> {
        // For web, we need to send JSON with base64 image
        // For native, we use FormData
        const isWeb = typeof document !== 'undefined';

        if (isWeb) {
            // Web: Send as JSON with base64
            const response = await fetch(`${API_URL}/todos`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    location,
                    image: imageUri, // On web, this is already a data URL or blob URL
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al crear la tarea: ${errorText}`);
            }

            const json = await response.json();
            return json.data || json;
        } else {
            // Native: Use FormData
            const formData = new FormData();
            formData.append("title", title);
            formData.append("location", JSON.stringify(location));

            const filename = imageUri.split('/').pop() || "photo.jpg";
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;

            // @ts-ignore: React Native FormData expects specific object structure for files
            formData.append("image", { uri: imageUri, name: filename, type });

            const response = await fetch(`${API_URL}/todos`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al crear la tarea: ${errorText}`);
            }

            const json = await response.json();
            return json.data || json;
        }
    },

    async updateTodo(token: string, id: string, updates: Partial<Task>): Promise<Task> {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar la tarea");
        }

        const json = await response.json();
        return json.data || json;
    },

    async deleteTodo(token: string, id: string): Promise<void> {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la tarea");
        }
    },
};

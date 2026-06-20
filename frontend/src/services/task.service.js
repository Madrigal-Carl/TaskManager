import api from "@api/axios";

export async function getTasks({ page, limit, search, status, priority }) {
    const res = await api.get("/tasks", {
        params: {
            page,
            limit,
            search,
            status,
            priority,
        },
    });

    return res.data;
}

export async function createTask(data) {
    const res = await api.post("/tasks", data);

    return res.data;
}

export async function updateTask(id, data) {
    const res = await api.put(`/tasks/${id}`, data);

    return res.data;
}

export async function deleteTask(id) {
    const res = await api.delete(`/tasks/${id}`);

    return res.data;
}
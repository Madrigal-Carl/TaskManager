import api from "@api/axios";

export async function getTasks({ page, limit, search, status, priority, date }) {
    const res = await api.get("/tasks", {
        params: {
            page,
            limit,
            search,
            status,
            priority,
            date
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

export async function markTask(id, status) {
    const res = await api.patch(`/tasks/${id}/status`, {
        status,
    });

    return res.data;
}
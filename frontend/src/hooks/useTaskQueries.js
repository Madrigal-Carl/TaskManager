import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    markTask,
} from "@services/task.service";

export const useTasks = ({ page, limit, search, status, priority, date }) => {
    return useQuery({
        queryKey: ["tasks", { page, limit, search, status, priority, date }],
        queryFn: () => getTasks({ page, limit, search, status, priority, date }),
        keepPreviousData: true,
    });
};

export const useCreateTask = (onSuccess) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTask,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false });

            onSuccess?.(...args);
        },
    });
};

export const useUpdateTask = (onSuccess) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateTask(id, data),
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false });

            onSuccess?.(...args);
        },
    });
};

export const useDeleteTask = (onSuccess) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false });

            onSuccess?.(...args);
        },
    });
};

export const useMarkTask = (onSuccess) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }) => markTask(id, status),
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false, });

            onSuccess?.(...args);
        },
    });
};
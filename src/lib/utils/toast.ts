import { toast } from "sonner";

export const notify = {
  success: (message: string, description?: string) =>
    toast.success(message, { description }),

  error: (message: string, description?: string) =>
    toast.error(message, { description }),

  loading: (message: string) =>
    toast.loading(message),

  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string },
  ) =>
    toast.promise(promise, messages),

  dismiss: (id?: string | number) =>
    toast.dismiss(id),
};
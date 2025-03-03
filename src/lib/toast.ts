import { toast } from 'react-toastify';

export function toastMutationPromise(
  promise: Promise<any>,
  params: {
    error?: string;
    pending?: string;
    success?: string;
  },
) {
  toast.promise(promise, {
    pending: params.pending,
    success: params.success,
    error: params.error,
  });
}

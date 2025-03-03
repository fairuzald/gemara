import { X } from 'lucide-react';
import toast, { type Toast as ToastType, Toaster } from 'react-hot-toast';

interface ToastProps {
  status: 'error' | 'success';
  description: string;
  toastLoadingId?: string;
}

function title(inputString: string) {
  if (inputString.length > 0) {
    return (
      inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
    );
  } else {
    return '';
  }
}

function callLoading(desc: string) {
  return loadingToast(desc);
}

function callToast({ status, description, toastLoadingId }: ToastProps): void {
  toast.dismiss(toastLoadingId);
  status == 'success' ? successToast(description) : errorToast(description);
}

function ToastComponent({
  toastprops: t,
  description,
}: { toastprops: ToastType } & { description: string }) {
  return (
    <div className='flex gap-7 ml-3'>
      <div className='flex flex-col'>
        <h1 className='text-base md:text-xl font-bold '>
          <strong>{title(t.type)}</strong>
        </h1>
        <p className='text-xs md:text-base font-medium '>
          {description || t.type}
        </p>
      </div>
      <div className='w-8 justify-center rounded-full flex items-center self-center'>
        <button
          className='aspect-square w-full items-center flex'
          onClick={() => toast.dismiss(t.id)}
        >
          <div>
            <X
              className='fill-black hover:fill-slate-500 transition-all duration-300'
              size={20}
            ></X>
          </div>
        </button>
      </div>
    </div>
  );
}

const successToast = (desc: string) =>
  toast.success((t) => <ToastComponent toastprops={t} description={desc} />);
const errorToast = (desc: string) =>
  toast.error((t) => <ToastComponent toastprops={t} description={desc} />);
const loadingToast = (desc: string): string => {
  return toast.loading((t) => (
    <ToastComponent toastprops={t} description={desc} />
  ));
};

function Toast() {
  return (
    <div>
      <Toaster
        position='top-center'
        containerClassName='bg-[#937F77] '
        containerStyle={{
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), , 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderWidth: '0.125rem',
          borderRadius: '0.25rem',
          border: '2px solid #937F77',
          paddingInline: '1.25rem',
          maxWidth: '85%',
          minWidth: '250px',
          color: '#937F77',
        }}
        toastOptions={{
          className: 'bg-[#937F77]',
          style: {
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), , 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            borderWidth: '0.125rem',
            borderRadius: '0.25rem',
            border: '2px solid #937F77',
            paddingInline: '1.25rem',
            maxWidth: '85%',
            minWidth: '250px',
            color: '#937F77',
            backgroundColor: '#937F77',
          },

          error: {
            style: { borderColor: '#EF1B27' },
            duration: 3500,
          },

          success: {
            style: {
              borderColor: '#3FB160 ',
              background: '#937F77',
              backgroundColor: '#937F77',
            },
            duration: 3500,
          },
          loading: {
            style: {
              borderColor: '#fbbf24',
              background: '#937F77',
              backgroundColor: '#937F77',
            },
          },
        }}
      />
    </div>
  );
}

export default Toast;
export { callLoading, callToast };

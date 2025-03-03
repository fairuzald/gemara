import { callToast } from '@/components/ToastManual';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';

const handleCopyClick = (str: string) => {
  const tempInput = document.createElement('input');
  tempInput.value = str;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
};

export default function ToastClient() {
  const { toast: toastRadix } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const toastMessage = sessionStorage.getItem('toastMessage');
    if (toastMessage) {
      setIsOpen(true);
      const { id } = JSON.parse(toastMessage);

      toastRadix({
        title: 'Success',
        description: (
          <div className='flex flex-col gap-2'>
            <p>Pemesanan Custom Bead Berhasil!</p>
            <p>
              Terima kasih telah melakukan pemesanan custom bead di toko kami.
              Pemesanan Anda telah berhasil dicatat.
            </p>
            <p className='flex gap-2 items-center justify-between'>
              ID Pemesanan: {id}
              <button
                className='px-4 py-1 bg-brown-dark rounded-md text-black outline-none focus:ring-4 focus:ring-black transform active:scale-75 transition-transform'
                onClick={() => {
                  handleCopyClick(id);
                  callToast({
                    status: 'success',
                    description: 'ID Pemesanan berhasil dicopy',
                  });
                }}
              >
                Copy
              </button>
            </p>

            <p>
              Silakan hubungi admin kami untuk informasi lebih lanjut atau
              pertanyaan terkait pemesanan Anda. Harap cantumkan ID pemesanan
              ini saat Anda menghubungi kami untuk memudahkan proses verifikasi.
            </p>
            <p>
              Terima kasih atas kepercayaan Anda kepada kami. Kami berharap
              dapat melayani Anda dengan baik.
            </p>
          </div>
        ),
        action: (
          <ToastAction
            className='mt-5 bg-brown-dark rounded-md text-white hover:bg-brown-dark hover:opacity-50 border-none hover:text-black ring-0'
            altText='Goto schedule to undo'
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <a href='https://wa.me/62895417115666' target='_blank'>
              Hubungi Admin
            </a>
          </ToastAction>
        ),
      });

      // Hapus pesan toast dari sessionStorage setelah ditampilkan
      sessionStorage.removeItem('toastMessage');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.pointerEvents = 'auto';
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className='bg-black w-screen h-screen z-[70] overflow-hidden fixed opacity-60 top-0 left-0'
      style={{ pointerEvents: 'none' }}
    />
  ) : (
    <></>
  );
}

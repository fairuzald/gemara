import { useEffect, useState } from 'react';

const useMobile = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isMobile, setIsMobile] = useState(dimensions.width <= 550);

  useEffect(() => {
    const handleResize = () => {
      const newDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      setDimensions(newDimensions);

      const isMobileNow = newDimensions.width <= 550;
      setIsMobile(isMobileNow);
    };

    // Pertama kali ketika komponen dimount
    handleResize();

    // Tambahkan event listener untuk mendeteksi perubahan ukuran layar
    window.addEventListener('resize', handleResize);

    // Membersihkan event listener saat komponen unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Dependensi kosong, sehingga efek ini hanya dijalankan saat komponen dimount

  return dimensions;
};

export default useMobile;

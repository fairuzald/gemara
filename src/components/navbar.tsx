import { Button } from '@/components/ui/button';
import navData from '@/data/nav-data';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  // Managing state for the navbar
  const [isOpen, setIsOpen] = useState(false);

  // Side Bar background ref
  const sideBarBgRef = useRef<HTMLDivElement>(null);
  const [pathname, setPathname] = useState('' as string);

  // Close Navbar when user clicks on black background stuffs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
    function handleClickOutside(event: MouseEvent) {
      // If Userclick is in the black background stuff
      if (
        sideBarBgRef.current &&
        sideBarBgRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Tambahkan overflow: hidden ke body saat isOpen bernilai true
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [setIsOpen, isOpen]); // Tambahkan isOpen sebagai dependensi useEffect

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;

      const sections = document.querySelectorAll('section');
      const navLinks =
        document.querySelectorAll<HTMLAnchorElement>('[data-navlink]');

      sections.forEach((section, index) => {
        const height = section.offsetHeight;
        const offset = section.offsetTop - 200;
        const id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
          navLinks.forEach((navLink) => {
            navLink.classList.remove('font-bold');
            if (navLink.getAttribute('href') === `/#${id}`) {
              navLink.classList.add('font-bold');
            }
          });
        }
      });
    };

    if (window.location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <nav
      aria-label='Navbar'
      className='sticky top-0 z-50 flex h-16 lg:h-20 w-full flex-row items-center border-b-2 justify-between border-b-slate-400 bg-white px-5 lg:px-16 xl:h-[80px] text-gray-700 shadow-lg'
    >
      {/* Logo */}
      <a
        href='/'
        className='text-2xl font-bold'
        aria-label='Home'
        data-cy='navbar-logo'
      >
        <img
          alt='logo'
          width={70}
          height={70}
          className='w-24 lg:w-32 h-10 lg:h-[50px]'
          src={'/logo.svg'}
          sizes={'(max-width: 640px) 70px, 100px'}
        />
      </a>

      {/* Hamburger Menu Button */}
      <Button
        data-cy='navbar-toggle'
        variant='ghost'
        size='icon'
        aria-label='Menu'
        className='sm:hidden'
        onClick={() => setIsOpen(true)}
      >
        <img
          height={36}
          width={36}
          src='/icons/menu-icon.svg'
          alt='Menu Icon'
        />
      </Button>

      {/* Display URL Navigation */}
      <div
        data-cy='navbar-expanded'
        className={`fixed bg-white right-0 top-0 z-10 flex gap-6 duration-300 ease-in-out
        border-l-2 border-l-slate-400 p-5 font-inter text-base flex-col max-sm:w-[60%] h-full 
        sm:flex-1 sm:flex-row sm:static sm:h-auto sm:w-auto sm:translate-x-0 sm:items-center sm:justify-between sm:gap-12 sm:border-none sm:bg-transparent sm:p-0 xl:text-xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col sm:flex-row flex-1 max-sm:gap-5 '>
          <Button
            variant={'ghost'}
            className='ml-auto sm:hidden'
            onClick={() => setIsOpen(false)}
            aria-label='Close Menu'
            data-cy='navbar-close'
          >
            <img
              height={20}
              width={20}
              alt='close-button'
              src='/icons/x-icon.svg'
              className={clsx(
                'duration-300 transition-all',
                isOpen ? 'rotate-180' : 'rotate-0',
              )}
            />
          </Button>
          <ul className='flex flex-col sm:flex-row flex-1 items-center sm:justify-center gap-5 sm:gap-10 lg:gap-20 2xl:gap-28'>
            {navData.map((item) => {
              return (
                <li
                  key={item.name}
                  className={clsx(
                    'font-helvetica duration-300 transition-all hover:underline hover:underline-offset-8 hover:decoration-1',
                    pathname.includes(item.path)
                      ? ' font-bold'
                      : 'text-gray-700',
                  )}
                >
                  <a
                    data-cy={`navbar-link-${item.name
                      .toLowerCase()
                      .split(' ')
                      .join('-')}`}
                    href={item.path}
                    aria-label={item.path
                      .split('/')
                      .map((item) => item)
                      .join(' ')}
                    data-navlink
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
          {/* Button Contact Us */}
          <Button data-cy='navbar-contact-us' aria-label='Contact Us'>
            <a
              href='https://wa.me/62895417115666'
              target='_blank'
              className='font-helvetica font-bold'
            >
              Contact Us
            </a>
          </Button>
        </div>
      </div>

      {/* Side bar opaque background */}
      {isOpen && (
        <div
          ref={sideBarBgRef}
          data-cy='navbar-side-bar-bg'
          className='fixed top-0 left-0 z-0 w-screen h-screen bg-opacity-80 backdrop-blur-sm lg:hidden'
        />
      )}
    </nav>
  );
}

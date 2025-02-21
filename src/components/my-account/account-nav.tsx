'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'src/app/i18n/client';
import LogoutIcon from '@components/icons/account-logout';
import Link from '@components/ui/link';
import { logout } from "../../../redux/reducer/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';


type Option = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export default function AccountNav({
  options,
  lang,
}: {
  options: Option[];
  lang: string;
}) {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const newPathname = pathname.split('/').slice(3, 4);
  const mainPath = `/${newPathname[0]}`;


  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true); // Prevents SSR mismatch
  }, []);


  const handleLogout = async () => {
    try {
      dispatch(logout()); // ✅ Dispatch Redux logout action
      router.push('/en'); // ✅ Redirect to home
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="flex flex-col pb-2 overflow-hidden border rounded-md md:pb-6 border-border-base bg-white">
      {options.map((item) => {
        const menuPathname = item.slug.split('/').slice(2, 3);
        const menuPath = `/${menuPathname[0]}`;

        return (
          <Link
            key={item.slug}
            href={`/${lang}${item.slug}`}
            className={`flex items-center cursor-pointer text-sm lg:text-15px text-brand-dark py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 hover:text-brand ${
              mainPath === menuPath ? 'bg-fill-secondary font-medium' : 'font-normal'
            }`}
          >
            <span className="flex justify-center w-6 me-1">
              {item.icon}
            </span>
            <span className="ltr:pl-1 lg:rtl:pr-1.5">{t(item.name)}</span>
          </Link>
        );
      })}

      {/* ✅ Show Logout Button Only If Hydration is Complete */}
      {hasHydrated && isAuthenticated && (

        <button
          className="flex items-center text-sm lg:text-15px text-brand-dark py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 cursor-pointer focus:outline-none"
          onClick={handleLogout}
        >
          <span className="flex justify-center w-6 me-1">
            <LogoutIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />
          </span>
          <span className="ltr:pl-1 lg:rtl:pr-1.5">{t('text-logout')}</span>
        </button>
      )}
    </nav>
  );
}

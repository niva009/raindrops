'use client';

import { useState } from 'react';
import Image from 'next/image';
import Text from '@components/ui/text';
import { ROUTES } from '@utils/routes';
import { useParams } from 'next/navigation';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share';
import Heading from '@components/ui/heading';
import vendorimage from '../../assets/placeholders/fresss.jpeg'

import {
  IoLocationOutline,
  IoCallOutline,
  IoGlobeOutline,
} from 'react-icons/io5';
import { useTranslation } from 'src/app/i18n/client';

interface ShopSidebarProps {
  data: any;
  lang: string;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ data, lang }) => {
  const pathname = useParams();
  const { slug } = pathname;
  const [descriptionState, setDescriptionState] = useState(Boolean(false));
  const shareUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.SHOPS}/${slug}`;
  const { t } = useTranslation(lang, 'common');
  const descriptionHandel = () => {
    return setDescriptionState(true);
  };

  console.log("data sidepanel", data?.company_name);

  return (
    <div className="flex flex-col px-6 pt-10 lg:pt-14">
      <div className="w-full px-5 pb-8 text-center border-b border-gray-base sm:px-8 lg:px-0 2xl:px-7">
        <div className="relative w-32 h-32 mx-auto">
          <Image
            src={data?.image ?`http://localhost:5555/${data?.image}`: vendorimage}
            alt={data?.company_name}
            fill
            className="rounded-xl"
          />
        </div>
        <Heading variant="titleLarge" className="mt-6 mb-1.5">
          {data?.company_name}
        </Heading>
        <div className="flex items-center flex-wrap justify-center -mx-1 pt-4 mt-0.5">
          <FacebookShareButton url={shareUrl} className="mx-1">
            <FacebookIcon
              size={25}
              round
              className="transition-all hover:opacity-90"
            />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} className="mx-1">
            <TwitterIcon
              size={25}
              round
              className="transition-all hover:opacity-90"
            />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} className="mx-1">
            <LinkedinIcon
              size={25}
              round
              className="transition-all hover:opacity-90"
            />
          </LinkedinShareButton>
        </div>
      </div>
      <div className="space-y-6 py-7">
        <div className="flex items-start">
          <div className="w-10 shrink-0">
            <IoLocationOutline className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="mb-1 font-medium text-brand-dark text-15px">
              {t('text-address')}:
            </h4>
            <Text>{data?.company_address}</Text>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-10 shrink-0">
            <IoCallOutline className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="mb-1 font-medium text-brand-dark text-15px">
              {t('text-phone-number')}:
            </h4>
            <Text>{data?.company_phone ? data.company_phone : "+91-9888888885"}</Text>

          </div>
        </div>
        <div className="flex items-start">
          <div className="w-10 shrink-0">
            <IoGlobeOutline className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="mb-1 font-medium text-brand-dark text-15px">
              {t('text-website')}:
            </h4>
            <Text>
              <a
                href={`https://${data?.website}`}
                className="text-[#0077E5] hover:text-brand-muted"
              >
                {data?.website}
              </a>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;

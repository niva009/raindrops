import Link from '@components/ui/link';
import Image from 'next/image';
import { ROUTES } from '@utils/routes';
import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n/client';
import vendorimage from '../../assets/placeholders/fresss.jpeg'

type VendorCardProps = {
  lang: string;
  shop?: any;
};

const VendorCard: React.FC<VendorCardProps> = ({ lang, shop }) => {
  const { t } = useTranslation(lang);
  const placeholderImage = vendorimage;
  const { image,company_name, _id, address} = shop;

  console.log("vendor-shops..:", shop);
  return (
    <Link
      href={`/${lang}${ROUTES.SHOPS}/${_id}`}
      className="relative flex items-center px-5 py-5 transition-all bg-white border rounded-lg cursor-pointer xl:px-7 xl:py-7 border-border-base shadow-vendorCard hover:shadow-vendorCardHover"
    >
      <div className="relative flex items-center justify-center w-16 h-16 overflow-hidden rounded-full shrink-0 bg-fill-thumbnail xl:w-20 xl:h-20">
          <Image
            alt={t('common:text-logo')}
            src={image? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}` : placeholderImage }
            width={100}
            height={100}
          />
      </div>

      <div className="flex flex-col ltr:ml-4 rtl:mr-4 xl:ltr:ml-5 xl:rtl:mr-5">
        <Heading variant="mediumHeading" className="pb-1.5">
          {company_name}
        </Heading>
        <p>{address}</p>
      </div>
    </Link>
  );
};

export default VendorCard;

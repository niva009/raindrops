import { useState, useEffect } from 'react';
import { useTranslation } from 'src/app/i18n/client';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import Input from '@components/ui/form/input';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share';

interface Props {
  lang: string;
  className?: string;
  shareUrl?: string;
}
interface NewsLetterFormValues {
  shareLink: string;
}
const defaultValues = {
  shareLink: '',
};

const SocialShareBox: React.FC<Props> = ({
  lang,
  className = '',
  shareUrl = '',
}) => {
  const { t } = useTranslation(lang, 'common');
  const [copyText, setCopyText] = useState({
    value: shareUrl,
    copied: false,
  });
  const { register } = useForm<NewsLetterFormValues>({
    defaultValues,
  });
  useEffect(() => {
    if (copyText.copied) {
      setTimeout(() => {
        setCopyText({
          ...copyText,
          copied: false,
        });
      }, 1500);
    }
  }, [copyText]);
  return (
    <div
      className={cn(
        'shadow-card bg-brand-light rounded-md p-4 md:p-6 lg:p-7',
        className
      )}
    >
      <Heading className="mb-2">{t('text-share-social-network')}</Heading>
      <Text variant="small">{t('text-share-social-network-description')}</Text>
      <div className="flex flex-wrap items-center mb-4 -mx-1">
        <FacebookShareButton url={shareUrl} className="mx-1">
          <FacebookIcon
            size={40}
            round={true}
            className="transition-all hover:opacity-90"
          />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} className="mx-1">
          <TwitterIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} separator=":: " className="mx-1">
          <WhatsappIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl} className="mx-1">
          <LinkedinIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </LinkedinShareButton>
      </div>
      <Text variant="small">{t('text-or-copy-link')}</Text>
      <form noValidate className="space-y-5">
        <div className="relative mt-2.5 mb-1.5">
          <Input
            type="link"
            variant="solid"
            className="w-full"
            value={shareUrl}
            inputClassName="px-4 border-border-base rounded-md focus:outline focus:border-brand"
            {...register('shareLink', {
              pattern: {
                value:
                  /^((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}))$/,
                message: ' ',
              },
            })}
            lang={lang}
          />
          {!copyText.copied ? (
            <>
              {/* @ts-ignore */}
              <CopyToClipboard
                text={copyText.value}
                onCopy={() =>
                  setCopyText({
                    ...copyText,
                    copied: true,
                  })
                }
              >
                <span
                  className="absolute ltr:right-0.5 rtl:left-0.5 top-[6%] h-[90%] px-2 text-brand text-sm uppercase font-bold flex items-center bg-brand-light cursor-pointer"
                  role="button"
                >
                  {t('text-copy')}
                </span>
              </CopyToClipboard>
            </>
          ) : (
            <span className="absolute ltr:right-0.5 rtl:left-0.5 top-[6%] h-[90%] ltr:pr-1.5 rtl:pl-1.5 ltr:pl-8 rtl:pr-8 text-brand text-sm uppercase font-bold flex items-center bg-brand-light cursor-pointer">
              {t('text-copied')}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default SocialShareBox;

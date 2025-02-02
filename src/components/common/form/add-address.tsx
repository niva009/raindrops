import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n/client';
import axios from 'axios';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQueryClient } from 'react-query';


interface ContactFormValues {
  houseName: string;
  formatted_address?: string;
  address: string;
  phoneNumber: string;
  landMark: string;
  pinCode: string;
}

const AddAddressForm: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang);
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const queryClient = useQueryClient(); // Initialize the query client

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      houseName: data?.houseName || "",
      address: data?.address || '',
      phoneNumber: data?.phoneNumber || '',
      landMark: data?.landMark || '',
      pinCode: data?.pinCode || '',
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/add-address/`,
        values,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log('Address added successfully:', values);
      closeModal();
      queryClient.invalidateQueries(API_ENDPOINTS.ADDRESS); 
    } catch (error) {
      console.error('Error adding address:', error);
    }
  }

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('common:text-add-delivery-address')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-6">
          <Input
            variant="solid"
            label="customer Name"
            {...register('houseName', { required: 'houseName name is required' })}
            error={errors.houseName?.message}
            lang={lang}
          />
        </div>

        <div className="grid grid-cols-1 mb-6 gap-7">
          <TextArea
            label="Address"
            {...register('address', {
              required: 'Address is required',
            })}
            error={errors.address?.message}
            className="text-brand-dark"
            variant="solid"
            lang={lang}
          />
        </div>

        <div className="mb-6">
          <Input
            variant="solid"
            label="Phone"
            {...register('phoneNumber', {
              required: 'Phone number is required',
              minLength: {
                value: 10,
                message: 'Phone number must be exactly 10 digits',
              },
              maxLength: {
                value: 10,
                message: 'Phone number must be exactly 10 digits',
              },
              pattern: {
                value: /^[0-9]+$/,
                message: 'Phone number must contain only digits',
              },
            })}
            error={errors.phoneNumber?.message}
            lang={lang}
          />
        </div>
        <div className="mb-6">
          <Input
            variant="solid"
            label="landMark"
            {...register('landMark', { required: 'City is required' })}
            error={errors.landMark?.message}
            lang={lang}
          />
        </div>
        <div className="mb-6">
          <Input
            variant="solid"
            label="pinCode"
            {...register('pinCode', { required: 'pinCode is required' })}
            error={errors.pinCode?.message}
            lang={lang}
          />
        </div>
        <div className="flex justify-end w-full">
          <Button className="h-11 md:h-12 mt-1.5" type="submit">
            {t('common:text-save-address')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
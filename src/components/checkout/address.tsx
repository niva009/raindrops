import { useAddressQuery } from '@framework/address/address';
import AddressGrid from '@components/address/address-grid';

const AddressPage: React.FC<{ lang: string }> = ({ lang }) => {
  let { data, isLoading } = useAddressQuery();

  console.log("address data..:", data);
  return !isLoading ? (
    <AddressGrid address={data} lang={lang} />
  ) : (
    <div>Loading...</div>
  );
};

export default AddressPage;

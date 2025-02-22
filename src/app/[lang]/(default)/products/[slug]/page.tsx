import Container from '@components/ui/container';
import ProductSingleDetails from '@components/product/product';
import ElectronicProductFeed from '@components/product/feeds/popular-products';
import RelatedProductFeedOld from '@components/product/feeds/related-product-feed-old';
import PopularProducts from '@components/product/feeds/popular-product-feed';
import Breadcrumb from '@components/ui/breadcrumb';

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <div className="pt-6 lg:pt-7 pb-10">
        <Container>
          <Breadcrumb lang={lang} />
          <ProductSingleDetails lang={lang} />
          <RelatedProductFeedOld
            uniqueKey="related-products"
            lang={lang}
            className="mb-8 lg:mb-12"
          />
           <PopularProducts lang={lang} className="mb-4 lg:mb-12" /> 
          <ElectronicProductFeed lang={lang}  className="mb-8 lg:mb-12"/>
        </Container>
      </div>
    </>
  );
}

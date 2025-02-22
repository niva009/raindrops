import { CategoryFilter } from './category-filter';
import { BrandFilter } from './brand-filter';
import SelectedFilters from './selected-filters';
import { DietaryFilter } from './dietary-filter';

export const ShopFilters: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <div className="bg-white p-5 rounded">
      <SelectedFilters lang={lang} />
      <CategoryFilter lang={lang} />
      <DietaryFilter lang={lang} />
      <BrandFilter lang={lang} />
    </div>
  );
};

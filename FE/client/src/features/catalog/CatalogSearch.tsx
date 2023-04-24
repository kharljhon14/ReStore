import Input from '@/components/inputs/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { set } from '@/redux/actions';
import { IFilterParams } from '@/types/filterParams';
import { useState } from 'react';

export default function CatalogSearch() {
  const productFilter = useAppSelector((state) => state.main.productFilter);
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState(productFilter.SearchTerm ?? '');

  const handleKeyPress = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();

      const filters: IFilterParams = {
        ...productFilter,
        SearchTerm: searchValue,
      };

      dispatch(set(filters));
      evt.currentTarget.blur();
    }
  };

  return (
    <form>
      <Input
        className="border py-3 px-4 rounded-md"
        name="SearchParam"
        id=""
        type="input"
        placeholder="Search"
        onKeyDown={handleKeyPress}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
}

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '../buttons/Button';
import { IPagination } from '@/types/pagination';
import { IFilterParams } from '@/types/filterParams';
interface Props {
  pagination: IPagination;
  handlePagination: (filter: IFilterParams) => void;
}

export default function Pagination({ pagination, handlePagination }: Props) {
  const pages = Array.from({ length: pagination.totalPages! }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center py-5 space-x-5 text-primary">
      <FiChevronLeft size={30} />
      <ul className="flex text-neutral space-x-2 text-xs">
        {pages.map((page) => (
          <li key={page}>
            <Button onClick={() => handlePagination({ PageNumber: page })} disabled={pagination.currentPage === page}>
              {page}
            </Button>
          </li>
        ))}
      </ul>
      <FiChevronRight size={30} />
    </div>
  );
}

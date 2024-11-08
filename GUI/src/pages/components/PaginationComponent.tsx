import { Pagination } from "flowbite-react";

interface IPaginationMyProps {
  currentPage: number;
  pagesAmmount: number;
  onPageChange: (page: number) => void;
}

export const PaginationMy: React.FC<IPaginationMyProps> = ({
  currentPage,
  pagesAmmount,
  onPageChange,
}) => {
  return (
    <Pagination
      layout="pagination"
      currentPage={currentPage}
      totalPages={pagesAmmount}
      onPageChange={onPageChange}
      previousLabel="Go back"
      nextLabel="Go forward"
    />
  );
};

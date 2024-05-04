import PropertyItem from '@/src/page-components/Home/Properties/PropertyItem/PropertyItem'
import React, { ChangeEvent, useState } from 'react'
import { Pagination } from '@mui/material';

const Properties = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 mt-5">
        <PropertyItem />
        <PropertyItem />
        <PropertyItem />
        <PropertyItem />
        <PropertyItem />
      </div>
      <div className="py-8 flex items-center">
        <Pagination
          color="primary"
          count={10}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ width: '100%', mx: 'auto' }}
        />
      </div>
    </>
  )
}

export default Properties

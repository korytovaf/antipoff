import { useMemo } from 'react';

export const usePagination = (page, total_pages, maxVisiblePage) => {

  return useMemo(() => {
    let listOfPages = [...new Array(total_pages)].map((_, i) => i + 1);

    const startInit = page - maxVisiblePage + 1;
    const start = startInit < 0 ? 0 : startInit;

    const endInit = page + maxVisiblePage - 2;
    const end = endInit < maxVisiblePage ? maxVisiblePage : endInit;

    listOfPages = listOfPages.slice(start, end);

    return { listOfPages, start };
    }, [maxVisiblePage, page, total_pages]);

};

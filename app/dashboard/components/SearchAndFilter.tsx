
'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'

interface SearchAndFilterProps {
  currentSearch: string
  currentCategory: string
  categories: string[] // Pass categories from server to client
}

// NOTE: Added a simple Pagination component here for completeness
interface PaginationProps {
    totalPages: number;
    currentPage: number;
}
const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                Previous
            </Button>
            <span className="text-sm">
                Page {currentPage} of {totalPages}
            </span>
            <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                Next
            </Button>
        </div>
    )
}

export function SearchAndFilter({ currentSearch, currentCategory, categories }: SearchAndFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    
    params.set('page', '1') // 🔑 IMPORTANT: Reset to page 1 on search/filter change
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // `router.replace` updates the URL without adding a new entry to the history stack
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    updateUrl('search', event.target.value)
  }
  
  const handleCategoryChange = (value: string) => {
    // If selecting 'all', pass an empty string to remove the category param
    updateUrl('category', value === 'all' ? '' : value)
  }

  return (
    <div className='flex gap-2'>
      <Input
        type='search'
        placeholder='Search by title...'
        className='max-w-sm'
        onChange={handleSearch}
        // Controlled components are better, but for URL sync, defaultValue works well
        defaultValue={currentSearch} 
      />
      
      <Select onValueChange={handleCategoryChange} value={currentCategory || 'all'}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Filter by Category' />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value='all'>All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

// Export Pagination separately for use in the main page component
export { Pagination }
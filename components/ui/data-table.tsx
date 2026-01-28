'use client'

import * as React from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { SimplePagination } from '@/components/ui/pagination'

export interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  searchable?: boolean
  render?: (item: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  searchable?: boolean
  searchPlaceholder?: string
  selectable?: boolean
  onSelectionChange?: (selectedItems: T[]) => void
  pagination?: {
    pageSize: number
    pageSizeOptions?: number[]
  }
  emptyMessage?: string
  className?: string
}

type SortDirection = 'asc' | 'desc' | null

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  keyField,
  searchable = false,
  searchPlaceholder = 'Search...',
  selectable = false,
  onSelectionChange,
  pagination,
  emptyMessage = 'No data available',
  className,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)
  const [selectedKeys, setSelectedKeys] = React.useState<Set<unknown>>(new Set())
  const [currentPage, setCurrentPage] = React.useState(1)

  // Filter data based on search
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data

    const searchableColumns = columns.filter((col) => col.searchable !== false)
    return data.filter((item) =>
      searchableColumns.some((col) => {
        const value = item[col.key]
        return String(value).toLowerCase().includes(searchQuery.toLowerCase())
      })
    )
  }, [data, searchQuery, columns])

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDirection) return filteredData

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (aVal === bVal) return 0
      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1

      const comparison = aVal < bVal ? -1 : 1
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortKey, sortDirection])

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData

    const startIndex = (currentPage - 1) * pagination.pageSize
    return sortedData.slice(startIndex, startIndex + pagination.pageSize)
  }, [sortedData, currentPage, pagination])

  const totalPages = pagination
    ? Math.ceil(sortedData.length / pagination.pageSize)
    : 1

  // Reset page when data changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortKey, sortDirection])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortKey(null)
        setSortDirection(null)
      }
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = new Set(paginatedData.map((item) => item[keyField]))
      setSelectedKeys(allKeys)
      onSelectionChange?.(paginatedData)
    } else {
      setSelectedKeys(new Set())
      onSelectionChange?.([])
    }
  }

  const handleSelectItem = (item: T, checked: boolean) => {
    const newSelectedKeys = new Set(selectedKeys)
    const key = item[keyField]

    if (checked) {
      newSelectedKeys.add(key)
    } else {
      newSelectedKeys.delete(key)
    }

    setSelectedKeys(newSelectedKeys)
    onSelectionChange?.(
      data.filter((item) => newSelectedKeys.has(item[keyField]))
    )
  }

  const allSelected = paginatedData.length > 0 &&
    paginatedData.every((item) => selectedKeys.has(item[keyField]))
  const someSelected = paginatedData.some((item) => selectedKeys.has(item[keyField]))

  return (
    <div className={cn('space-y-4', className)}>
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3 text-left">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected && !allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-left text-sm font-medium text-muted-foreground',
                    column.className
                  )}
                >
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8 hover:bg-transparent"
                      onClick={() => handleSort(column.key)}
                    >
                      {column.header}
                      {sortKey === column.key ? (
                        sortDirection === 'asc' ? (
                          <ArrowUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-2 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                      )}
                    </Button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={String(item[keyField])}
                  className={cn(
                    'hover:bg-muted/50',
                    selectedKeys.has(item[keyField]) && 'bg-muted/30'
                  )}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedKeys.has(item[keyField])}
                        onChange={(e) => handleSelectItem(item, e.target.checked)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn('px-4 py-3 text-sm', column.className)}
                    >
                      {column.render
                        ? column.render(item)
                        : String(item[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <SimplePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedData.length}
          itemsPerPage={pagination.pageSize}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

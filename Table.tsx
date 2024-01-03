/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-array-index-key */
import type {ExpandedState} from '@tanstack/react-table';
import {flexRender, getCoreRowModel, getExpandedRowModel, useReactTable} from '@tanstack/react-table';
import React, {useState} from 'react';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import {useVirtual} from 'react-virtual';
import {Flex} from 'reflexbox';

import {
  StyledChevron,
  StyledTable,
  StyledTableBody,
  StyledTableBodyCell,
  StyledTableBodyRow,
  StyledTableBodySubRow,
  StyledTableHead,
  StyledTableHeadCell,
  StyledTableWrap,
} from './styled';
import {TableSpinner} from './TableSpinner';
import type {TableProps} from './types';
import {useEventListener} from '../../../react';
import {getTableCbxCellStyle, getTableCellStyle} from '../../lib';
import {Button} from '../Button';
import {Checkbox} from '../Checkbox';
import {EmptyContentPlaceholder} from '../EmptyContentPlaceholder';
import {Skeleton} from '../Skeleton';
import {Spacer} from '../Spacer';

export {type TableProps};

export {TableSpinner};

export function Table<D extends Record<string, any>, ED extends Record<string, any>>({
  isLoading,
  isLoadingRows,
  isExpandable,
  className,
  loadingRows = 5,
  onBottom,
  renderExpandedRow,
  bottomOffset = 100,
  setRowSelection,
  rowSelection,
  extraData,
  updateExtraData = () => {},
  offsetY,
  getRowStyles,
  disableOverflow,
  estimatedRowSize,
  ...props
}: TableProps<D, ED>) {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const {getHeaderGroups, getRowModel, getIsAllRowsSelected, getIsSomeRowsSelected, toggleAllRowsSelected} =
    useReactTable({
      ...props,
      getCoreRowModel: getCoreRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      onExpandedChange: setExpanded,
      onRowSelectionChange: setRowSelection,
      state: {
        expanded,
        rowSelection,
      },
      meta: {
        getExtraData: () => extraData ?? {},
        updateExtraData,
      },
    });

  const handleBottom = () => {
    if (!isLoadingRows && !isLoading) {
      onBottom?.();
    }
  };

  const parentRef = useBottomScrollListener<HTMLDivElement>(handleBottom, {
    offset: bottomOffset,
    debounceOptions: {
      leading: false,
    },
  });

  useEventListener('keydown', e => {
    if (e.key === 'Tab' && rowSelection && setRowSelection) {
      e.preventDefault();

      const selectionKeys = Object.entries(rowSelection)
        .filter(([, value]) => value)
        .map(([key]) => Number(key));

      const start = Math.min(...selectionKeys);
      const end = Math.max(...selectionKeys);

      const newSelection = {} as Record<string, true>;
      for (let i = start; i <= end; i += 1) {
        newSelection[i] = true;
      }

      setRowSelection(newSelection);
    }
  });

  const isEmpty = !isLoading && getRowModel().rows.length === 0;

  const {virtualItems, totalSize} = useVirtual({
    parentRef,
    size: getRowModel().rows.length,
    estimateSize: React.useCallback(() => estimatedRowSize, [estimatedRowSize]),
  });

  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const paddingBottom = virtualItems.length > 0 ? totalSize - virtualItems[virtualItems.length - 1].end : 0;

  return (
    <StyledTableWrap
      ref={parentRef}
      $disableOverflow={disableOverflow}
      $isEmptyTable={!props.data.length}
      $offsetY={offsetY}
      className={className}
    >
      <StyledTable>
        <StyledTableHead>
          {getHeaderGroups().map(headerGroup => (
            <Flex key={headerGroup.id} alignItems="center">
              {setRowSelection && (
                <StyledTableHeadCell style={getTableCbxCellStyle()}>
                  <Checkbox
                    checked={getIsAllRowsSelected()}
                    indeterminate={getIsSomeRowsSelected()}
                    onCheckedChange={value => toggleAllRowsSelected(!!value)}
                  />
                </StyledTableHeadCell>
              )}

              {headerGroup.headers.map(header => {
                const {size, minSize, maxSize} = header.column.columnDef;
                const flexGrow = header.column.columnDef.meta?.flexGrow;

                return (
                  <StyledTableHeadCell key={header.id} style={getTableCellStyle({size, maxSize, minSize, flexGrow})}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </StyledTableHeadCell>
                );
              })}

              {isExpandable && <StyledTableHeadCell style={{width: 66, minWidth: 66}} />}
            </Flex>
          ))}
        </StyledTableHead>

        <StyledTableBody isEmpty={isEmpty}>
          {isEmpty && <EmptyContentPlaceholder />}

          {isLoading &&
            new Array(loadingRows).fill(1).map((_, i) => (
              <Flex key={i}>
                {getHeaderGroups()[0].headers.map((__, cellI) => (
                  <StyledTableBodyCell key={cellI}>
                    <Skeleton height={20} />
                  </StyledTableBodyCell>
                ))}
              </Flex>
            ))}

          <div style={{paddingTop, paddingBottom}}>
            {!isLoading &&
              virtualItems.map(virtualRow => {
                const row = getRowModel().rows[virtualRow.index];

                return (
                  <StyledTableBodyRow key={row.id} style={getRowStyles ? getRowStyles?.(row) : row.original.rowStyle}>
                    <Flex>
                      {setRowSelection && (
                        <StyledTableBodyCell style={getTableCbxCellStyle()}>
                          <Checkbox
                            checked={row.getIsSelected()}
                            disabled={!row.getCanSelect()}
                            onCheckedChange={value => row.toggleSelected(!!value)}
                          />
                        </StyledTableBodyCell>
                      )}

                      {row.getVisibleCells().map(cell => {
                        const {size, maxSize, minSize} = cell.column.columnDef;
                        const flexGrow = cell.column.columnDef.meta?.flexGrow;

                        return (
                          <StyledTableBodyCell
                            key={cell.id}
                            style={getTableCellStyle({size, maxSize, minSize, flexGrow})}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </StyledTableBodyCell>
                        );
                      })}

                      {isExpandable && (
                        <StyledTableBodyCell style={{justifyContent: 'flex-end', width: 66}}>
                          <Button
                            onlyIcon
                            size="s"
                            variant="secondary"
                            onClick={() => {
                              row.toggleExpanded();
                            }}
                          >
                            <StyledChevron $isExpanded={row.getIsExpanded()} />
                          </Button>
                        </StyledTableBodyCell>
                      )}
                    </Flex>

                    {row.getIsExpanded() && renderExpandedRow && (
                      <>
                        <Spacer size={12} />
                        <StyledTableBodySubRow>{renderExpandedRow(row)}</StyledTableBodySubRow>
                      </>
                    )}
                  </StyledTableBodyRow>
                );
              })}
          </div>

          <TableSpinner isShown={isLoadingRows} scrollRef={parentRef} />
        </StyledTableBody>
      </StyledTable>
    </StyledTableWrap>
  );
}

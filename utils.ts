import type {Table} from '@tanstack/react-table';
import type {CSSProperties} from 'styled-components';

export const getTableCellStyle = ({
  size,
  minSize,
  maxSize,
  flexGrow = 1,
}: {
  size?: number | string;
  minSize?: number | string;
  maxSize?: number | string;
  flexGrow?: number;
}): CSSProperties => ({
  width: size,
  maxWidth: maxSize,
  minWidth: minSize,
  flexGrow,
});

export const getTableCbxCellStyle = (): CSSProperties => ({
  flex: '40px 0 auto',
  minWidth: 0,
  width: 40,
});

export const getTableExtraDataModel = <D extends Record<string, any>>(table: Table<D>, name: string) => ({
  value: table.options.meta?.getExtraData()[name],
  onChange: <V extends any>(value: V) => {
    table.options.meta?.updateExtraData(name, value);
  },
});

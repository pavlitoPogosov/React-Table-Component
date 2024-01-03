import type {Row, RowSelectionState, TableOptions} from '@tanstack/react-table';
import type {ReactNode, Dispatch, SetStateAction, CSSProperties} from 'react';

import type {NewInputProps} from '../../NewInput';
import type {NewSelectProps} from '../../NewSelect';

export type TableProps<D extends Record<string, any>, ED extends Record<string, any>> = Pick<
  TableOptions<D>,
  'columns' | 'data'
> & {
  estimatedRowSize: number;
  isLoading?: boolean;
  isLoadingRows?: boolean;
  isExpandable?: boolean;
  loadingRows?: number;
  className?: string;
  bottomOffset?: number;

  rowSelection?: RowSelectionState;
  setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>;

  extraData?: ED;
  updateExtraData?: (key: keyof ED, value: ED[keyof ED]) => void;

  onBottom?: () => void;
  renderExpandedRow?: (row: Row<D>) => ReactNode;

  getRowStyles?: (row: Row<D>) => CSSProperties | undefined;
  offsetY?: number;

  disableOverflow?: boolean;
};

export type TableHeadInputProps = Omit<
  NewInputProps<string>,
  'onChange' | 'onChangeValue' | 'variant' | 'defaultValue' | 'size'
> & {
  onChange?: (value: string) => void;
  debounceInterval?: number;
};

export type TableHeadSelectProps<V> = Omit<NewSelectProps<V>, 'variant' | 'size'> & {
  debounceInterval?: number;
};

export type TableHeadAsyncSelectProps<V> = Omit<NewSelectProps<V>, 'variant' | 'size'> & {
  debounceInterval?: number;
};

import styled, {css} from 'styled-components';

import {COLOR, FONT_SIZE, FONT_WEIGHT} from '../../../lib';
import {ChevronDownSvg} from '../../icons';

export const StyledTableWrap = styled.div<{$offsetY?: number; $disableOverflow?: boolean; $isEmptyTable?: boolean}>`
  overflow-x: ${({$disableOverflow}) => ($disableOverflow ? 'unset' : 'auto')};
  overflow-y: ${({$disableOverflow}) => ($disableOverflow ? 'unset' : 'auto')};
  border: 1px solid ${COLOR.gray[10]};
  border-radius: 8px;
  background-color: white;
  ${({$offsetY, $isEmptyTable}) =>
    typeof $offsetY !== 'undefined'
      ? css`
          height: ${() => ($isEmptyTable ? `calc(100vh - ${$offsetY}px)` : 'auto')};
          max-height: calc(100vh - ${$offsetY}px);
          min-height: calc(100vh - ${$offsetY}px);
        `
      : ''}
`;

export const StyledTable = styled.div`
  position: relative;
  width: min-content;
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledTableBodyRow = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${COLOR.gray[10]};

  &:last-of-type {
    border-bottom-color: transparent;
  }
`;

export const StyledTableHead = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100%;
  border-bottom: 1px solid ${COLOR.gray[10]};
  background: ${COLOR.gray[5]};
`;

export const StyledTableBody = styled.div<{isEmpty: boolean}>`
  ${({isEmpty}) =>
    isEmpty &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    `}
`;

const CellBase = css`
  width: 100%;
  font-size: ${FONT_SIZE.m.fontSize};
  line-height: ${FONT_SIZE.m.lineHeight};
`;

export const StyledTableHeadCell = styled.div`
  display: flex;
  padding: 8px 16px;
  color: ${COLOR.gray[50]};
  font-weight: ${FONT_WEIGHT.regular};
  text-align: left;

  ${CellBase}
`;

export const StyledTableBodyCell = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  color: ${COLOR.gray[70]};
  font-weight: ${FONT_WEIGHT.medium};

  ${CellBase}
`;

export const StyledTableBodySubRow = styled.div`
  padding: 0 16px 16px;
`;

export const StyledTableSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
`;

export const StyledChevron = styled(ChevronDownSvg)<{$isExpanded: boolean | undefined}>`
  transform: ${({$isExpanded}) => ($isExpanded ? 'rotate(-180deg)' : 'none')};
`;

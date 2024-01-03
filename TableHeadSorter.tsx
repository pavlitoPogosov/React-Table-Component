import React, {type ReactNode} from 'react';
import {Flex} from 'reflexbox';
import styled from 'styled-components';

import {COLOR, TRANSITION} from '../../lib';
import {ArrowDownSvg, ArrowUpSvg, SorterSvg} from '../icons';
import {Spacer} from '../Spacer';

type TableHeadSorterProps = {
  text?: ReactNode;
  value?: boolean | null;
  onChange?: (value: boolean | null) => void;
};

export function TableHeadSorter({text, value, onChange}: TableHeadSorterProps) {
  const handleClick = () => {
    if (value === null) {
      return onChange?.(true);
    }

    if (value === true) {
      return onChange?.(false);
    }

    onChange?.(null);
  };

  return (
    <Flex alignItems="center">
      {text}

      <Spacer direction="horizontal" size={8} />
      <StyledIcon alignItems="center" justifyContent="center" onClick={handleClick}>
        {value === null && <SorterSvg />}
        {value === true && <ArrowUpSvg />}
        {value === false && <ArrowDownSvg />}
      </StyledIcon>
    </Flex>
  );
}

const StyledIcon = styled(Flex)`
  width: 16px;
  height: 16px;
  color: ${COLOR.gray[50]};
  cursor: pointer;
  transition: color ${TRANSITION.basic};

  &:hover {
    color: ${COLOR.gray[60]};
  }
`;

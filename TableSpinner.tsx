import React, {type RefObject, useEffect} from 'react';

import {StyledTableSpinner} from './styled';
import {Spinner} from '../Spinner';

export function TableSpinner({
  scrollRef,
  isShown,
}: {
  scrollRef: RefObject<HTMLDivElement> | null;
  isShown: boolean | undefined;
}) {
  useEffect(() => {
    if (scrollRef?.current && isShown) {
      // eslint-disable-next-line no-param-reassign
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [scrollRef, isShown]);

  if (!isShown) return null;

  return (
    <StyledTableSpinner>
      <Spinner />
    </StyledTableSpinner>
  );
}

import React from 'react';

import {I18n} from 'shared/i18n';
import {truncateString} from 'shared/string';

import {ButtonCopy} from '../ButtonCopy';
import {Flex} from '../Flex';
import {Spacer} from '../Spacer';
import {Typography} from '../Typography';

export const TableCellWithId = ({id, title}: {id: string; title: string}) => (
  <Flex flexDirection="column">
    <Typography color="gray.90" fontWeight="medium">
      {title}
    </Typography>
    <Spacer size={2} />
    <Flex alignItems="center">
      <Typography color="gray.50">{truncateString(id, 3)}</Typography>
      <Spacer direction="horizontal" size={4} />
      <ButtonCopy text={id}>
        <I18n i18nKey="common.layout.id" />
      </ButtonCopy>
    </Flex>
  </Flex>
);

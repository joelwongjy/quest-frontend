import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useStyles } from './questAccordion.styles';

interface QuestAccordionProps {
  heading: string;
  defaultExpanded?: boolean;
}

const QuestAccordion: React.FunctionComponent<
  QuestAccordionProps & AccordionProps
> = ({ heading, defaultExpanded = true, children, ...props }) => {
  const classes = useStyles();
  return (
    <Accordion
      className={classes.root}
      defaultExpanded={defaultExpanded}
      {...props}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id={`panel-header-${heading}`}
      >
        <Typography className={classes.heading}>{heading}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default QuestAccordion;

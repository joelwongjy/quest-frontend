import React from 'react';
import { Grid, List, ListItem, Typography } from '@material-ui/core';
import { format } from 'date-fns';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestButton from 'componentWrappers/questButton';
import QuestCard from 'componentWrappers/questCard';
import { useUser } from 'contexts/UserContext';
import { AnnouncementMode } from 'interfaces/models/announcements';

interface ConfirmAnnouncementProps {
  breadcrumbs: { text: string; href: string }[];
  title: string;
  startDate: Date;
  programmes: { id: number; name: string }[];
  classes: { id: number; name: string }[];
  handleCancel: () => void;
  handleSubmit: () => void;
  headerClassName?: string;
  listClassName?: string;
  buttonClassName?: string;
  mode: AnnouncementMode;
}

const ConfirmAnnouncement: React.FC<ConfirmAnnouncementProps> = ({
  breadcrumbs,
  title,
  startDate,
  programmes,
  classes,
  handleCancel,
  handleSubmit,
  mode,
  headerClassName,
  listClassName,
  buttonClassName,
}) => {
  const { user } = useUser();
  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ marginTop: '2rem', paddingBottom: '4rem' }}
      >
        <Grid item xs={12} md={9}>
          <QuestCard>
            <Grid item container xs={12} className={headerClassName ?? ''}>
              <Grid container alignItems="center" justify="space-between">
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  {mode === AnnouncementMode.EDIT ? 'Update' : 'Create'}{' '}
                  Announcement
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <List className={listClassName ?? ''}>
                <ListItem>
                  <Typography variant="subtitle1">
                    You are about to{' '}
                    {mode === AnnouncementMode.EDIT
                      ? 'edit the'
                      : 'create a new'}{' '}
                    announcement with the title&nbsp;
                    <span style={{ color: '#044682' }}>{`${title}.`}</span>
                  </Typography>
                </ListItem>
                {(programmes && programmes.length > 0) ||
                (classes && classes.length > 0) ? (
                  <ListItem>
                    <Typography variant="subtitle1">
                      The announcement will be published to&nbsp;
                      <span style={{ color: '#044682' }}>
                        {user!.programmes.map((p) => {
                          const filteredClasses = classes.filter(
                            (c) =>
                              p.classes.findIndex((c2) => c2.id === c.id) !==
                                -1 &&
                              classes?.findIndex((c2) => c2.id === c.id) !== -1
                          );
                          return (
                            <React.Fragment
                              key={`announcement-programme-${p.id}`}
                            >
                              {filteredClasses.map((c, index) => {
                                return (
                                  <React.Fragment
                                    key={`announcement-programme-class-${p.id}-${c.id}`}
                                  >
                                    {`${p.name} - ${c.name}`}
                                    {index === filteredClasses.length - 1
                                      ? '.'
                                      : ','}
                                    &nbsp;
                                  </React.Fragment>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                      </span>
                      Please verify if you have assigned the announcement to the
                      intended recipieints. Else, please click on the back
                      button to change the assignment.
                    </Typography>
                  </ListItem>
                ) : (
                  <ListItem>
                    <Typography variant="subtitle1">
                      <span style={{ color: 'red' }}>
                        NOTE: The announcement is currently not assigned to any
                        class nor programme. You can assign it later when
                        editing it.
                      </span>
                    </Typography>
                  </ListItem>
                )}
                <ListItem>
                  <Typography variant="subtitle1">
                    {mode === AnnouncementMode.EDIT
                      ? 'Once you click on Proceed, the announcement will be updated.'
                      : `Once you click on Proceed, the announcement will be
                    released to the intended recipients automatically on
                    ${format(
                      startDate,
                      'dd MMM yyyy HH:mm'
                    )} with no futher action required.`}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Grid container spacing={2} justify="flex-end">
                    <QuestButton
                      className={buttonClassName ?? ''}
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      Back
                    </QuestButton>
                    <QuestButton
                      className={buttonClassName ?? ''}
                      onClick={handleSubmit}
                      disableElevation
                    >
                      Proceed
                    </QuestButton>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
          </QuestCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
export default ConfirmAnnouncement;

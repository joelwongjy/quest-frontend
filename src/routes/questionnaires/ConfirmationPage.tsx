import React from 'react';
import { format } from 'date-fns';
import { Grid, List, ListItem, Typography } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestCard from 'componentWrappers/questCard';
import QuestButton from 'componentWrappers/questButton';
import { QuestionnaireDux } from 'reducers/questionnaireDux';
import { useUser } from 'contexts/UserContext';
import { QuestionnaireMode } from 'interfaces/models/questionnaires';

interface ConfirmationPageProps {
  breadcrumbs: { text: string; href: string }[];
  questionnaire: QuestionnaireDux;
  handleCancel: () => void;
  handleSubmit: () => void;
  headerClassName?: string;
  listClassName?: string;
  buttonClassName?: string;
  mode: QuestionnaireMode;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  breadcrumbs,
  questionnaire,
  handleCancel,
  handleSubmit,
  mode,
  headerClassName,
  listClassName,
  buttonClassName,
}) => {
  const user = useUser();
  const { title, programmes, classes } = questionnaire;
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
                  {mode === QuestionnaireMode.EDIT ? 'Update' : 'Create'}{' '}
                  Questionnaire
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <List className={listClassName ?? ''}>
                <ListItem>
                  <Typography variant="subtitle1">
                    You are about to{' '}
                    {mode === QuestionnaireMode.EDIT
                      ? 'edit the'
                      : 'create a new'}{' '}
                    questionnaire with the title&nbsp;
                    <span style={{ color: '#044682' }}>{`${title}.`}</span>
                  </Typography>
                </ListItem>
                {programmes && programmes.length > 0 ? (
                  <ListItem>
                    <Typography variant="subtitle1">
                      The questionnaire is assigned to&nbsp;
                      <span style={{ color: '#044682' }}>
                        {user!.programmes.map((p) => {
                          const filteredClasses = classes.filter(
                            (c) =>
                              p.classes.findIndex((c2) => c2.id === c.id) !==
                                -1 &&
                              classes?.findIndex((c2) => c2.id === c.id) !== -1
                          );
                          return (
                            <>
                              {filteredClasses.map((c, index) => {
                                return (
                                  <>
                                    {`${p.name} - ${c.name}`}
                                    {index === filteredClasses.length - 1
                                      ? '.'
                                      : ','}
                                    &nbsp;
                                  </>
                                );
                              })}
                            </>
                          );
                        })}
                      </span>
                      Please verify if you have assigned the questionnaire to
                      the intended recipieints. Else, please click on the back
                      button to change the assignment.
                    </Typography>
                  </ListItem>
                ) : (
                  <ListItem>
                    <Typography variant="subtitle1">
                      <span style={{ color: 'red' }}>
                        NOTE: The questionnaire is currently not assigned to any
                        class nor programme. You can assign it later when
                        editing it.
                      </span>
                    </Typography>
                  </ListItem>
                )}
                <ListItem>
                  <Typography variant="subtitle1">
                    {mode === QuestionnaireMode.EDIT
                      ? 'Once you click on Proceed, the questionnaire will be updated. All existing submissions will remain unchanged. Only new submissions will be affected.'
                      : `Once you click on Proceed, the questionnaire will be
                    released to the intended recipients automatically on
                    ${format(
                      new Date(questionnaire.questionWindows[0].startAt),
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
export default ConfirmationPage;

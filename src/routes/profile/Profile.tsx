import React, { useReducer } from 'react';
import {
  FormControl,
  FormHelperText,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { differenceInCalendarYears } from 'date-fns';

import femaleKnight from 'assets/images/student/female-knight.png';
import maleKnight from 'assets/images/student/male-knight.png';
import sword from 'assets/images/student/sword-black.png';
import PageContainer from 'components/pageContainer';
import StudentBoard from 'components/studentBoard';
import QuestButton from 'componentWrappers/questButton';
import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import { useError } from 'contexts/ErrorContext';
import { useUser } from 'contexts/UserContext';
import { Gender, PersonPostData } from 'interfaces/models/persons';
import { DefaultUserRole } from 'interfaces/models/users';
import { validatePersonInfo } from 'utils/personUtils';
import { isValidEmail, isValidMobileNumber } from 'utils/studentUtils';

import { useStyles } from './profile.styles';

export interface ProfileState extends Omit<PersonPostData, 'birthday'> {
  birthday: Date | null;
}

const Profile: React.FC = () => {
  const { user } = useUser();
  const classes = useStyles();
  const { hasError, setHasError } = useError();
  const [state, setState] = useReducer(
    (s: ProfileState, a: Partial<ProfileState>) => ({
      ...s,
      ...a,
    }),
    {
      name: user?.name ?? '',
      gender: user?.gender ?? Gender.MALE,
      birthday: user?.birthday ? new Date(user.birthday) : null,
      mobileNumber: user?.mobileNumber ?? '',
      homeNumber: user?.homeNumber ?? '',
      email: user?.email ?? '',
      programmes: [],
    }
  );

  const handleSave = async () => {
    if (!validatePersonInfo(state)) {
      setHasError(true);
    }
  };

  if (user?.user?.appRole === DefaultUserRole.ADMIN) {
    return (
      <PageContainer>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ marginTop: '2rem', paddingBottom: '4rem' }}
        >
          <Grid item xs={12} md={9}>
            <QuestCard>
              <Grid item container xs={12} className={classes.header}>
                <Grid container alignItems="center" justify="space-between">
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ color: 'white' }}
                  >
                    Profile - Admin
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <List className={classes.list}>
                  <ListItem>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">Name: </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <div className={classes.textfieldContainer}>
                          <FormControl
                            style={{ width: '100%' }}
                            error={hasError && state.name === ''}
                          >
                            <QuestTextField
                              required
                              size="small"
                              value={state.name}
                              className={classes.textfield}
                              label="Name"
                              variant="outlined"
                              onChange={(e) =>
                                setState({ name: e.target.value })
                              }
                            />
                            {hasError && state.name === '' && (
                              <FormHelperText>
                                The name cannot be blank!
                              </FormHelperText>
                            )}
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">Gender: </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl
                          variant="outlined"
                          size="small"
                          className={classes.textfieldContainer}
                          color="secondary"
                          error={hasError && state.gender === ''}
                        >
                          <Select
                            id="gender-select"
                            value={state.gender}
                            onChange={(
                              event: React.ChangeEvent<{ value: unknown }>
                            ) => {
                              setState({
                                gender: event.target.value as string,
                              });
                            }}
                          >
                            <MenuItem value={Gender.MALE}>Male</MenuItem>
                            <MenuItem value={Gender.FEMALE}>Female</MenuItem>
                          </Select>
                          {hasError && state.gender === '' && (
                            <FormHelperText>
                              The gender cannot be blank!
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">Birthday: </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl
                          style={{ width: '100%' }}
                          error={hasError && state.birthday === null}
                        >
                          <DatePicker
                            disableFuture
                            allowKeyboardControl={false}
                            renderInput={(props) => (
                              <TextField
                                variant="outlined"
                                style={{ display: 'flex' }}
                                size="small"
                                color="secondary"
                                {...props}
                              />
                            )}
                            value={state.birthday}
                            onChange={(newDate: Date | null) => {
                              setState({ birthday: newDate });
                            }}
                          />
                          {hasError && state.birthday === null && (
                            <FormHelperText>
                              The birthday cannot be blank!
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">
                          Mobile Number:{' '}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <div className={classes.textfieldContainer}>
                          <FormControl
                            style={{ width: '100%' }}
                            error={
                              hasError &&
                              state.mobileNumber !== undefined &&
                              !isValidMobileNumber(state.mobileNumber)
                            }
                          >
                            <QuestTextField
                              size="small"
                              className={classes.textfield}
                              label="Mobile Number"
                              variant="outlined"
                              onChange={(e) =>
                                setState({ mobileNumber: e.target.value })
                              }
                            />
                            {hasError &&
                              state.mobileNumber &&
                              !isValidMobileNumber(state.mobileNumber!) && (
                                <FormHelperText>
                                  The name cannot be blank!
                                </FormHelperText>
                              )}
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">
                          Home Number:{' '}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <div className={classes.textfieldContainer}>
                          <FormControl
                            style={{ width: '100%' }}
                            error={
                              hasError &&
                              !isValidMobileNumber(state.homeNumber!)
                            }
                          >
                            <QuestTextField
                              size="small"
                              className={classes.textfield}
                              label="Home Number"
                              variant="outlined"
                              onChange={(e) =>
                                setState({ homeNumber: e.target.value })
                              }
                            />
                            {hasError &&
                              state.homeNumber &&
                              !isValidMobileNumber(state.homeNumber!) && (
                                <FormHelperText>
                                  Please enter a valid home number!
                                </FormHelperText>
                              )}
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">Email: </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <div className={classes.textfieldContainer}>
                          <FormControl
                            style={{ width: '100%' }}
                            error={hasError && !isValidEmail(state.email!)}
                          >
                            <QuestTextField
                              size="small"
                              className={classes.textfield}
                              label="Email"
                              variant="outlined"
                              onChange={(e) =>
                                setState({ email: e.target.value })
                              }
                            />
                            {hasError &&
                              state.email &&
                              !isValidEmail(state.email) && (
                                <FormHelperText>
                                  Please enter a valid email address!
                                </FormHelperText>
                              )}
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={2} justify="flex-end">
                      <QuestButton
                        className={classes.button}
                        onClick={handleSave}
                      >
                        Save
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
  }

  return (
    <PageContainer hasContentPadding={false}>
      <div className={classes.root}>
        <Grid xs={12} sm={10} md={9} lg={8} item>
          <StudentBoard title="Profile" className={classes.profile}>
            <ul className={classes.scrollable}>
              <Grid
                container
                alignItems="center"
                className={classes.topContainer}
              >
                <Grid item xs={6}>
                  <QuestCard className={classes.card}>
                    <Grid container justify="center" alignItems="center">
                      <img
                        src={
                          user!.gender === Gender.MALE
                            ? maleKnight
                            : femaleKnight
                        }
                        alt="Knight"
                        className={classes.avatar}
                      />
                    </Grid>
                  </QuestCard>
                </Grid>
                <Grid item xs={6}>
                  <List dense>
                    <ListItem className={classes.item}>
                      <ListItemText
                        primary={`Name: ${user?.name}`}
                        style={{ fontSize: '1.5vw' }}
                      />
                    </ListItem>
                    <ListItem className={classes.item}>
                      <ListItemText
                        primary={`Age: ${
                          user?.birthday
                            ? differenceInCalendarYears(
                                user?.birthday as Date,
                                new Date()
                              )
                            : 'Unknown'
                        }`}
                      />
                    </ListItem>
                    <ListItem className={classes.item}>
                      <ListItemText
                        primary={`Birthday: ${user?.birthday ?? 'Unknown'}`}
                      />
                    </ListItem>
                    <ListItem className={classes.item}>
                      <ListItemText
                        primary={`Emergency Contact: ${
                          user?.mobileNumber ?? 'Unknown'
                        }`}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <div className={classes.programmeBarContainer}>
                <div className={classes.programmeBarText}>
                  Programmes & Classes
                </div>
              </div>
              <Grid
                container
                spacing={0}
                justify="center"
                className={classes.programmeClassCardContainer}
              >
                {user?.programmes.map((p) =>
                  p.classes.map((c) => (
                    <Grid
                      item
                      xs={12}
                      md={10}
                      lg={6}
                      key={`card-${p.id}-${c.id}`}
                    >
                      <QuestCard className={classes.programmeClassCard}>
                        <Grid
                          container
                          style={{
                            alignItems: 'center',
                            paddingLeft: '1rem',
                          }}
                        >
                          <Grid item xs={2}>
                            <img
                              src={sword}
                              alt="sword"
                              style={{ maxWidth: '75%' }}
                            />
                          </Grid>
                          <Grid item xs={10}>
                            <List>
                              <ListItem>{`${p.name} - ${c.name}`}</ListItem>
                            </List>
                          </Grid>
                        </Grid>
                      </QuestCard>
                    </Grid>
                  ))
                )}
              </Grid>
            </ul>
          </StudentBoard>
        </Grid>
      </div>
    </PageContainer>
  );
};

export default Profile;

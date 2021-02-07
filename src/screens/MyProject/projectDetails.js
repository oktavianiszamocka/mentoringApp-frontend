import React from 'react';
import { Button, Grid } from '@material-ui/core';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import GitHubIcon from '@material-ui/icons/GitHub';
import AllNotes from '../shared/components/AllNotes';
import Header from '../shared/components/Header';

const StyledSection = styled.section`
  margin: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  width: '50rem';
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledInfoSection = styled.section`
  margin: 2rem;
  padding: 1rem;
  background-color: #d9d9d9;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const projectDetails = ({ projectInfo }) => (
    <div style={{ marginTop: '6rem' }}>
        <Grid container>

            <Header />
            <Grid item xs={3}>
                <AllNotes />
            </Grid>

            <Grid item xs={7}>
                <StyledSection>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Avatar
                                style={{
                                    width: '150px',
                                    height: '150px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <h1
                                style={{
                                    fontFamily: 'sans-serif',
                                    fontWeight: 100,
                                    letterSpacing: '0.3rem',
                                    textTransform: 'uppercase',
                                    fontSize: '35px',
                                    marginLeft: '80px',
                                }}
                            >
                                ... Project Name .....
              </h1>
                        </Grid>

                    </Grid>
                    <StyledInfoSection>
                        <Grid container justify="center">
                            <Grid item xs={11}>
                                <h1>Description</h1>
                            </Grid>

                        </Grid>

                        <Divider />
                        <p>
                            Start Date :

            </p>
                        <p>
                            Approximate End Date :

            </p>
                        <p>Status : </p>
                        <p>
                            Mentor :

            </p>
                        <p>
                            Project Leader :

            </p>

                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                marginTop: '5px',
                                marginLeft: '700px',
                                position: 'relative',
                                height: '20px',
                                width: '10px',
                            }}
                        >
                            Edit
            </Button>

                    </StyledInfoSection>
                    <Grid container justify="center">
                        <GitHubIcon style={{

                            height: '50px',
                            width: '50px',
                        }}
                        />
                    </Grid>
                </StyledSection>
            </Grid>

        </Grid>
    </div>
);
export default projectDetails;
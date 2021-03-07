import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Api from '../../api/index';
import MilestoneInfo from './MilestoneInfo';
import Header from '../shared/components/Header';
import AllNotes from '../shared/components/AllNotes';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '6rem',
    },
    paging: {
        marginTop: 10,
    },
    search: {
        width: 500,
    },

});

const Milestone = () => {
    const classes = useStyles();
    const [milestone, setMilestone] = useState();

    const loadData = async () => {
        const res = await Promise.all([Api.getMilestone()]);
        setMilestone(res[0].data.data);
    };

    useEffect(async () => {
        loadData();
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Header />

                <Grid item xs={3}>
                    <AllNotes />
                </Grid>
                <Grid
                    item
                    xs={3}
                    justify="center"
                    alignItems="center"
                >
                    {milestone && milestone.map((mile) => (
                        <MilestoneInfo milestone={mile} />
                    ))}
                </Grid>

            </Grid>
        </div>
    );
};

export default Milestone;

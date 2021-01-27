import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    minWidth: 275,
    marginTop: 10,
  },
  content: {
    marginLeft: 10,
  },
  cardcontent: {
    margin: 5,
  },

});

const ProjectCard = ({ project }) => {
  const classes = useStyles();
  const startDate = moment(project.startDate).format('LL');
  // const endDate = moment(project.endDate).format('LL');

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.cardcontent}>
        <Typography variant="h6" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Mentor :
          {' '}
          {project.superviserFullName}
          {' '}
          <br />
          Status :
          {' '}
          {project.status}
          {' '}
          <br />
          Description :
          {'     '}

          {project.description}
          {' '}
          <br />
          Start Date :
          {' '}
          {startDate}
          {' '}
          <br />
          End Date :
          {' '}
          {project.endDate}
          {' '}
          <br />

        </Typography>
        <CardActions>
          <Button size="medium">See Detail</Button>
        </CardActions>

      </CardContent>

    </Card>

  );
};

export default ProjectCard;

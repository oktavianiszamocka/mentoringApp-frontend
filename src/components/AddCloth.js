import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {Link} from "react-router-dom";


class DropzoneAreaExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }
  render(){
    return (
      <div>
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        />
        <Box display="flex" justifyContent="right" m={1} p={1}>
          <Button variant="contained" color="primary" component={Link} to="/AddClothSpecs">
            Add
          </Button>
        </Box>
      </div>
    )
  }
}

export default DropzoneAreaExample;
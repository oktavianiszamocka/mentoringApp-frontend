import React from 'react';
import {
    ProgressIndicator,
    ProgressStep,
    
} from 'react-rainbow-components';
import { Button } from '@material-ui/core';
import styled from 'styled-components';


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
  padding: 2rem;
  background-color: #d9d9d9;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledLabels = styled.p`
font-family: sans-serif;
text-transform: uppercase;
color: blue;
letter-spacing: 0.2rem;
font-size: 3em;
text-align: center;

`;

const StyledData = styled.p`
font-family: sans-serif;
color: rgba(0,0,0);
font-size: 1em;
margin-left: 10px;
font-size: 1.5em;
text-align: center;
`;


const StyledButtonSection = styled.section`
  margin: 2rem;
  padding: 1rem;
  width: '50rem';
  text-align: center;
`;


const stepNames = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5'];

const steps = ['first', 'second', 'third', 'fourth', 'fifth'];

class Milestone extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentStepIndex: 0,
        };
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleNextClick() {
        const { currentStepIndex } = this.state;
        if (currentStepIndex < stepNames.length - 1) {
            const nextStepIndex = currentStepIndex + 1;
            return this.setState({ currentStepIndex: nextStepIndex });
        }
        return this.setState({ isNextDisabled: false });
    }

    handleBackClick() {
        const { currentStepIndex } = this.state;
        if (currentStepIndex > 0) {
            const previewStepIndex = currentStepIndex - 1;
            this.setState({ currentStepIndex: previewStepIndex });
        }
    }

    isNextDisabled() {
        const { currentStepIndex } = this.state;
        if (currentStepIndex < stepNames.length - 1 && currentStepIndex >= 0) {
            return false;
        }
        return true;
    }

    isBackDisabled() {
        const { currentStepIndex } = this.state;
        if (currentStepIndex > 0 && currentStepIndex < stepNames.length) {
            return false;
        }
        return true;
    }

    render() {
        const { currentStepIndex, isBackDisabled, isNextDisabled } = this.state;
        return (
            
                 <StyledSection>
                     <StyledLabels>
               Milestone
              </StyledLabels>

                 <StyledInfoSection>
                <ProgressIndicator currentStepName={stepNames[currentStepIndex]}>
                    <ProgressStep name="step-1" />
                    <ProgressStep name="step-2" />
                    <ProgressStep name="step-3" />
                    <ProgressStep name="step-4" />
                    <ProgressStep name="step-5" />
                </ProgressIndicator>
                </StyledInfoSection>

                <StyledInfoSection>

                <StyledData>{`This is the ${steps[currentStepIndex]} step`}</StyledData>
                
                <StyledButtonSection>
                
                    <Button
                        onClick={this.handleBackClick}
                        variant="contained" color="primary" size="large"
                        style={{ margin: '15px'  }}
                        disabled={this.isBackDisabled()}> Back </Button>
                  
                    <Button
                        onClick={this.handleNextClick}
                        variant="contained" color="primary" size="large"
                        disabled={this.isNextDisabled()} > Next </Button>

               </StyledButtonSection>

                </StyledInfoSection>
                </StyledSection>
            
        );
    }
}


export default Milestone;
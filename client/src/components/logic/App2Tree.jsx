import React from "react";
import Question from '../layout/App1q';

class App1LogicTree extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    };

    componentDidUpdate () {
        console.log(this.props)
    }

    componentWillMount () {
        console.log(this.props.answers.length);
    }

    handleQOverride = (e) => {
        console.log('pooo')
        this.props.overrideButtons(e[0],e[1]);
    }

    render () {
        if (this.props.answers.length ===1){
            if (this.props.answers[0]===0){
                return (
                    <Question q={'u'} handleQOverride={['pee','poo']}/>
                )
            }
            else {
                return (
                    <Question q={'q2'} handleQOverride={this.handleQOverride}/>
                )
            }
            
        }
        else {
                return (
                    <Question q={'q0'} handleQOverride={['pee','poo']}/>
                )
                
            
        }
        
    }
}

export default App1LogicTree;
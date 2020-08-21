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

    render () {
        if (this.props.answers.length ===1){
            if (this.props.answers[0]===0){
                return (
                    <Question q={'u'}/>
                )
            }
            else {
                return (
                    <Question q={'q2'} />
                )
            }
            
        }
        else {
                return (
                    <Question q={'q0'} />
                )
                
            
        }
        
    }
}

export default App1LogicTree;
import React from 'react';

class Workspace extends React.Component{
    constructor(props){
        super(props);
        this.state = {name: ''};
    }
    static getDerivedStateFromProps(props, state){
        return null;
    }
    render(){
        return (
            <>
                <h1>Hello {this.state.name} this is My Workspace</h1>
            </>
        )
    }
    componentDidMount(){
        this.setState({name: 'Swaroop'});
    }
    shouldComponentUpdate(){

    }
    getSnapshotBeforeUpdate(){

    }
    componentWillUpdate(){
        
    }
    componentDidUpdate(){

    }
    componentWillUnmount(){

    }
    
}

export default Workspace;
import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../actions/actions.js';
var createReactClass = require('create-react-class');

class Query extends React.Component{
    constructor(props){
        super(props);
        this.state = {initText :"{goldberg(id: 2) {id, character, actor, role, traits}}"};
    }
    componentDidMount() {
        this.props.dispatch(
            getGraph(this.state.initText)
        );
    }

    render() {
        let dispatch = this.props.dispatch;
        let fetchInProgress = String(this.props.store.get('fetching'));
        let queryText;
        let goldberg = this.props.store.get('data').toObject();
        return (
            <div>
                <p>Fetch in progress: {fetchInProgress}</p>
                <h3>{goldberg.character}</h3>
                <p>{goldberg.actor}</p>
                <p>{goldberg.role}</p>
                <p>{goldberg.traits}</p>
                <textarea ref={node => { queryText = node }} defaultValue={this.state.initText}></textarea>
                <br/>
                <button onClick={() => {
                    dispatch(getGraph(queryText.value))
                }
                }>
                    query
            </button>
            <pre>this is debugger:<br/>{JSON.stringify(goldberg, null, 2)}</pre>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        store: state
    }
};

export const QueryContainer = connect(
    mapStateToProps
)(Query);
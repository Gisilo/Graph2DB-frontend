import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveProject } from '../redux/actions/SaveAction';

function mapStateToProps(state, ownProps) {
	return {
		numero: state.numero
	}
}

const actionCreators = { // this is the mapDispatchToProps
	saveProject          // it just needs the name of the actions
}


class ButtonRedux extends React.Component {

	render() {
		return (
			<Button onClick={this.props.saveProject} className="px-5" variant="success">
				{this.props.text} {this.props.numero} </Button>
		);
	}

}

export default connect(mapStateToProps, actionCreators)(ButtonRedux);

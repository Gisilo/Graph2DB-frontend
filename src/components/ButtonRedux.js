import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

function mapStateToProps(state, ownProps) {
	return {
		nameProject: state.nameProject
	}
}

class ButtonRedux extends React.Component {

	render() {
		return (
			<Button onClick={() => console.log("Sono simonfox")} className="px-5" variant={this.props.variant}>
				{this.props.text}
			</Button>
		);
	}

}

export default connect(mapStateToProps, null)(ButtonRedux);

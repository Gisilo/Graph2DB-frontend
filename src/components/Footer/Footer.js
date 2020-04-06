import React from 'react';

export class Footer extends React.Component {


	render() {
		return (
			<footer
				// style={{
				// 	boxShadow: "0 -8px 16px rgba(0,0,0,.15)"
				// }}
				className="bg-primary container-fluid text-center text-md-left font-small info pt-2 shadow-lg
				rounded border-info">

				<div className="row justify-content-md-around">

					<div className="col-md-6">

						<h5 className="text-uppercase">Gisilo</h5>
						<p>Slogan to be found? Or something else</p>

					</div>

					<div className="col-md-3 mb-md-0 mb-1">

						<h5 className="text-uppercase">Connect</h5>

						<ul className="list-unstyled">
							<li href="#!">Meet the team</li>
							<li href="#!">Contacts Us</li>
							<li>TODO: riga con icone github e altri social</li>
						</ul>
					</div>

				</div>

				<div className="footer-copyright text-center pb-2">© 2020 Copyright: Gisilo</div>
			</footer>
		);
	}

}

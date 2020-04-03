import React from 'react';

export class Footer extends React.Component {


	render() {
		return (
			<footer style={{bottom: 0, position: "absolute", 
											boxShadow: "0 -8px 16px rgba(0,0,0,.15)"}} 
			className="page-foot container-fluid text-center text-md-left font-small blue pt-4">

					<div className="row justify-content-md-around">

						<div className="col-md-6 mt-md-0 mt-3">

							<h5 className="text-uppercase">GISILO</h5>
							<p>Slogan to be found? Or something else</p>

						</div>

						<div className="col-md-3 mb-md-0 mb-3">

							<h5 className="text-uppercase">CONNECT</h5>

							<ul className="list-unstyled">
								<li>
									<a href="#!">Meet the team</a>
								</li>
								<li>
									<a href="#!">Contacts Us</a>
								</li>
								<li>
								TODO: metti riga con icone github e altri social che non abbiamo
								</li>
							</ul>

						</div>

					</div>

				<div className="footer-copyright text-center py-3">© 2020 Copyright: Gisilo</div>
			</footer>
		);
	}

}

import { BrowserRouter, Route } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { Nomination } from './Pages/Nomination';
import { Results } from './Pages/Results';
import { Banner } from './Components/Banner';

import { BannerContextProvider } from './Context/BannerContext';

function App() {
	return (
		<BannerContextProvider>
			<Banner />
			<Container>
				<BrowserRouter>
					<Route exact path="/" component={Nomination} />
					<Route exact path="/results" component={Results} />
				</BrowserRouter>
			</Container>
		</BannerContextProvider>
	);
}

export default App;

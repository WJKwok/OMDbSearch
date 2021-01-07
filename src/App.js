import Container from '@material-ui/core/Container';
import { Nomination } from './Pages/Nomination';
import { Banner } from './Components/Banner';

import { BannerContextProvider } from './Context/BannerContext';

function App() {
	return (
		<BannerContextProvider>
			<Banner />
			<Container>
				<Nomination />
			</Container>
		</BannerContextProvider>
	);
}

export default App;

import './App.css';
import { Container, CssBaseline } from '@mui/material';
import { AuthTabs } from './components/NewForm/Tabs.tsx';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <AuthTabs />
      </Container>
    </>
  );
}

export default App;

// return (
//     <div className="app">
//         <Account />
//         <FetchPostListView />
//     </div>
// );

import './scss/App.scss';
import Main from './pages/Main.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

function App() {
  return (
    <ErrorBoundary>
      <main className="main-content">
        <Main></Main>
      </main>
    </ErrorBoundary>
  );
}

export default App;

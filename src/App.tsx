import { AuthProvider } from "./context/AuthProvider";
import Home from "./pages/home/Home";

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;

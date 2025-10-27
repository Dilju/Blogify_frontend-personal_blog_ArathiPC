import UserRoute from "./routes/UserRoute";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./component/common/ScrollToTop";

function App() {
  return (
    
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" reverseOrder={false} />
        <UserRoute />
      </BrowserRouter>
   
  );
}

export default App;

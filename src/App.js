import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@root/routes";

import "@root/App.scss";
import { socketService } from "@services/socket/socket.service";

function App() {
  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

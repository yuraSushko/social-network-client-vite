
import RouteManager from "./Components/RouteManager.jsx";
import {BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bulma/css/bulma.css'

export default function App() {
    return (
      <div>
          <BrowserRouter>
              <RouteManager/>
          </BrowserRouter>
      </div>
    )
}

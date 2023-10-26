import {createRoot} from "react-dom/client";
import Home from "./Components/Home/Home"
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<Home/>);
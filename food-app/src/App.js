import './App.css';
import TableComponent from "./Components/TableComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ViewComponent from "./Components/ViewComponent";
import {Container} from "@mui/material";
import AddComponent from "./Components/AddComponent";

function App() {
    return (<Container className={"container"} fluid="md">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TableComponent/>}></Route>
                    <Route path="/view" element={<ViewComponent/>}></Route>
                    <Route path="/add" element={<AddComponent/>}></Route>
                </Routes>
            </BrowserRouter>
        </Container>);
}

export default App;

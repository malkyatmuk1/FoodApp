import './App.css';
import TableComponent from "./Components/TableComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ViewComponent from "./Components/ViewComponent";
import {Container} from "@mui/material";
import AddComponent from "./Components/AddComponent";

function App() {
    return (
        <Container className={"container"} fluid="md">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TableComponent/>}></Route>
                    <Route path="/view" element={<ViewComponent/>}></Route>
                    <Route path="/add" element={<AddComponent/>}></Route>
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
/*import React, { useMemo, useState } from "react";
import {Container, Input, TableBody, Table, TableHead, TableRow, TableCell, TextField, TableCol} from "@mui/material";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const columns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "role",
            label: "ROLE",
        },
        {
            key: "age",
            label: "AGE",
        },
    ];

    const rows = [
        {
            key: "1",
            firstName: "Tony",
            lastName: "Reichert",
            role: "Developer",
            age: "35",
        },
        {
            key: "2",
            firstName: "Zoey",
            lastName: "Lang",
            role: "Designer",
            age: "22",
        },
        {
            key: "3",
            firstName: "Jane",
            lastName: "Fisher",
            role: "CEO",
            age: "29",
        },
        {
            key: "4",
            firstName: "William",
            lastName: "Howard",
            role: "Designer",
            age: "27",
        },
    ];

    const filteredRows = useMemo(() => {
        if (!searchTerm) return rows;

        if (rows.length > 0) {
            const attributes = Object.keys(rows[0]);

            const list = [];

            for (const current of rows) {
                for (const attribute of attributes) {
                    if (attribute === "key") {
                        continue;
                    }
                    const value = current[attribute];
                    if (value && value.toLowerCase() === searchTerm.toLowerCase()) {
                        const found = rows.find((row) => row.key === current.key);
                        if (found) {
                            list.push(found);
                        }
                    }
                }
            }
            return list;
        }

        return [];
    }, [searchTerm, rows]);
    return (
        <Container>
            <TextField
                size="lg"
                bordered
                clearable
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Table>
                <TableHead>
                    {columns.map((column) => (
                        <TableRow key={column.key}>{column.label}</TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {filteredRows.map((row) => (
                        <TableRow key={row.key}>
                            <TableCell>{row.firstName + " " + row.lastName}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{row.age}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
export default App;*/

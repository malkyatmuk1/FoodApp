import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {visuallyHidden} from '@mui/utils';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Buttons from "./Buttons";
import {Grid, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

function TableComponent() {
    const [allRows, setAllRows] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        fetchRows();
    }, []);

    function fetchRows() {
        fetch('http://localhost:8081/food')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAllRows(data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }

    function refreshRows() {
        fetchRows();
    }

    const removeSelectedFoodWhenDelete = (itemId) => {
        setSelected((currentSelected) => currentSelected.filter((item) => item.foodId !== itemId));
    };

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array?.map((el, index) => [el, index]);
        stabilizedThis?.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis?.map((el) => el[0]);
    }

    const headCells = [{
        id: 'description', numeric: false, disablePadding: true, label: 'Description',
    }, {
        id: 'kcal', numeric: true, disablePadding: false, label: 'Calories',
    }, {
        id: 'protein', numeric: true, disablePadding: false, label: 'Protein(g)',
    }, {
        id: 'fats', numeric: true, disablePadding: false, label: 'Fats(g)',
    }, {
        id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs(g)',
    },];

    function EnhancedTableHead(props) {
        const {order, orderBy, onRequestSort} = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (<TableHead>
                <TableRow>
                    {headCells.map((headCell) => (<TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            style={{fontWeight: "bold"}}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (<Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>) : null}
                            </TableSortLabel>
                        </TableCell>))}
                </TableRow>
            </TableHead>);
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
    };

    function EnhancedTable() {
        const [order, setOrder] = useState('asc');
        const [orderBy, setOrderBy] = useState('calories');
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(5);
        const [searchValue, setSearchValue] = useState("");

        const navigate = useNavigate();
        const handleAdd = () => {
            navigate("/add");
        }

        const handleRequestSort = (event, property) => {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        };

        const handleClick = (event, element) => {
            const alreadySelected = selected?.some((el) => el.foodId === element.foodId);

            if (!alreadySelected) {
                setSelected([...selected, element]);
            } else {
                const result = selected?.filter((el) => el.foodId !== element.foodId);
                setSelected(result);
            }
        };

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        const rowsFiltered = React.useMemo(() => {
            if (!searchValue) return allRows;
            const result = [];
            if (allRows.length > 0) {
                allRows?.forEach(row => {
                    if (!searchValue?.length || row.description.toString().toLowerCase().includes(searchValue.toLowerCase()) || row.kcal.toString().toLowerCase().includes(searchValue.toLowerCase()) || row.protein.toString().toLowerCase().includes(searchValue.toLowerCase()) || row.fat.toString().toLowerCase().includes(searchValue.toLowerCase()) || row.carbs.toString().toLowerCase().includes(searchValue.toLowerCase())) {
                        result.push(row);
                    }
                });
                return result;
            }
            return [];
        }, [searchValue, allRows]);

        const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsFiltered.length) : 0;

        const visibleRows = React.useMemo(() => {
            if (rowsFiltered && rowsFiltered.length > 0) {
                return stableSort(rowsFiltered, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,);
            }
            return [];
        }, [allRows, rowsFiltered, order, orderBy, page, rowsPerPage]);

        return (<Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}} style={{padding: "20px"}}>
                    <Toolbar
                        sx={{
                            pl: {sm: 2}, pr: {xs: 1, sm: 1}
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item lg={3} md={6} xs={10}>
                                <TextField
                                    style={{width: "100%"}}
                                    id="search"
                                    label="Search"
                                    margin="normal"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                            </Grid>
                            <Grid item lg={9} md={6} xs={2}>
                                <Tooltip title="Add" style={{zoom: "1.5", paddingTop: "15px", float: "right"}}>
                                    <IconButton onClick={handleAdd}>
                                        <AddCircleIcon style={{color: "green"}}/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'small'}
                        >
                            <EnhancedTableHead
                                numSelected={selected?.length}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={rowsFiltered?.length}
                            />
                            <TableBody>
                                {visibleRows?.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (<TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row)}
                                            tabIndex={-1}
                                            key={row.foodId}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.description}
                                            </TableCell>
                                            <TableCell align="right">{row.kcal}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">
                                                <Buttons element={row} onRefresh={refreshRows}
                                                         onDeleteSelected={removeSelectedFoodWhenDelete}></Buttons>
                                            </TableCell>
                                        </TableRow>);
                                })}
                                {emptyRows > 0 && (<TableRow
                                        style={{
                                            height: 33 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rowsFiltered?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>

        );
    }

    function SelectedTable() {
        const [order, setOrder] = useState('asc');
        const [orderBy, setOrderBy] = useState('calories');

        const handleRequestSort = (event, property) => {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        };

        const sumSpecificProp = (prop) => {
            let total = 0;
            selected?.forEach((el) => {
                total += parseInt(el[prop], 10);
            });
            return total.toString();
        }

        return ((<Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}} style={{padding: "20px"}}>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'small'}
                        >
                            <EnhancedTableHead
                                key={"unique"}
                                numSelected={selected?.length}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {selected?.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (<>
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row.foodId}
                                                sx={{cursor: 'pointer'}}
                                            >
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.description}
                                                </TableCell>
                                                <TableCell align="right">{row.kcal}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                            </TableRow>
                                        </>);
                                })}

                                {<TableRow
                                    hover
                                    tabIndex={-1}
                                    key={99999}
                                    sx={{cursor: 'pointer'}}
                                >
                                    <TableCell align="right" style={{fontWeight: "bold"}}>Total:</TableCell>
                                    <TableCell align="right" style={{fontWeight: "bold"}}>
                                        {sumSpecificProp('kcal')} (kcal)
                                    </TableCell>
                                    <TableCell align="right" style={{fontWeight: "bold"}}>
                                        {sumSpecificProp('protein')} (g)
                                    </TableCell>
                                    <TableCell align="right" style={{fontWeight: "bold"}}>
                                        {sumSpecificProp('fat')} (g)
                                    </TableCell>
                                    <TableCell align="right" style={{fontWeight: "bold"}}>
                                        {sumSpecificProp('carbs')} (g)
                                    </TableCell>
                                </TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>)

        );
    }

    return (<div>
            <div>
                {SelectedTable()}
            </div>
            <div>
                {EnhancedTable()}
            </div>

        </div>);
}

export default TableComponent;
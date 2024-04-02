import * as React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Grid, TextField} from "@mui/material";
import {useEffect} from "react";

export default function ViewComponent() {
    const {state} = useLocation();
    const {foodId} = state;
    const [food, setFood] = React.useState(null);

    useEffect(() => {
        fetch(`http://localhost:8081/food/view/`+foodId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFood(data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }, []);
    const navigate = useNavigate();
    const handleBack = () => {
       navigate("/");
    }
    return (
        <div>
            <h1>View food item</h1>
            <Grid container spacing={2}>
                <Grid item lg={8} md={8} xs={12}>
                    <TextField
                        style={{width: "100%"}}
                        id="description"
                        label="Description"
                        margin="normal"
                        value={food?.description}
                         InputProps={{
                             readOnly: true,
                         }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                    />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                    <TextField
                        style={{width: "100%"}}
                        margin="normal"
                        id="kcal"
                        label="Calories"
                        type="number"
                        value={food?.kcal}
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                    />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                    <TextField
                        style={{width: "100%"}}
                        id="protein"
                        label="Protein"
                        margin="normal"
                        type="number"
                        value={food?.protein}
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                    />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                    <TextField
                        style={{width: "100%"}}
                        margin="normal"
                        id="fats"
                        label="Fats"
                        type="number"
                        value={food?.fat}
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                    />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                    <TextField
                        style={{width: "100%"}}
                        margin="normal"
                        id="carbs"
                        label="Carbs"
                        type="number"
                        value={food?.carbs}
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                    />
                </Grid>
            </Grid>
            <Button onClick={handleBack}>Back</Button>
        </div>
    );
}
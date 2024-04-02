import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Grid, TextField} from "@mui/material";

export default function AddComponent() {
    const [food, setFood] = React.useState(null);
    const [foodError, setFoodError] = React.useState(null);

    const handleAdd = async () => {
        try {
            if (validateForm()) {
                const response = await fetch(`http://localhost:8081/add/food`, {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json',
                    }, body: JSON.stringify(food),
                }).then(() => {
                    navigate("/");
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            }
            //const updatedUser = await response.json();
        } catch (error) {
            console.error('Failed to update food:', error);
        }
    };
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/");
    }
    const handleChange = (event) => {
        const {id, value} = event.target;
        setFood({
            ...food, [id]: value,
        });
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!food?.description) {
            isValid = false;
            errors.description = "Description is required.";
        }

        if (!food?.kcal || food?.kcal < 0) {
            isValid = false;
            errors.kcal = "Calories must be a positive number.";
        }
        if (!food?.protein || food?.protein < 0) {
            isValid = false;
            errors.protein = "Calories must be a positive number.";
        }
        if (!food?.fat || food?.fat < 0) {
            isValid = false;
            errors.fat = "Calories must be a positive number.";
        }
        if (!food?.carbs || food?.carbs < 0) {
            isValid = false;
            errors.carbs = "Calories must be a positive number.";
        }
        setFoodError(errors);
        return isValid;
    }
    return (<div>
            <h1>Add food item</h1>
            <Grid container spacing={2}>
                <Grid item lg={8} md={8} xs={12}>
                    <TextField
                        style={{width: "100%"}}
                        id="description"
                        label="Description"
                        margin="normal"
                        value={food?.description}
                        onChange={handleChange}
                        error={!!foodError?.description}
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
                        onChange={handleChange}
                        error={!!foodError?.kcal}
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
                        onChange={handleChange}
                        error={!!foodError?.protein}
                    />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                    <TextField
                        style={{width: "100%"}}
                        margin="normal"
                        id="fat"
                        label="Fats"
                        type="number"
                        value={food?.fat}
                        onChange={handleChange}
                        error={!!foodError?.fat}
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
                        onChange={handleChange}
                        error={!!foodError?.carbs}
                    />
                </Grid>
            </Grid>
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleAdd}>Add</Button>
        </div>);
}
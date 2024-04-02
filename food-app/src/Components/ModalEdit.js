import * as React from 'react';
import {Button, FormControl, Grid, Modal, TextField} from "@mui/material";
import Box from "@mui/material/Box";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #DCDCDC',
    bomdhadow: 24,
    borderRadius: '10px',
    p: 4,
};

function ModalEdit({onClose, element}) {
    const [food, setFood] = React.useState(element);
    const handleEdit = async (event) => {
        try {
            const response = await fetch(`http://localhost:8081/edit/food`, {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(food),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            onClose();
        } catch (error) {
            console.error('Failed to update food:', error);
        }
    };

    const handleChange = (event) => {
        const {id, value} = event.target;
        setFood(prevModel => ({
            ...prevModel, [id]: value
        }));
    };
    const handleClickOnModal = (event) => {
        event.stopPropagation();
    };

    return (<div>
            <Modal
                open={food !== undefined}
                onClose={onClose}
                onClick={handleClickOnModal}
                aria-labelledby="modal-modal-title"
                title="Edit Food"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <h1> Edit food item</h1>
                    <FormControl defaultValue="" required>
                        <Grid container spacing={2}>
                            <Grid item lg={8} md={8} xs={12}>
                                <TextField
                                    style={{width: "100%"}}
                                    id="description"
                                    label="Description"
                                    margin="normal"
                                    defaultValue={food.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} xs={12}>
                                <TextField
                                    style={{width: "100%"}}
                                    margin="normal"
                                    id="kcal"
                                    label="Calories"
                                    type="number"
                                    defaultValue={food.kcal}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} xs={12}>
                                <TextField
                                    style={{width: "100%"}}
                                    id="protein"
                                    label="Protein"
                                    margin="normal"
                                    type="number"
                                    defaultValue={food.protein}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} xs={12}>
                                <TextField
                                    style={{width: "100%"}}
                                    margin="normal"
                                    id="fats"
                                    label="Fats"
                                    type="number"
                                    defaultValue={food.fat}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} xs={12}>
                                <TextField
                                    style={{width: "100%"}}
                                    margin="normal"
                                    id="carbs"
                                    label="Carbs"
                                    type="number"
                                    defaultValue={food.carbs}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button onClick={handleEdit}>Save</Button>
                    </FormControl>
                </Box>
            </Modal>
        </div>);
}

export default ModalEdit;
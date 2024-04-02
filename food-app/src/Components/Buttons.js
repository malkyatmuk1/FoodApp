import * as React from 'react';
import {Button, ButtonGroup} from "@mui/material";
import ModalEdit from "./ModalEdit";
import {useNavigate} from "react-router-dom";

function Buttons({element, onRefresh, onDeleteSelected}) {
    const [openModal, setOpenModal] = React.useState(false);

    const navigate = useNavigate();

    const handleOpen = (event) => {
        event.stopPropagation();
        setOpenModal(true);
    };
    const handleDelete = async (event) => {
        try {
            event.stopPropagation();
            const response = await fetch(`http://localhost:8081/food/delete/${element.foodId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            onDeleteSelected(element.foodId);
            onRefresh();
        } catch (error) {
            console.error('Failed to delete the item:', error);
        }
    };

    const handleView = (event) => {
        navigate("/view", {state: {foodId: element.foodId}});
    };
    return (<div>
            <ButtonGroup variant="text" aria-label="Basic button group">
                <Button onClick={handleView}>View</Button>
                <Button onClick={handleOpen}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </ButtonGroup>
            {openModal && <ModalEdit onClose={() => setOpenModal(false)} element={element}></ModalEdit>}
        </div>);
}

export default Buttons;

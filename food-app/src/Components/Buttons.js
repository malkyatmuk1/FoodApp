import * as React from 'react';
import {Button, ButtonGroup} from "@mui/material";
import ModalEdit from "./ModalEdit";
import {useNavigate} from "react-router-dom";

function Buttons({handleDelete, element}) {
    const [openModal, setOpenModal] = React.useState(false);

    const navigate = useNavigate();

    const onCloseModal = () => {
        setOpenModal(false);
    };
    const handleOpen = (event) => {
        event.stopPropagation();
        setOpenModal(true);

    };

    const handleView = (event) => {
        navigate("/view", {state: {foodId: element.foodId}});
    };
    return (
        <div>
            <ButtonGroup variant="text" aria-label="Basic button group">
                <Button onClick={handleView}>View</Button>
                <Button onClick={handleOpen}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </ButtonGroup>
            {openModal &&
                <ModalEdit open_modal={openModal} element={element} notify_parent={onCloseModal}></ModalEdit>
            }
        </div>
    );
}

export default Buttons;

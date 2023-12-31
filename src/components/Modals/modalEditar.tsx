import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import taskType from '../../types/taskType';
import { getTaskAsyncThunk, taskUpdateAsyncThunk } from '../../store/modules/userLogged';

interface ModalInputsProps {
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
    task: taskType;
}

const ModalInputsEdit: React.FC<ModalInputsProps> = ({ openModal, actionCancel, actionConfirm, task }) => {
    const dispatch = useAppDispatch();
    const [editedTask, setEditedTask] = React.useState(task);
    const email = useAppSelector(state => state.userLogged.userLogged.email);

    const handleClose = () => {
        actionCancel();
    };

    const handleConfirm = () => {
        const updateNote = {
            id: editedTask.id,
            email: email,
            title: editedTask.title,
            description: editedTask.description
        };

        dispatch(taskUpdateAsyncThunk(updateNote));
        setTimeout(() => {
            dispatch(getTaskAsyncThunk(updateNote.email));
        }, 200);
        actionConfirm();
    };

    return (
        <Box>
            <Dialog open={openModal} onClose={handleClose}>
                <DialogTitle>Editar um recado:</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={editedTask.title}
                        margin="dense"
                        id="task"
                        label="Tarefa"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setEditedTask(state => ({ ...state, title: e.target.value }))}
                    />
                    <TextField
                        autoFocus
                        value={editedTask.description}
                        margin="dense"
                        id="detail"
                        label="Detalhamento"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setEditedTask(state => ({ ...state, description: e.target.value }))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleConfirm}>Editar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ModalInputsEdit;

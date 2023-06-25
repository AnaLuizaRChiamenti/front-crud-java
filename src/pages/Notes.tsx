import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import {
    Grid,
    Box,
    Typography,
    IconButton,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import ModalInputs from '../components/modalAddInput';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import taskType from '../types/taskType';
import ModalInputsEdit from '../components/modalEditar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTaskAsyncThunk, taskArchivedAsyncThunk, taskDeleteAsyncThunk } from '../store/modules/UserSlice';

const Notes: React.FC = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<taskType>({} as taskType);
    const email = useAppSelector(state => state.user.user.email);

    const listTaks = useAppSelector(state => state.user.user.tasks);
    const [editedTaks, setEditedTaks] = useState<taskType>({} as taskType);

    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpenAdd(false);
    };
    const addNotes = () => {
        setOpenAdd(false);
    };
    const openModalImput = () => {
        setOpenAdd(true);
    };

    const handleEdit = (item: taskType) => {
        setEditedTaks(item);

        setOpenModalEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenModalEdit(false);
    };

    const addNotesEdit = () => {
        setOpenModalEdit(false);
    };

    const handleDelete = (item: taskType) => {
        setSelectedNote(item);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = () => {
        const deleteTask = {
            id: selectedNote?.id,
            email
        };

        dispatch(taskDeleteAsyncThunk(deleteTask));
        setTimeout(() => {
            dispatch(getTaskAsyncThunk(deleteTask.email));
        }, 500);
        setDeleteConfirmOpen(false);
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmOpen(false);
    };

    const taskArchived = (id: string) => {
        const task = listTaks.find(item => item.id === id);
        if (task) {
            dispatch(taskArchivedAsyncThunk({ id: id, email: email }));
            setTimeout(() => {
                dispatch(getTaskAsyncThunk(email));
            }, 200);
        }
    };

    return (
        <Grid container sx={{ width: '100%', height: '100vh' }}>
            <ResponsiveAppBar />
            <Box width="100%" bgcolor="#EFF7CF" paddingTop="4.5rem">
                <Grid container width="100%">
                    {listTaks.map(note => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            key={note?.id}
                            display="flex"
                            justifyContent="center"
                            flexDirection="row"
                        >
                            <Card
                                sx={{
                                    width: '300px',
                                    height: '150px',
                                    marginY: '25px',
                                    marginX: '15px'
                                }}
                            >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {note.title}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {note.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: 'flex', height: '40%', width: '100px' }}>
                                    <IconButton aria-label="edit" onClick={() => handleEdit(note)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDelete(note)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => taskArchived(note.id)}>
                                        <FolderIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                    <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
                        <DialogTitle>Confirmar exclusão</DialogTitle>
                        <DialogContent>Tem certeza que deseja excluir o recado {selectedNote?.title}?</DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteCancel}>Cancelar</Button>
                            <Button onClick={handleDeleteConfirm} color="error">
                                Excluir
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Box>

            <Fab
                onClick={openModalImput}
                color="info"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    right: '20px',
                    bottom: '20px',
                    bgcolor: '#222'
                }}
            >
                <AddIcon />
            </Fab>
            {openModalEdit && (
                <ModalInputsEdit
                    openModal={openModalEdit}
                    actionConfirm={addNotesEdit}
                    actionCancel={handleCloseEdit}
                    task={editedTaks}
                />
            )}

            <ModalInputs openModal={openAdd} actionConfirm={addNotes} actionCancel={handleClose} />
        </Grid>
    );
};

export default Notes;

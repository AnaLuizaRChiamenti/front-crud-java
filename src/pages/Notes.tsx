/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    IconButton,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Divider,
    styled,
    Switch,
    Button,
    Checkbox,
    ListItemAvatar
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Folder as FolderIcon } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getTaskAsyncThunk, taskArchivedAsyncThunk, taskDeleteAsyncThunk } from '../store/modules/userLogged';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import ModalInputs from '../components/Modals/modalAddInput';
import ModalInputsEdit from '../components/Modals/modalEditar';
import ResponsiveAppBar from '../components/AppBars/ResponsiveAppBar';

import taskType from '../types/taskType';
import { Navigate, useNavigate } from 'react-router-dom';

const Notes: React.FC = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState({} as taskType);
    const [editedTaks, setEditedTaks] = useState({} as taskType);
    const [showArchived, setShowArchived] = useState(false);
    const email = useAppSelector(state => state.userLogged.userLogged.email);
    const listTaks = useAppSelector(state => state.userLogged.userLogged.tasks);
    const archivedTasks = listTaks.filter(item => item.archived);
    const [filterTask, setFilterTask] = useState('');
    const userLogged = useAppSelector(state => state.userLogged);
    const user = useAppSelector(state => state.users.user);

    const svgStringMenos =
        '<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="-37.33 -37.33 111.99 111.99" xml:space="preserve" stroke="#000000" stroke-width="0.00037331000000000007"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M27.419,9.191H16.005c-0.337-1.797-1.909-3.158-3.803-3.158H3.875C1.734,6.033,0,7.767,0,9.91v3.156v3.158v11.199 c0,2.14,1.734,3.875,3.875,3.875h23.543c2.141,0,3.876-1.735,3.876-3.875V13.066C31.295,10.925,29.561,9.191,27.419,9.191z M28.086,21.8c0,0.671-0.543,1.214-1.214,1.214h-9.366c-0.67,0-1.214-0.543-1.214-1.214v-1.977c0-0.669,0.544-1.212,1.214-1.212 h9.366c0.671,0,1.214,0.543,1.214,1.212V21.8z"></path> <path d="M34.734,9.587h-2.973c0.612,0.756,0.994,1.703,0.994,2.748v16.228c0,0.146-0.029,0.285-0.044,0.431 c0.554-0.563,1.006-1.228,1.267-1.938l3.111-13.751C37.84,11.249,36.785,9.587,34.734,9.587z"></path> </g> </g> </g></svg>';
    const encodedSvg = btoa(svgStringMenos);
    const svgUrlMenos = `data:image/svg+xml;base64,${encodedSvg}`;

    const svgStringMais =
        '<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="-37.33 -37.33 111.99 111.99" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M27.419,9.191H16.005c-0.337-1.797-1.909-3.158-3.803-3.158H3.875C1.734,6.033,0,7.767,0,9.91v3.156v3.158v11.199 c0,2.14,1.734,3.875,3.875,3.875h23.543c2.141,0,3.876-1.735,3.876-3.875V13.066C31.295,10.925,29.561,9.191,27.419,9.191z M26.494,22.85c0,0.717-0.582,1.297-1.299,1.297h-2.652V26.8c0,0.718-0.58,1.298-1.298,1.298h-2.113 c-0.358,0-0.683-0.146-0.918-0.382c-0.233-0.233-0.381-0.559-0.381-0.918l0.001-2.651h-2.652c-0.358,0-0.684-0.146-0.918-0.381 c-0.234-0.232-0.381-0.56-0.381-0.916v-2.115c0-0.717,0.58-1.297,1.297-1.297l2.653-0.002v-2.65c0-0.718,0.582-1.297,1.298-1.297 h2.113c0.718,0,1.299,0.579,1.299,1.297l-0.001,2.652l2.651-0.002c0.719,0.002,1.301,0.582,1.301,1.302V22.85z"></path> <path d="M34.734,9.587h-2.973c0.612,0.756,0.994,1.703,0.994,2.748v16.228c0,0.146-0.029,0.285-0.044,0.431 c0.554-0.563,1.006-1.228,1.267-1.938l3.111-13.751C37.84,11.249,36.785,9.587,34.734,9.587z"></path> </g> </g> </g></svg>';
    const encodedSvgs = btoa(svgStringMais);
    const svgUrlMais = `data:image/svg+xml;base64,${encodedSvgs}`;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();



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

    const handleDeleteCancel = () => {
        setDeleteConfirmOpen(false);
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

    const taskArchived = (id: string) => {
        if (archivedTasks) {
            dispatch(taskArchivedAsyncThunk({ id: id, email: email }));
            setTimeout(() => {
                dispatch(getTaskAsyncThunk(email));
            }, 200);
        }
    };

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url(${svgUrlMenos})`
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
                }
            }
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#ebf1f6',
            width: 32,
            height: 32,
            '&:before': {
                // eslint-disable-next-line quotes
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${svgUrlMais})`
            }
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            borderRadius: 20 / 2
        }
    }));

    const handleShowArchivedChange = () => {
        setShowArchived(!showArchived);
    };

    return (
        <Grid container sx={{ width: '100%', height: '100vh' }}>
            <ResponsiveAppBar />
            <Box width="100%" bgcolor="#d2c4f9" paddingTop="4.5rem">
                <Grid container marginBottom={10}>
                    <Grid item xs={12}>
                        <Container sx={{ marginTop: '20px' }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">Meus recados:</Typography>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12} display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <MaterialUISwitch checked={showArchived} onChange={handleShowArchivedChange} />
                                    </Box>
                                    <Box component="form" width="800px" marginX="10px">
                                        <TextField
                                            fullWidth
                                            placeholder="Pesquise um recado"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: '#000000'
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#000000'
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#f6e03c'
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: '#000000'
                                                    }
                                                }
                                            }}
                                            onChange={e => setFilterTask(e.target.value)}
                                            value={filterTask}
                                            label="Filtrar recado por recado"
                                            InputLabelProps={{
                                                style: { color: 'black' }
                                            }}
                                            variant="outlined"
                                        />
                                    </Box>
                                </Grid>
                                <Grid container width="100%">
                                    {showArchived
                                        ? archivedTasks
                                              .filter(note => {
                                                  if (filterTask) {
                                                      return note.title.includes(filterTask);
                                                  }
                                                  return true;
                                              })
                                              .map(note => (
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
                                                              marginX: '15px',
                                                              position: 'relative'
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
                                                          <CardActions
                                                              sx={{
                                                                  display: 'flex',
                                                                  justifyContent: 'space-between',
                                                                  position: 'absolute',
                                                                  bottom: 0
                                                              }}
                                                          >
                                                              <IconButton
                                                                  aria-label="edit"
                                                                  onClick={() => handleEdit(note)}
                                                                  sx={{ width: '25px', height: '25px' }}
                                                              >
                                                                  <EditIcon />
                                                              </IconButton>
                                                              <IconButton
                                                                  aria-label="delete"
                                                                  onClick={() => handleDelete(note)}
                                                                  sx={{ width: '25px', height: '25px' }}
                                                              >
                                                                  <DeleteIcon />
                                                              </IconButton>
                                                              <ListItemAvatar>
                                                                  <IconButton onClick={() => taskArchived(note.id)}>
                                                                      {note.archived ? (
                                                                          <>
                                                                              <FolderIcon sx={{ color: 'gray' }} />
                                                                          </>
                                                                      ) : (
                                                                          <>
                                                                              <FolderOffIcon sx={{ color: 'gray' }} />
                                                                          </>
                                                                      )}
                                                                  </IconButton>
                                                              </ListItemAvatar>
                                                          </CardActions>
                                                      </Card>
                                                  </Grid>
                                              ))
                                        : listTaks
                                              .filter(note => {
                                                  if (filterTask) {
                                                      return note.title.includes(filterTask);
                                                  }
                                                  return true;
                                              })
                                              .map(note => (
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
                                                              marginX: '15px',
                                                              position: 'relative'
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
                                                          <CardActions
                                                              sx={{
                                                                  display: 'flex',
                                                                  justifyContent: 'space-between',
                                                                  position: 'absolute',
                                                                  bottom: 0
                                                              }}
                                                          >
                                                              <IconButton
                                                                  aria-label="edit"
                                                                  onClick={() => handleEdit(note)}
                                                                  sx={{ width: '25px', height: '25px' }}
                                                              >
                                                                  <EditIcon />
                                                              </IconButton>
                                                              <IconButton
                                                                  aria-label="delete"
                                                                  onClick={() => handleDelete(note)}
                                                                  sx={{ width: '25px', height: '25px' }}
                                                              >
                                                                  <DeleteIcon />
                                                              </IconButton>
                                                              <ListItemAvatar>
                                                                  <IconButton onClick={() => taskArchived(note.id)}>
                                                                      {note.archived ? (
                                                                          <>
                                                                              <FolderIcon sx={{ color: 'gray' }} />
                                                                          </>
                                                                      ) : (
                                                                          <>
                                                                              <FolderOffIcon sx={{ color: 'gray' }} />
                                                                          </>
                                                                      )}
                                                                  </IconButton>
                                                              </ListItemAvatar>
                                                          </CardActions>
                                                      </Card>
                                                  </Grid>
                                              ))}
                                    <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
                                        <DialogTitle>Confirmar exclusão</DialogTitle>
                                        <DialogContent>
                                            Tem certeza que deseja excluir o recado {selectedNote?.title}?
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleDeleteCancel}>Cancelar</Button>
                                            <Button onClick={handleDeleteConfirm} color="error">
                                                Excluir
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
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
                    backgroundColor: '#000000',
                    ':hover': {
                        backgroundColor: '#f6e03c'
                    }
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

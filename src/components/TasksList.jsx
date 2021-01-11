import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  taskComplited: {
    backgroundColor: "#b5e7a0",
    fontSize: "10px",
    maxHeight: "20px",
  },
  taskNotComplited: {
    backgroundColor: "#eea29a",
    fontSize: "10px",
    maxHeight: "20px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

/* composant TasksList: contient la liste des tâches détaillées                 */
export default function TasksList(props) {
  const classes = useStyles();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [taskToEdit, setTaskToEdit] = useState({});

  /* handleClickOpenDelete: cette fonction permet l'ouverture du dialogue de    */
  /* la suppression d'une tâche                                                 */
  const handleClickOpenDelete = (id) => {
    setOpenDelete(true);
    setTaskId(id);
  };

  /* handleCloseDelete: cette fonction permet la fermeture du dialogue de la    */
  /* suppression d'une tâche                                                    */
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  /* handleClickOpenEdit: cette fonction permet l'ouverture du dialogue de la   */
  /* modification d'une tâche                                                   */
  const handleClickOpenEdit = (id) => {
    setOpenEdit(true);
    let tmpList = props.taskList.filter((elt) => elt.id === id);
    console.log(tmpList);
    setTaskToEdit(tmpList[0]);
  };

  /* handleCloseEdit: cette fonction permet la fermeture du dialogue de la      */
  /* modification d'une tâche                                                   */
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  /* handleStatus: cette fonction permet la modification d'une tâche            */
  const handleStatus = (id) => {
    let tmpList = props.taskList.map((elt) =>
      elt.id === id ? { ...elt, completed: !elt.completed } : elt
    );
    props.setTaskList(tmpList);
    localStorage.setItem("myList", JSON.stringify(tmpList));
  };

  /* deleteTask: cette fonction permet la suppression d'une tâche               */
  const deleteTask = () => {
    let tmpList = props.taskList.filter((elt) => elt.id !== taskId);
    props.setTaskList(tmpList);
    localStorage.setItem("myList", JSON.stringify(tmpList));
    handleCloseDelete();
  };

  /* editTask: cette fonction permet la modification d'une tâche                */
  const editTask = () => {
    let tmpList = props.taskList.map((elt) =>
      elt.id === taskToEdit.id ? taskToEdit : elt
    );
    props.setTaskList(tmpList);
    localStorage.setItem("myList", JSON.stringify(tmpList));
    handleCloseEdit();
  };

  return (
    <div className={classes.root}>
      <h2>Liste des tâches</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List dense={true}>
              {props.taskList.map((elt, idx) => {
                return (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={elt.name}
                      secondary={elt.description}
                    />
                    <ListItemSecondaryAction>
                      <Fab
                        variant="extended"
                        size="small"
                        aria-label="add"
                        className={
                          elt.completed
                            ? classes.taskComplited
                            : classes.taskNotComplited
                        }
                        onClick={() => handleStatus(elt.id)}
                      >
                        {elt.completed ? "Completé" : "Non completé"}
                      </Fab>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        size="small"
                        onClick={() => handleClickOpenEdit(elt.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        size="small"
                        color="secondary"
                        onClick={() => handleClickOpenDelete(elt.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDelete}
        aria-describedby="deleteTask"
      >
        <DialogContent>
          <DialogContentText id="deleteTask">
            {"Etes vous sur de vouloir cette tache ? (" + taskId + ")"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteTask} color="primary">
            OUI
          </Button>
          <Button onClick={handleCloseDelete} color="primary">
            NON
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseEdit}
        aria-describedby="editTask"
      >
        <DialogContent>
          <DialogContentText id="editTask">
            {"Mise à jour de la tache ? (" + taskToEdit.id + ")"}
          </DialogContentText>
          <TextField
            id="name"
            variant="outlined"
            fullWidth
            size="small"
            margin="dense"
            value={taskToEdit.name}
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, name: e.target.value })
            }
          />
          <TextField
            id="description"
            variant="outlined"
            fullWidth
            size="small"
            margin="dense"
            value={taskToEdit.description}
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={editTask} color="primary">
            Editer
          </Button>
          <Button onClick={handleCloseEdit} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

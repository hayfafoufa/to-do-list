import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

/* composant NewTask: sert à ajouter des nouveaux tâches à la liste des tâches */
export default function NewTask(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  /* addTask: cette fonction permet la création d'une tâche                    */
  const addTask = () => {
    let tempList = props.taskList;
    let id = tempList[tempList.length - 1].id + 1;
    tempList.push({
      id: id,
      name: name,
      description: description,
      completed: false,
    });
    localStorage.setItem("myList", JSON.stringify(tempList));
    props.setTaskList(tempList);
    setName("");
    setDescription("");
  };

  return (
    <div>
      <h2>Créer une nouvelle tâche</h2>
      <div className="newTaskContainer">
        <div>
          <TextField
            id="name"
            variant="outlined"
            size="small"
            label="Nom de la tâche"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            id="description"
            variant="outlined"
            size="small"
            label="Description de la tâche"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={addTask}>
            Ajouetr la tâche
          </Button>
        </div>
      </div>
    </div>
  );
}

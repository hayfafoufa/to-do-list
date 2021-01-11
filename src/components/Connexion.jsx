import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

/* composant Connexion: contient l'interface de connexion à l'application  */
export default function Connexion(props) {
  const [email, setEmail] = useState("");
  const [fromMailError, setFromMailError] = useState("");
  const [password, setPassword] = useState("");
  const [fromPasswordError, setFromPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fromAccountError, setFromAccountError] = useState("");

  /* validateAccount: cette fonction permet la validation du compte        */
  const validateAccount = () => {
    let regMail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    let isValid = true;
    if (!regMail.test(email)) {
      isValid = false;
      setFromMailError("Email non valide");
    }
    if (email !== "test@test.com" || password !== "test") {
      isValid = false;
      setFromAccountError("Email ou Mot de passe non valide");
    }
    if (isValid) {
      props.setConnected(true);
    }
  };
  return (
    <div className="conxMaintContainer">
      <div className="conxContainer">
        <h3>Connexion</h3>
        <div>
          <TextField
            id="mail"
            label="Adresse e-mail"
            variant="outlined"
            size="small"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFromMailError("");
              setFromAccountError("");
            }}
            error={fromMailError ? true : false}
            helperText={fromMailError}
          />
        </div>
        <div>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel htmlFor="password">Mot de passe</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFromPasswordError("");
                setFromAccountError("");
              }}
              error={fromPasswordError ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={100}
            />
          </FormControl>
        </div>
        <div className="errorAcnt">{fromAccountError}</div>
        <div>
          <Button variant="contained" color="primary" onClick={validateAccount}>
            Soumettre
          </Button>
        </div>
      </div>
    </div>
  );
}

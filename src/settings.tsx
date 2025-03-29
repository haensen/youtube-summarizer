import { Backdrop, Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { ApiSettingsContext } from "./apiSettingsContext";

interface Props {
    onClose: () => void;
}

export function Settings({ onClose }: Props) {
    const [models, setModels] = useState<string[]>(["gpt-3.5-turbo", "gpt-4"]);
    const apiSettings = useContext(ApiSettingsContext);

    function refreshModels() {

    }

    return (
        <Backdrop open={true} onClick={onClose} className="z-50">
            <Paper onClick={(e) => e.stopPropagation()} className="w-4/5 max-w-md p-4">
                <IconButton aria-label="close" onClick={onClose} style={{ float: "right" }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h4" className="text-center">Settings</Typography>
                
                <TextField
                    required
                    label="OpenAI API Address"
                    value={apiSettings.apiUrl}
                    onChange={(e) => apiSettings.setApiSettings({...apiSettings, apiUrl: e.target.value})}
                    variant="outlined"
                    fullWidth
                    style={{marginTop: 5}}
                    />
                <Typography variant="subtitle2" style={{marginTop: 15}}>The API Key is not needed when using LM Studio.</Typography>
                <TextField
                    label="OpenAI API Key"
                    value={apiSettings.apiKey}
                    onChange={(e) => apiSettings.setApiSettings({...apiSettings, apiKey: e.target.value})}
                    variant="outlined"
                    fullWidth
                    />
                <div className="flex flex-row items-center justify-center m-5">
                    <Button variant="contained" onClick={refreshModels}>Refresh models</Button>
                </div>
                <FormControl required fullWidth>
                    <InputLabel id="model-select-label">Model</InputLabel>
                    <Select
                        labelId="model-select-label"
                        id="model-select"
                        value={apiSettings.model}
                        onChange={(e) => apiSettings.setApiSettings({...apiSettings, model: e.target.value})}
                        label="Model"
                        variant="outlined"
                        fullWidth
                        >
                        {models.map((model) => (
                            <MenuItem key={model} value={model}>{model}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Paper>
        </Backdrop>
    );
}

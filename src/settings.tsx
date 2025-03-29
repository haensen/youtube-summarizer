import { Backdrop, Button, Divider, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { ApiSettingsContext } from "./apiSettingsContext";
import OpenAI from "openai";

interface Props {
    onClose: () => void;
}

export function Settings({ onClose }: Props) {
    const apiSettings = useContext(ApiSettingsContext);

    function refreshModels() {
        const client = new OpenAI({
            baseURL: apiSettings.apiUrl + '/v1',
            apiKey: apiSettings.apiKey == '' ? null : apiSettings.apiKey,
            dangerouslyAllowBrowser: true, // Not a problem here. Meant to prevent exposing the API key in public web sites.
        });

        client.models.list().then((response) => {
            const modelNames = response.data.map((model) => model.id);
            apiSettings.setApiSettings({
                ...apiSettings,
                availableModels: modelNames,
            });
        }).catch((err) => {
            console.error(err);
            alert("Error refreshing models: " + err);
        });
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
                        {apiSettings.availableModels.map((model) => (
                            <MenuItem key={model} value={model}>{model}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={
                        <Switch
                            checked={apiSettings.autoPasteYoutubeUrl}
                            onChange={(e) => apiSettings.setApiSettings({...apiSettings, autoPasteYoutubeUrl: e.target.checked})}
                            />
                    }
                    label="Automatically paste Youtube URL from clipboard"
                    style={{marginTop: 15}}
                    />
            </Paper>
        </Backdrop>
    );
}

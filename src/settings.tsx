import { Backdrop, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
    onClose: () => void;
}

export function Settings({ onClose }: Props) {
    return (
        <Backdrop open={true} onClick={onClose} className="z-50">
            <Paper onClick={(e) => e.stopPropagation()} className="w-4/5 max-w-md p-4">
                <IconButton aria-label="close" onClick={onClose} style={{ float: "right" }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h4" className="text-center">Settings</Typography>
                
                    <TextField label="OpenAI API Key" variant="outlined" fullWidth margin="normal" />
                    <TextField label="OpenAI API Address" variant="outlined" fullWidth margin="normal" />
                    <FormControl fullWidth>
                    <InputLabel id="model-select-label">Model</InputLabel>
                    <Select labelId="model-select-label" id="model-select" label="Model" variant="outlined" fullWidth>
                        <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                        <MenuItem value="gpt-4">GPT-4</MenuItem>
                    </Select>
                </FormControl>
            </Paper>
        </Backdrop>
    );
}

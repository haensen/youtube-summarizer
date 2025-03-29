import { Backdrop, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";

interface Props {
    onDone: (summary: string) => void;
}

export function SummarizerPopup({ onDone }: Props) {
    return (
        <Backdrop open={true} className="z-50">
            <Paper onClick={() => onDone('plah plah')} className="w-4/5 max-w-md p-4">
                <Typography variant="h4" className="text-center">Summarizing...</Typography>
            </Paper>
        </Backdrop>
    );
}

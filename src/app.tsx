import { Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Settings } from './settings';
import { SummarizerPopup } from './summarizerPopup';

function App() {
    const [summary, setSummary] = useState('Summaryyy');
    const [showSettings, setShowSettings] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex flex-col h-screen">
            <div>
                <IconButton aria-label="settings" onClick={() => setShowSettings(!showSettings)} className="float-right">
                    <SettingsIcon />
                </IconButton>
                <Typography variant="h3" className="text-center">Youtube Video Summarizer</Typography>
                <form>
                    <div className='flex flex-row items-center justify-center gap-2 items-stretch'>
                        <TextField id="outlined-basic" label="Youtube URL" variant="outlined" style={{width: "25em"}} className="" />
                        <Button variant="contained" onClick={() => setLoading(true)}>Summarize</Button>
                    </div>
                </form>
            </div>
            <Paper elevation={4} className="p-4 m-4 grow">{summary}</Paper>

            {showSettings && <Settings onClose={() => setShowSettings(false)} />}

            {loading && <SummarizerPopup onDone={(summary) => {
                setSummary(summary);
                setLoading(false);
            }} />}
        </div>
    );
}

const root = createRoot(document.body);
root.render(<App />);

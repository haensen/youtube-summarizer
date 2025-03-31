import { useUrl } from './useUrl';
import { Button, IconButton, Paper, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { Settings } from './settings';
import { SummarizerPopup } from './summarizerPopup';
import { Summary } from './summary';

export function MainView() {
    const [url, setUrl] = useUrl('');
    const [summary, setSummary] = useState('# Youtube Video Summarizer\nPaste a Youtube URL and click "Summarize".');
    const [showSettings, setShowSettings] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex flex-col h-screen">
            <div>
                <IconButton aria-label="settings" onClick={() => setShowSettings(!showSettings)} className="float-right">
                    <SettingsIcon />
                </IconButton>
                <form>
                    <div className='flex flex-row items-center justify-center gap-2 items-stretch mt-4'>
                        <TextField
                            id="outlined-basic"
                            label="Youtube URL"
                            variant="outlined"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)} style={{width: "25em"}}
                            />
                        <Button variant="contained" onClick={() => setLoading(true)}>Summarize</Button>
                    </div>
                </form>
            </div>
            <Paper elevation={4} className="p-4 m-4 grow min-h-0">
                <Summary summary={summary} />
            </Paper>

            {showSettings && <Settings onClose={() => setShowSettings(false)} />}

            {loading && <SummarizerPopup url={url} onDone={(summary) => {
                setSummary(summary);
                setLoading(false);
            }} />}
        </div>
    )
}
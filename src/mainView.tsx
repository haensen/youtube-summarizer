import { useUrl } from './useUrl';
import { Button, IconButton, Paper, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext, useState } from 'react';
import { SettingsPopup } from './settingsPopup';
import { SummarizerPopup } from './summarizerPopup';
import { Summary } from './summary';
import { ApiSettingsContext } from './apiSettingsContext';

export function MainView() {
    const [summarizing, setSummarizing] = useState(false);
    const [url, setUrl] = useUrl('', () => setSummarizing(true));
    const [summary, setSummary] = useState('# Youtube Video Summarizer\nPaste a Youtube URL and hit "Summarize".');
    const apiSettings = useContext(ApiSettingsContext); // Open settings if they're not OK
    const [showSettings, setShowSettings] = useState(!(
        apiSettings.apiUrl !== '' &&
        apiSettings.model !== '' &&
        apiSettings.availableModels.includes(apiSettings.model)
    ));

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
                        <Button variant="contained" onClick={() => setSummarizing(true)}>Summarize</Button>
                    </div>
                </form>
            </div>
            <Paper elevation={4} className="p-4 m-4 grow min-h-0">
                <Summary summary={summary} />
            </Paper>

            {showSettings && <SettingsPopup onClose={() => setShowSettings(false)} />}

            {summarizing && <SummarizerPopup url={url} onDone={(summary) => {
                setSummary(summary);
                setSummarizing(false);
            }} />}
        </div>
    )
}
import { Backdrop, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { YoutubeTranscript } from "youtube-transcript";

interface Props {
    url: string;
    onDone: (summary: string) => void;
}

export function SummarizerPopup({ url, onDone }: Props) {
    const [transcript, setTranscript] = useState('');

    YoutubeTranscript.fetchTranscript(url).then((transcript) => {
        console.log(transcript);
        setTranscript(transcript.map((t) => t.text).join(' '));
    }).catch((err) => {
        console.error(err);
        onDone('Error fetching transcript');
    });

    useEffect(() => {
        if (transcript == '') return;
        console.log('Summarizing...');
        onDone('Summary of the video: ' + transcript);
    }, [transcript]);

    return (
        <Backdrop open={true} className="z-50">
            <Paper onClick={() => onDone('plah plah')} className="w-4/5 max-w-md p-4">
                <Typography variant="h4" className="text-center">Summarizing...</Typography>
            </Paper>
        </Backdrop>
    );
}

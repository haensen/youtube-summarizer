import { Backdrop, Paper, Typography } from "@mui/material";
import { decode, encode } from "html-entities";
import { useEffect, useState } from "react";
import { YoutubeTranscript } from "youtube-transcript";

interface Props {
    url: string;
    onDone: (summary: string) => void;
}

const States = {
    GETTING_TRANSCRIPT: {
        text: 'Getting transcript...',
    },
    SUMMARIZING: {
        text: 'Summarizing...',
    },
    FINISHING: {
        text: 'Finishing...',
    },
}

export function SummarizerPopup({ url, onDone }: Props) {
    const [transcript, setTranscript] = useState('');
    const [displayState, setDisplayState] = useState(States.GETTING_TRANSCRIPT);

    useEffect(() => {
        YoutubeTranscript.fetchTranscript(url).then((transcriptResponse) => {
            let transcriptText = transcriptResponse.map((t) => t.text).join('\n');
            // The transcript has HTML entities encoded twice like &amp;#39; -> &#39; -> '
            transcriptText = decode(decode(transcriptText));
            console.log("Transcript: ", transcriptText);
            setTranscript(transcriptText);
        }).catch((err) => {
            console.error(err);
            onDone('Error fetching transcript');
        });
    }, [url]);

    useEffect(() => {
        if (transcript == '') return;
        setDisplayState(States.SUMMARIZING);
        console.log('Summarizing...');

        setDisplayState(States.FINISHING);
        onDone('Summary of the video: ' + transcript);
    }, [transcript]);

    return (
        <Backdrop open={true} className="z-50">
            <Paper onClick={() => onDone('plah plah')} className="w-4/5 max-w-md p-4">
                <Typography variant="h4" className="text-center">
                    {displayState.text}
                </Typography>
            </Paper>
        </Backdrop>
    );
}

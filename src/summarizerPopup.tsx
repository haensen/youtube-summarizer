import { Backdrop, Paper, Typography } from "@mui/material";
import { decode } from "html-entities";
import OpenAI from "openai";
import { useContext, useEffect, useState } from "react";
import { YoutubeTranscript } from "youtube-transcript";
import { ApiSettingsContext } from "./apiSettingsContext";

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
    const apiSettings = useContext(ApiSettingsContext);

    useEffect(() => {
        YoutubeTranscript.fetchTranscript(url).then((transcriptResponse) => {
            let transcriptText = transcriptResponse.map((t) => t.text).join('\n');
            // The transcript has HTML entities encoded twice like &amp;#39; -> &#39; -> '
            transcriptText = decode(decode(transcriptText));
            console.log("Transcript: ", transcriptText);
            setTranscript(transcriptText);
        }).catch((err) => {
            console.error(err);
            onDone(`Error fetching transcript: ${err}`);
        });
    }, [url]);

    useEffect(() => {
        if (transcript == '') return;
        setDisplayState(States.SUMMARIZING);
        console.log('Summarizing...');

        const client = new OpenAI({
            baseURL: apiSettings.apiUrl + '/v1',
            apiKey: apiSettings.apiKey == '' ? null : apiSettings.apiKey,
            dangerouslyAllowBrowser: true, // Not a problem here. Meant to prevent exposing the API key in public web sites.
        });
        client.chat.completions.create({
            model: apiSettings.model,
            messages: [
                {
                    role: 'system',
                    content: `
                        Your inputs are video transcripts which you must summarize.
                        Use markdown to format the summary.
                        Output only the summary.
                        Make the summary as short as possible while keeping the meaning.
                        Make the summary informational.
                        Use bullet points if possible.
                        Start the summary with an appropriate title.
                    `,
                },
                {
                    role: 'user',
                    content: transcript,
                },
            ],
            temperature: 0.5,
        }).then((response) => {
            console.log('OpenAI api response:', response);
            const summary = response.choices[0].message.content;
            console.log('Summary:', summary);
            setDisplayState(States.FINISHING);
            onDone(summary);
        }).catch((err) => {
            console.error(err);
            onDone(`Error summarizing transcript: ${err}`);
        });
    }, [transcript]);

    return (
        <Backdrop open={true} className="z-50">
            <Paper className="w-4/5 max-w-md p-4">
                <Typography variant="h4" className="text-center">
                    {displayState.text}
                </Typography>
            </Paper>
        </Backdrop>
    );
}

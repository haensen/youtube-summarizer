import Markdown from "markdown-to-jsx";

interface Props {
    summary: string;
}

export function Summary({ summary }: Props) {
    return (
        <div className="overflow-y-auto h-full">
            <Markdown>{summary}</Markdown>
        </div>
    );
}

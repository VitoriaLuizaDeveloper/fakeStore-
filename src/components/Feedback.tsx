interface FeedbackProps {
    message: string;
    type?: 'success' | 'error';
}

export function Feedback({ message, type = 'success' }: FeedbackProps) {
    return (
        <div className={`p-2 rounded text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>{message}</div>
    );
} 
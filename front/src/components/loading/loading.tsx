type props = {
    color?: string
};

const Loading = ({ color ="white" }: props) => {
    return (
        <svg width="60" height="60" viewBox="0 0 150 150" preserveAspectRatio="xMidYMid">
            <rect x="0" y="0" width="150" height="150" fill="none"></rect>
            <circle cx="75" cy="75" r="60" stroke-dasharray="300 75" stroke={color} fill="none" stroke-width="5">
                <animateTransform attributeName="transform" type="rotate" values="0 75 75;180 75 75;360 75 75;" keyTimes="0;0.5;1" dur="500ms" repeatCount="indefinite" begin="0s"></animateTransform>
            </circle>
        </svg>

    );
};

export default Loading;
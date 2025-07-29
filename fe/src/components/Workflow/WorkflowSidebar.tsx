const triggers = [
    {type: "manual_trigger", label: "Trigger manually", description: "Runs on button click , Perfect for starting quicky"},
    {type: "webhook_trigger", label: "On webhook call", description: "Runs on HTTP request"},
    {type: "schedule_trigger", label: "On schedule", description: "Runs on a schedule"},
];

const nodes = [
    {type : "sum", label: "Sum Node", description: "Adds number together"},
    {type : "odd_even", label: "Odd/Even Node", description: "Checks if a number is odd or even"},
];

export default function WorkflowSidebar({onTriggerSelect, onNodeSelect}) {
    return (
        <div className="w-64 bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-4 h-full flex flex-col transition-colors duration-300">
            <h1 className="text-lg font-bold mb-4">Choose a Trigger</h1>
            <div className="space-y-3 mb-8">
                {triggers.map(trigger => (
                    <button
                        key={trigger.type}
                        className="w-full text-left px-3 py-2 rounded transition-colors duration-200 dark:hover:bg-gray-800 hover:bg-gray-100"
                        onClick={() => onTriggerSelect(trigger)}
                    >
                        <div className="font-semibold">{trigger.label}</div>
                        <div className="text-xs dark:text-gray-400 text-gray-500">{trigger.description}</div>
                    </button>
                ))}
            </div>

            <h2 className="text-lg font-bold mb-4">Add Nodes</h2>
            <div className="space-y-3">
                {nodes.map(node => (
                    <button
                        key={node.type}
                        className="w-full text-left px-3 py-2 rounded transition-colors duration-200 dark:hover:bg-gray-800 hover:bg-gray-100"
                        onClick={() => onNodeSelect(node)}
                    >
                        <div className="font-semibold">{node.label}</div>
                        <div className="text-xs dark:text-gray-400 text-gray-500">{node.description}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}

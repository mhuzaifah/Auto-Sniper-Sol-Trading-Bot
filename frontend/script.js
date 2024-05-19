

document.getElementById('terminal-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const input = event.target.value;
        const output = document.getElementById('terminal-output');
        const newOutput = document.createElement('div');
        newOutput.textContent = `> ${input}`;
        output.appendChild(newOutput);
        handleCommand(input); // Call the TypeScript function
        event.target.value = '';
        output.scrollTop = output.scrollHeight;
    }
});

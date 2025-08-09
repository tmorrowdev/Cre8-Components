import pandas as pd
import base64
from pathlib import Path
import asyncio
from mcp_data_viz_tool import MCPDataVisualizationAgent

async def main():
    # Step 1: Load the CSV file
    file_path = '/Users/tylersmbp/Documents/Bookexcel.csv'
    with open(file_path, 'r') as file:
         file_content = file.read()

    # Step 2: Initialize the data visualization agent
    agent = MCPDataVisualizationAgent()

    # Step 3: Analyze the data and generate recommendations
    filename = Path(file_path).name
    response = await agent.analyze_data(content=file_content, filename=filename)

    # Step 4: Extract the HTML component
    html_component = response.html_component

    # Step 5: Save the HTML to a file and open it in a browser
    output_file_path = '/Users/tylersmbp/Documents/data_visualization.html'
    with open(output_file_path, 'w') as output_file:
         output_file.write(html_component)

    # Open the browser to display the chart
    import webbrowser
    webbrowser.open(f'../output/{output_file_path}')

# Run the async function
if __name__ == "__main__":
     asyncio.run(main())
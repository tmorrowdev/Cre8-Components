import pandas as pd
from mcp_data_viz_tool import MCPDataVisualizationAgent

# Step 1: Load the CSV file
file_path = '/Users/tylersmbp/Documents/Bookexcel.csv'
with open(file_path, 'r') as file:
    file_content = file.read()

# Step 2: Initialize the visualization agent
agent = MCPDataVisualizationAgent()

# Step 3: Analyze the data and generate recommendations
filename = 'Bookexcel.csv'
response = await agent.analyze_data(content=file_content, filename=filename)

# Step 4: Extract the HTML component
html_component = response.html_component

# Step 5: Save the HTML to a file and open it in a browser
output_file_path = '/Users/tylersmbp/Documents/data_visualization.html'
with open(output_file_path, 'w') as output_file:
    output_file.write(html_component)

# Open the browser to display the chart
import webbrowser
webbrowser.open(f'file://{output_file_path}')
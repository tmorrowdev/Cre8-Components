import pandas as pd
from mcp_data_viz_tool import MCPDataVisualizationAgent

# Step 1: Load the CSV file
file_path = '/Users/tylersmbp/Documents/Bookexcel.csv'
with open(file_path, 'r') as file:
    file_content = file.read()

# Step 2: Initialize the data visualization agent
agent = MCPDataVisualizationAgent()

# Step 3: Analyze the data and generate recommendations
response = agent.analyze_data(content=file_content, filename='Bookexcel.csv')

# Step 4: Extract the HTML component
html_component = response.html_component

# Step 5: Save the HTML component to a file
html_file_path = '/Users/tylersmbp/Documents/data_visualization.html'
with open(html_file_path, 'w') as html_file:
    html_file.write(html_component)

# Step 6: Open the HTML file in the browser
import webbrowser
webbrowser.open(f'file://{html_file_path}')
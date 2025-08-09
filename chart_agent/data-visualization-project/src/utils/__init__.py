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

# Step 5: Write the HTML to a temporary file and open it in the browser
import tempfile
import webbrowser

with tempfile.NamedTemporaryFile(delete=False, suffix='.html') as tmp_file:
    tmp_file.write(html_component.encode('utf-8'))
    tmp_file_path = tmp_file.name

# Open the browser to display the chart
webbrowser.open(f'file://{tmp_file_path}')
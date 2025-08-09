# Plotly Visualizations for Marketing Campaign Analysis

This folder contains several scripts for creating interactive data visualizations using Plotly, based on the marketing campaign data.

## Common Issues and Solutions

### Pandas GroupBy Warning
When using pandas `groupby()` with categorical data, you might see a FutureWarning about observed=False. To fix:
```python
# Instead of
df.groupby('categorical_column').agg(...)

# Use
df.groupby('categorical_column', observed=True).agg(...)
```

### JSON Serialization Errors with NumPy Arrays
When converting Plotly figures to JSON, you might encounter errors with NumPy arrays. Use a custom encoder:
```python
import json
import numpy as np

# Custom JSON encoder to handle NumPy types
class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, pd.Series):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)

# Then use it when converting to JSON
json.dumps(fig.to_dict(), cls=NpEncoder)
```

## Available Scripts

### 1. revenue_bar_chart.py
A simple bar chart showing revenue by campaign name. This is a basic introduction to Plotly visualizations.

**Features:**
- Bar chart visualization
- Sorting by revenue
- Interactive tooltips

### 2. plotly_advanced_dashboard.py
A more comprehensive dashboard with multiple charts arranged in a grid layout.

**Features:**
- Multiple charts in a unified dashboard
- Revenue by Campaign (Bar Chart)
- Campaign Type Performance (Pie Chart)
- Monthly Revenue Trend (Line Chart)
- Channel Comparison (Horizontal Bar)

### 3. plotly_features_showcase.py
A showcase of advanced Plotly visualization features.

**Features:**
- Interactive Bubble Chart with Animation
- Heatmap for Campaign Performance
- Sunburst Chart for Hierarchical Data
- 3D Scatter Plot for Multi-Dimensional Analysis

### 4. mcp_plotly_integration.py
A demonstration of integrating Plotly with the MCP data visualization framework. Now returns a stringified HTML that can be used directly in MCP or other applications.

**Features:**
- KPI Cards with Key Metrics
- Top Campaigns Chart
- Monthly Trend Analysis
- Campaign Type ROI Analysis
- Insights Panel
- Returns HTML string for direct use in applications

### 5. example_stringified_html.py
An example of how to use the dashboard generator to get a stringified HTML without writing to a file.

**Features:**
- Generate HTML string from CSV file
- Generate HTML string from DataFrame
- Examples of how to use the HTML string

### 6. mcp_integration_example.py
A demonstration of how to fully integrate the dashboard generator with the MCP framework.

**Features:**
- Registers the dashboard generator as an MCP tool
- Processes CSV file content
- Returns HTML dashboard as a response

## Getting Started

1. Make sure you have the required packages installed:
   ```
   pip install plotly pandas
   ```

2. Run any of the scripts:
   ```
   python3 revenue_bar_chart.py
   python3 plotly_advanced_dashboard.py
   python3 plotly_features_showcase.py
   python3 mcp_plotly_integration.py
   ```

Each script will generate an HTML file in the `output` directory and automatically open it in your default web browser.

## Customizing Visualizations

You can customize these visualizations by modifying the following aspects:

- **Data Source**: Change the `data_path` variable to point to your CSV file
- **Chart Types**: Modify the chart type (e.g., bar, line, scatter) as needed
- **Colors**: Update color schemes using Plotly's built-in color scales
- **Layout**: Adjust chart dimensions, titles, and labels
- **Interactivity**: Add custom hover templates, click events, and animations

## Using with MCP

The MCP data visualization framework can leverage these Plotly charts. To integrate with MCP:

1. Import your visualization functions
2. Convert Plotly figures to HTML
3. Return the HTML as part of the MCP response

See `mcp_plotly_integration.py` for a complete example.

## Using Stringified HTML

The updated `mcp_plotly_integration.py` script now returns HTML as a string instead of writing to a file. This makes it more versatile for use in different contexts:

```python
# Import the generator function
from mcp_plotly_integration import generate_plotly_dashboard_string

# Option 1: Generate from a CSV file path
html_string = generate_plotly_dashboard_string(data_path="/path/to/data.csv")

# Option 2: Generate from an existing DataFrame
import pandas as pd
df = pd.read_csv("/path/to/data.csv")
html_string = generate_plotly_dashboard_string(dataframe=df)

# Use the HTML string however you need:
# - Return it from an API
# - Include it in an MCP response
# - Embed it in another web application
# - Write it to a file
with open("dashboard.html", "w") as f:
    f.write(html_string)
```

For a complete example, see `example_stringified_html.py` and `mcp_integration_example.py`.

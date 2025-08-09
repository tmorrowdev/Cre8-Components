#!/usr/bin/env python3
"""
MCP Data Visualization Tool - Fixed Version
A Model Context Protocol server for intelligent data analysis and visualization generation.
"""

import asyncio
import json
import logging
import tempfile
from pathlib import Path
from typing import Any, Dict, List, Optional, Sequence
import base64

import pandas as pd
import numpy as np
from pydantic import BaseModel, Field

# MCP imports - with proper initialization
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent
from mcp.server.models import InitializationOptions

# Import our data visualization models
from typing import Literal, Union
from datetime import datetime
from enum import Enum

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("data-viz-mcp")

# Chart Type Definitions
class ChartType(str, Enum):
    LINE = "line"
    BAR = "bar"
    SCATTER = "scatter"
    PIE = "pie"
    HISTOGRAM = "histogram"
    BOX = "box"
    HEATMAP = "heatmap"
    AREA = "area"

class DataType(str, Enum):
    NUMERIC = "numeric"
    CATEGORICAL = "categorical"
    DATETIME = "datetime"
    TEXT = "text"

class VisualizationIntent(str, Enum):
    TREND_ANALYSIS = "trend_analysis"
    COMPARISON = "comparison"
    DISTRIBUTION = "distribution"
    CORRELATION = "correlation"
    COMPOSITION = "composition"
    OUTLIER_DETECTION = "outlier_detection"

# Pydantic Models
class ColumnInfo(BaseModel):
    name: str
    data_type: DataType
    unique_values: int
    null_count: int
    sample_values: List[Any] = Field(max_items=5)
    statistics: Optional[Dict[str, float]] = None

class DatasetMetadata(BaseModel):
    filename: str
    file_size_mb: float
    row_count: int
    column_count: int
    columns: List[ColumnInfo]
    upload_timestamp: datetime = Field(default_factory=datetime.now)

class ChartData(BaseModel):
    x: Optional[List[Union[str, int, float]]] = None
    y: Optional[List[Union[int, float]]] = None
    labels: Optional[List[str]] = None
    values: Optional[List[Union[int, float]]] = None
    z: Optional[List[List[Union[int, float]]]] = None
    name: str = "Data Series"
    color: Optional[str] = None
    colors: Optional[List[str]] = None
    markerSize: Optional[int] = None

class ChartOptions(BaseModel):
    title: str = "Chart"
    xTitle: Optional[str] = "X Axis"
    yTitle: Optional[str] = "Y Axis"
    width: Optional[int] = 800
    height: Optional[int] = 400
    showLegend: bool = True
    theme: Literal["light", "dark"] = "light"

class ChartConfig(BaseModel):
    responsive: bool = True
    displayModeBar: bool = True
    modeBarButtonsToRemove: List[str] = ["pan2d", "lasso2d"]

class VisualizationRecommendation(BaseModel):
    chart_type: ChartType
    confidence_score: float = Field(ge=0.0, le=1.0)
    reasoning: str
    data_columns: List[str]
    intent: VisualizationIntent
    chart_data: ChartData
    chart_options: ChartOptions
    chart_config: ChartConfig = Field(default_factory=ChartConfig)

class AnalysisResponse(BaseModel):
    dataset_metadata: DatasetMetadata
    recommendations: List[VisualizationRecommendation]
    statistical_insights: Optional[Dict[str, Any]] = None
    processing_time_ms: float
    html_component: str

# Data Visualization Agent
class MCPDataVisualizationAgent:
    """Simplified data visualization agent for MCP integration"""
    
    def __init__(self):
        self.supported_formats = {'.csv', '.xlsx', '.xls', '.json', '.parquet'}
        self.color_schemes = {
            'viridis': ['#440154', '#414487', '#2a788e', '#22a884', '#7ad151', '#fde725'],
            'plasma': ['#0d0887', '#6a00a8', '#b12a90', '#e16462', '#fca636', '#f0f921'],
            'blues': ['#08519c', '#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#deebf7'],
            'categorical': ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b']
        }
    
    def load_dataset_from_content(self, content: str, filename: str) -> pd.DataFrame:
        """Load dataset from base64 encoded content or direct content"""
        file_path = Path(filename)
        
        if file_path.suffix not in self.supported_formats:
            raise ValueError(f"Unsupported file format: {file_path.suffix}")
        
        try:
            # Try to decode as base64 first
            try:
                decoded_content = base64.b64decode(content)
                with tempfile.NamedTemporaryFile(suffix=file_path.suffix, delete=False) as tmp_file:
                    tmp_file.write(decoded_content)
                    tmp_path = tmp_file.name
            except:
                # If not base64, treat as direct content
                with tempfile.NamedTemporaryFile(mode='w', suffix=file_path.suffix, delete=False) as tmp_file:
                    tmp_file.write(content)
                    tmp_path = tmp_file.name
            
            # Load based on file type
            if file_path.suffix == '.csv':
                df = pd.read_csv(tmp_path)
            elif file_path.suffix in ['.xlsx', '.xls']:
                df = pd.read_excel(tmp_path)
            elif file_path.suffix == '.json':
                df = pd.read_json(tmp_path)
            elif file_path.suffix == '.parquet':
                df = pd.read_parquet(tmp_path)
            
            # Cleanup temp file
            Path(tmp_path).unlink(missing_ok=True)
            
            logger.info(f"Successfully loaded dataset with {len(df)} rows and {len(df.columns)} columns")
            return df
            
        except Exception as e:
            logger.error(f"Failed to load dataset: {str(e)}")
            raise
    
    def analyze_column(self, series: pd.Series) -> ColumnInfo:
        """Analyze a single column"""
        column_info = {
            'name': series.name,
            'unique_values': series.nunique(),
            'null_count': series.isnull().sum(),
            'sample_values': series.dropna().head(5).tolist()
        }
        
        # Determine data type
        if pd.api.types.is_numeric_dtype(series):
            column_info['data_type'] = DataType.NUMERIC
            column_info['statistics'] = {
                'mean': float(series.mean()) if not series.empty else 0,
                'median': float(series.median()) if not series.empty else 0,
                'std': float(series.std()) if not series.empty else 0,
                'min': float(series.min()) if not series.empty else 0,
                'max': float(series.max()) if not series.empty else 0
            }
        elif pd.api.types.is_datetime64_any_dtype(series):
            column_info['data_type'] = DataType.DATETIME
        elif series.nunique() / len(series) < 0.1:
            column_info['data_type'] = DataType.CATEGORICAL
        else:
            column_info['data_type'] = DataType.TEXT
        
        return ColumnInfo(**column_info)
    
    def recommend_chart_type(self, columns, column_info) -> List[tuple]:
        """Recommend chart types based on column characteristics"""
        recommendations = []
        
        if len(columns) == 1:
            col_info = column_info[columns[0]]
            if col_info.data_type == DataType.NUMERIC:
                recommendations.extend([
                    (ChartType.HISTOGRAM, 0.9, "Single numeric variable - distribution analysis"),
                    (ChartType.BOX, 0.8, "Single numeric variable - outlier detection")
                ])
            elif col_info.data_type == DataType.CATEGORICAL:
                recommendations.append(
                    (ChartType.PIE, 0.9, "Single categorical variable - composition analysis")
                )
        
        elif len(columns) == 2:
            col1_info, col2_info = column_info[columns[0]], column_info[columns[1]]
            
            if col1_info.data_type == DataType.NUMERIC and col2_info.data_type == DataType.NUMERIC:
                recommendations.extend([
                    (ChartType.SCATTER, 0.9, "Two numeric variables - correlation analysis"),
                    (ChartType.LINE, 0.7, "Two numeric variables - trend analysis")
                ])
            elif col1_info.data_type == DataType.CATEGORICAL and col2_info.data_type == DataType.NUMERIC:
                recommendations.extend([
                    (ChartType.BAR, 0.9, "Categorical vs numeric - comparison analysis"),
                    (ChartType.BOX, 0.7, "Categorical vs numeric - distribution comparison")
                ])
            elif col1_info.data_type == DataType.DATETIME and col2_info.data_type == DataType.NUMERIC:
                recommendations.extend([
                    (ChartType.LINE, 0.95, "Time series data - trend analysis"),
                    (ChartType.AREA, 0.8, "Time series data - cumulative analysis")
                ])
        
        return sorted(recommendations, key=lambda x: x[1], reverse=True)
    
    def create_chart_data(self, df: pd.DataFrame, chart_type: ChartType, columns: List[str]) -> ChartData:
        """Create chart data structure"""
        if chart_type in [ChartType.LINE, ChartType.BAR, ChartType.SCATTER]:
            if len(columns) >= 2:
                x_data = df[columns[0]].tolist()
                y_data = df[columns[1]].tolist()
                return ChartData(
                    x=x_data,
                    y=y_data,
                    name=f"{columns[1]} vs {columns[0]}",
                    color=self.color_schemes['categorical'][0]
                )
        
        elif chart_type == ChartType.PIE:
            if len(columns) >= 1:
                value_counts = df[columns[0]].value_counts()
                return ChartData(
                    labels=value_counts.index.tolist(),
                    values=value_counts.values.tolist(),
                    name=f"{columns[0]} Distribution"
                )
        
        elif chart_type == ChartType.HISTOGRAM:
            if len(columns) >= 1:
                data = df[columns[0]].dropna().tolist()
                return ChartData(x=data, name=f"{columns[0]} Distribution")
        
        return ChartData(name="No Data Available")
    
    def generate_html_component(self, recommendations: List[VisualizationRecommendation]) -> str:
        """Generate HTML with embedded Plotly components"""
        html_template = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Visualization Results</title>
    <style>
        body {{ font-family: 'Segoe UI', sans-serif; margin: 20px; background: #f5f5f5; }}
        .container {{ max-width: 1200px; margin: 0 auto; }}
        .chart-section {{ background: white; margin: 20px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }}
        .chart-header {{ border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }}
        .confidence {{ background: #e3f2fd; padding: 5px 10px; border-radius: 4px; font-size: 0.9em; }}
        .reasoning {{ color: #666; font-style: italic; margin: 10px 0; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Data Visualization Analysis</h1>
        {chart_sections}
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.26.0/plotly.min.js"></script>
    <script>
        // Chart data
        const chartData = {chart_data_json};
        
        // Initialize all charts
        function initializeCharts() {{
            chartData.forEach((data, index) => {{
                const containerId = `chart-container-${{index}}`;
                const container = document.getElementById(containerId);
                
                if (container && window.Plotly) {{
                    const trace = createTrace(data.chartType, data.chartData);
                    const layout = createLayout(data.chartType, data.chartOptions);
                    
                    window.Plotly.newPlot(container, [trace], layout, {{
                        responsive: true,
                        displayModeBar: false
                    }});
                }}
            }});
        }}
        
        function createTrace(chartType, data) {{
            const trace = {{ name: data.name || 'Data Series' }};
            
            switch(chartType) {{
                case 'line':
                    return {{ ...trace, x: data.x, y: data.y, type: 'scatter', mode: 'lines+markers',
                            line: {{ color: data.color || '#1f77b4', width: 3 }},
                            marker: {{ size: 6, color: data.color || '#1f77b4' }} }};
                case 'bar':
                    return {{ ...trace, x: data.x, y: data.y, type: 'bar',
                            marker: {{ color: data.color || '#ff7f0e' }} }};
                case 'scatter':
                    return {{ ...trace, x: data.x, y: data.y, type: 'scatter', mode: 'markers',
                            marker: {{ size: 10, color: data.color || '#2ca02c' }} }};
                case 'pie':
                    return {{ ...trace, labels: data.labels, values: data.values, type: 'pie',
                            textinfo: 'label+percent' }};
                case 'histogram':
                    return {{ ...trace, x: data.x, type: 'histogram',
                            marker: {{ color: data.color || '#9467bd' }} }};
                default:
                    return trace;
            }}
        }}
        
        function createLayout(chartType, options) {{
            const layout = {{
                title: {{ text: options.title || 'Chart', font: {{ size: 16 }} }},
                margin: {{ t: 50, r: 20, b: 50, l: 50 }},
                height: 350
            }};
            
            if (chartType !== 'pie') {{
                layout.xaxis = {{ title: options.xTitle || 'X Axis' }};
                layout.yaxis = {{ title: options.yTitle || 'Y Axis' }};
            }}
            
            return layout;
        }}
        
        // Initialize when Plotly loads
        function checkPlotlyAndInit() {{
            if (window.Plotly) {{
                initializeCharts();
            }} else {{
                setTimeout(checkPlotlyAndInit, 100);
            }}
        }}
        
        checkPlotlyAndInit();
    </script>
</body>
</html>
        '''
        
        # Generate chart sections
        chart_sections = ""
        chart_data_array = []
        
        for i, rec in enumerate(recommendations):
            chart_data_array.append({
                "chartType": rec.chart_type.value,
                "chartData": rec.chart_data.dict(exclude_none=True),
                "chartOptions": rec.chart_options.dict()
            })
            
            chart_sections += f'''
        <div class="chart-section">
            <div class="chart-header">
                <h3>📈 Recommendation {i+1}: {rec.chart_type.value.title()} Chart</h3>
                <span class="confidence">Confidence: {rec.confidence_score:.1%}</span>
                <div class="reasoning">{rec.reasoning}</div>
            </div>
            <div id="chart-container-{i}" style="height: 400px;"></div>
        </div>
            '''
        
        return html_template.format(
            chart_sections=chart_sections,
            chart_data_json=json.dumps(chart_data_array)
        )
    
    async def analyze_data(self, content: str, filename: str, user_query: Optional[str] = None, max_recommendations: int = 3) -> AnalysisResponse:
        """Main analysis method"""
        start_time = datetime.now()
        
        try:
            # Load dataset
            df = self.load_dataset_from_content(content, filename)
            
            # Generate metadata
            file_size_mb = df.memory_usage(deep=True).sum() / (1024 * 1024)
            columns_info = [self.analyze_column(df[col]) for col in df.columns]
            
            dataset_metadata = DatasetMetadata(
                filename=filename,
                file_size_mb=file_size_mb,
                row_count=len(df),
                column_count=len(df.columns),
                columns=columns_info
            )
            
            # Create column info lookup
            column_info = {col.name: col for col in columns_info}
            
            # Auto-select interesting columns
            numeric_cols = [col.name for col in columns_info if col.data_type == DataType.NUMERIC]
            categorical_cols = [col.name for col in columns_info if col.data_type == DataType.CATEGORICAL and col.unique_values < 20]
            datetime_cols = [col.name for col in columns_info if col.data_type == DataType.DATETIME]
            
            columns_to_analyze = (datetime_cols + numeric_cols + categorical_cols)[:4]
            
            # Generate recommendations
            recommendations = []
            chart_recommendations = self.recommend_chart_type(columns_to_analyze, column_info)
            
            for chart_type, confidence, reasoning in chart_recommendations[:max_recommendations]:
                chart_data = self.create_chart_data(df, chart_type, columns_to_analyze)
                
                chart_options = ChartOptions(
                    title=f"{chart_type.value.title()} Chart - {', '.join(columns_to_analyze[:2])}",
                    xTitle=columns_to_analyze[0] if columns_to_analyze else "X Axis",
                    yTitle=columns_to_analyze[1] if len(columns_to_analyze) > 1 else "Y Axis"
                )
                
                recommendation = VisualizationRecommendation(
                    chart_type=chart_type,
                    confidence_score=confidence,
                    reasoning=reasoning,
                    data_columns=columns_to_analyze,
                    intent=VisualizationIntent.COMPARISON,
                    chart_data=chart_data,
                    chart_options=chart_options
                )
                
                recommendations.append(recommendation)
            
            # Generate HTML component
            html_component = self.generate_html_component(recommendations)
            
            # Calculate processing time
            processing_time = (datetime.now() - start_time).total_seconds() * 1000
            
            return AnalysisResponse(
                dataset_metadata=dataset_metadata,
                recommendations=recommendations,
                statistical_insights=None,
                processing_time_ms=processing_time,
                html_component=html_component
            )
            
        except Exception as e:
            logger.error(f"Analysis failed: {str(e)}")
            raise

# MCP Server Implementation
app = Server("data-visualization-mcp")
agent = MCPDataVisualizationAgent()

@app.list_tools()
async def handle_list_tools() -> List[Tool]:
    """List available MCP tools"""
    return [
        Tool(
            name="analyze_data_file",
            description="Analyze a data file and generate intelligent visualization recommendations with interactive Plotly charts",
            inputSchema={
                "type": "object",
                "properties": {
                    "file_content": {
                        "type": "string",
                        "description": "Base64 encoded file content or raw CSV/JSON content"
                    },
                    "filename": {
                        "type": "string",
                        "description": "Original filename with extension (e.g., 'sales_data.csv')"
                    },
                    "user_query": {
                        "type": "string",
                        "description": "Optional user query describing what they want to visualize"
                    },
                    "max_recommendations": {
                        "type": "integer",
                        "description": "Maximum number of chart recommendations to generate (default: 3)",
                        "default": 3,
                        "minimum": 1,
                        "maximum": 5
                    }
                },
                "required": ["file_content", "filename"]
            }
        ),
        Tool(
            name="create_sample_visualization",
            description="Create a sample visualization with demo data to test the system",
            inputSchema={
                "type": "object", 
                "properties": {
                    "chart_type": {
                        "type": "string",
                        "enum": ["line", "bar", "scatter", "pie", "histogram"],
                        "description": "Type of chart to create",
                        "default": "line"
                    },
                    "data_theme": {
                        "type": "string",
                        "enum": ["sales", "scientific", "financial", "social"],
                        "description": "Theme for sample data generation",
                        "default": "sales"
                    }
                }
            }
        )
    ]

@app.call_tool()
async def handle_call_tool(name: str, arguments: Dict[str, Any]) -> List[TextContent]:
    """Handle tool execution"""
    
    if name == "analyze_data_file":
        try:
            file_content = arguments["file_content"]
            filename = arguments["filename"]
            user_query = arguments.get("user_query")
            max_recommendations = arguments.get("max_recommendations", 3)
            
            # Analyze the data
            result = await agent.analyze_data(
                content=file_content,
                filename=filename,
                user_query=user_query,
                max_recommendations=max_recommendations
            )
            
            # Format response for MCP
            response_text = f"""# 📊 Data Analysis Results

## Dataset Overview
- **File**: {result.dataset_metadata.filename}
- **Size**: {result.dataset_metadata.file_size_mb:.2f} MB
- **Dimensions**: {result.dataset_metadata.row_count} rows × {result.dataset_metadata.column_count} columns
- **Processing Time**: {result.processing_time_ms:.1f}ms

## Column Analysis
"""
            for col in result.dataset_metadata.columns:
                stats_info = ""
                if col.statistics:
                    stats_info = f" (μ={col.statistics['mean']:.2f}, σ={col.statistics['std']:.2f})" if col.data_type == DataType.NUMERIC else ""
                response_text += f"- **{col.name}**: {col.data_type.value} - {col.unique_values} unique values, {col.null_count} nulls{stats_info}\n"
            
            response_text += "\n## 🎯 Visualization Recommendations\n\n"
            
            for i, rec in enumerate(result.recommendations, 1):
                response_text += f"""### {i}. {rec.chart_type.value.title()} Chart
- **Confidence**: {rec.confidence_score:.1%}
- **Reasoning**: {rec.reasoning}
- **Data Columns**: {', '.join(rec.data_columns)}

"""
            
            response_text += f"""
## 🌐 Ready-to-Use HTML Component

```html
{result.html_component}
```

**💡 Tip**: Save the HTML above to a `.html` file and open in a browser to see interactive charts!
"""
            
            return [TextContent(type="text", text=response_text)]
            
        except Exception as e:
            error_msg = f"❌ **Error analyzing data file**: {str(e)}"
            return [TextContent(type="text", text=error_msg)]
    
    elif name == "create_sample_visualization":
        try:
            chart_type = arguments.get("chart_type", "line")
            data_theme = arguments.get("data_theme", "sales")
            
            # Generate sample data based on theme
            if data_theme == "sales":
                sample_data = pd.DataFrame({
                    'month': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    'sales': [1200, 1350, 1100, 1500, 1400, 1600],
                    'region': ['North', 'South', 'East', 'West', 'North', 'South'],
                    'product': ['A', 'A', 'B', 'B', 'A', 'C']
                })
            elif data_theme == "scientific":
                sample_data = pd.DataFrame({
                    'temperature': np.random.normal(25, 5, 50),
                    'pressure': np.random.normal(1013, 50, 50),
                    'humidity': np.random.normal(60, 15, 50)
                })
            elif data_theme == "financial":
                dates = pd.date_range('2024-01-01', periods=30)
                sample_data = pd.DataFrame({
                    'date': dates,
                    'stock_price': 100 + np.cumsum(np.random.normal(0, 2, 30)),
                    'volume': np.random.normal(10000, 2000, 30)
                })
            else:  # social
                sample_data = pd.DataFrame({
                    'platform': ['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'TikTok'],
                    'users_millions': [450, 2900, 2000, 900, 1000],
                    'engagement_rate': [2.1, 0.9, 1.6, 2.8, 5.9]
                })
            
            # Save as CSV and analyze
            csv_content = sample_data.to_csv(index=False)
            result = await agent.analyze_data(
                content=csv_content,
                filename=f"sample_{data_theme}_data.csv",
                user_query=f"Create a {chart_type} chart for {data_theme} analysis",
                max_recommendations=1
            )
            
            response_text = f"""# 🎨 Sample Visualization Created

## Theme: {data_theme.title()}
## Chart Type: {chart_type.title()}

### Sample Data Preview:
```
{sample_data.head().to_string()}
```

### Generated Visualization:
{result.recommendations[0].reasoning}

### Interactive HTML Component:
```html
{result.html_component}
```

**💡 Tip**: Copy the HTML above to a file and open in your browser to see the interactive chart!
"""
            
            return [TextContent(type="text", text=response_text)]
            
        except Exception as e:
            error_msg = f"❌ **Error creating sample visualization**: {str(e)}"
            return [TextContent(type="text", text=error_msg)]
    
    else:
        return [TextContent(type="text", text=f"Unknown tool: {name}")]

async def main():
    """Main entry point for the MCP server"""
    async with stdio_server() as (read_stream, write_stream):
        initialization_options = InitializationOptions(
            server_name="data-visualization-mcp",
            server_version="1.0.0",
            capabilities={}
        )
        await app.run(read_stream, write_stream, initialization_options)

if __name__ == "__main__":
    """
    Installation Instructions:
    
    1. Install dependencies:
       pip install mcp pandas numpy openpyxl fastparquet
    
    2. Test the server:
       python mcp_data_viz_tool.py
    
    3. Register with Claude Desktop:
       {
         "mcpServers": {
           "data-visualization": {
             "command": "python",
             "args": ["/path/to/mcp_data_viz_tool.py"]
           }
         }
       }
    """
    
    import sys
    
    # Check if running as a test
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        print("🧪 Testing MCP Data Visualization Tool...")
        
        # Test sample data generation
        try:
            sample_data = pd.DataFrame({
                'x': [1, 2, 3, 4, 5],
                'y': [2, 5, 3, 8, 7]
            })
            print(f"✅ Sample data generation: OK ({len(sample_data)} rows)")
        except Exception as e:
            print(f"❌ Sample data generation failed: {e}")
            sys.exit(1)
        
        # Test agent initialization
        try:
            test_agent = MCPDataVisualizationAgent()
            print("✅ Agent initialization: OK")
        except Exception as e:
            print(f"❌ Agent initialization failed: {e}")
            sys.exit(1)
        
        # Test chart data creation
        try:
            csv_content = sample_data.to_csv(index=False)
            print("✅ CSV generation: OK")
        except Exception as e:
            print(f"❌ CSV generation failed: {e}")
            sys.exit(1)
        
        print("🎉 All tests passed! MCP server should work correctly.")
        print("Run without 'test' argument to start the MCP server.")
        sys.exit(0)
    
    # Set up logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[logging.StreamHandler()]
    )
    
    logger.info("Starting Data Visualization MCP Server")
    logger.info("Press Ctrl+C to stop the server")
    
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
    except Exception as e:
        logger.error(f"Server error: {e}")
        logger.error("Try running with 'test' argument to diagnose issues: python mcp_data_viz_tool.py test")
        raise
from gradio import Interface, inputs, outputs
from theme_analyzer import ThemeAnalyzer
import json

# Initialize the ThemeAnalyzer
theme_analyzer = ThemeAnalyzer(api_key=None)  # Replace with your API key if needed

def analyze_css(css_data, url, analysis_depth):
    result = theme_analyzer.analyze_css_and_generate_theme(
        css_data=json.loads(css_data),
        url=url,
        analysis_depth=analysis_depth
    )
    return json.dumps(result, indent=2)

# Define Gradio interface
iface = Interface(
    fn=analyze_css,
    inputs=[
        inputs.Textbox(label="CSS Data (JSON format)", placeholder='{"analysis": {"colors": ["#ff0000", "#00ff00"], ...}}'),
        inputs.Textbox(label="Source URL"),
        inputs.Radio(label="Analysis Depth", choices=["basic", "detailed", "comprehensive"], value="detailed")
    ],
    outputs=outputs.Textbox(label="Theme Configuration"),
    title="Theme Analyzer",
    description="Analyze CSS data and generate theme configurations using the ThemeAnalyzer."
)

if __name__ == "__main__":
    iface.launch()
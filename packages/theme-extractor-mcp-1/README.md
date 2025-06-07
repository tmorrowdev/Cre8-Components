# Theme Extractor and Analyzer

This project provides a theme extraction and analysis tool that utilizes the `ThemeAnalyzer` class to analyze CSS data and generate theme configurations. The tool is designed to help developers create cohesive and accessible design systems based on extracted CSS values.

## Project Structure

```
theme-extractor-mcp
├── src
│   └── theme_extractor_mcp
│       ├── theme_analyzer.py      # Contains the ThemeAnalyzer class for CSS analysis and theme generation.
│       ├── template_loader.py      # Contains the ThemeTemplateLoader class for managing templates and tokens.
│       └── server.py               # Exposes the ThemeAnalyzer methods as an MCP server using Gradio.
├── requirements.txt                # Lists the project dependencies.
└── README.md                       # Documentation for the project.
```

## Installation

To set up the project, clone the repository and install the required dependencies:

```bash
git clone <repository-url>
cd theme-extractor-mcp
pip install -r requirements.txt
```

## Usage

### Running the Server

To start the Gradio server that exposes the theme analysis functionality, run the following command:

```bash
python src/theme_extractor_mcp/server.py
```

This will start a web interface where you can input CSS data and receive theme configurations.

### ThemeAnalyzer Class

The `ThemeAnalyzer` class is the core of the project. It provides methods to:

- Analyze CSS data and generate theme configurations.
- Create prompts for analysis.
- Parse responses from the analysis.
- Validate and enhance generated themes.
- Generate design tokens.

### ThemeTemplateLoader Class

The `ThemeTemplateLoader` class is used by the `ThemeAnalyzer` to load templates and manage required tokens for theme generation.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
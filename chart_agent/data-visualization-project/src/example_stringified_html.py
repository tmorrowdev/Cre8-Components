#!/usr/bin/env python3
"""
Example script showing how to use the mcp_plotly_integration module
to generate a stringified HTML dashboard
"""

from pathlib import Path
import pandas as pd
from mcp_plotly_integration import generate_plotly_dashboard_string

def main():
    """
    Demonstrate how to use the mcp_plotly_integration module to generate
    a stringified HTML dashboard without writing to a file
    """
    # Example 1: Generate dashboard from CSV file
    data_path = Path('/Users/tylersmbp/Documents/Bookexcel.csv')
    
    # Generate the HTML string
    html_string = generate_plotly_dashboard_string(data_path=data_path)
    
    # Print the first 200 characters to verify it's a string
    print("\nExample 1: Generate from CSV file")
    print(f"HTML string generated (showing first 200 chars):")
    print(f"{html_string[:200]}...")
    print(f"Total HTML length: {len(html_string)} characters")
    
    # Example 2: Generate dashboard from DataFrame
    df = pd.read_csv(data_path)
    
    # Filter data for demonstration
    df_filtered = df[df['Month'].isin(['January', 'February', 'March'])]
    
    # Generate HTML from the DataFrame
    html_string_2 = generate_plotly_dashboard_string(dataframe=df_filtered)
    
    print("\nExample 2: Generate from filtered DataFrame")
    print(f"HTML string generated with {len(df_filtered)} rows of data")
    print(f"Total HTML length: {len(html_string_2)} characters")
    
    # You could now use these HTML strings in any way:
    # - Return them from an API endpoint
    # - Include them in an MCP response
    # - Embed them in another HTML page
    # - Write them to a file
    
    print("\nThese HTML strings can now be used directly in your application!")

if __name__ == "__main__":
    main()

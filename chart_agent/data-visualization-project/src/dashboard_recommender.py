#!/usr/bin/env python3
"""
Dashboard Recommender

This module analyzes CSV data and recommends the most appropriate dashboard visualizations
based on the data structure, content, and common data visualization best practices.
"""

import json
import pandas as pd
import numpy as np
from typing import Dict, List, Any, Tuple
from collections import Counter
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("dashboard-recommender")

class DashboardRecommender:
    """
    Analyzes data and recommends appropriate dashboard visualizations
    """
    
    def __init__(self):
        """Initialize the recommender"""
        self.numeric_columns = []
        self.categorical_columns = []
        self.temporal_columns = []
        self.text_columns = []
        
    def _classify_columns(self, df: pd.DataFrame) -> Dict[str, List[str]]:
        """
        Classify dataframe columns into different types
        """
        self.numeric_columns = []
        self.categorical_columns = []
        self.temporal_columns = []
        self.text_columns = []
        
        for col in df.columns:
            # Check for datetime columns
            if df[col].dtype == 'datetime64[ns]' or (isinstance(df[col].dtype, pd.DatetimeTZDtype)):
                self.temporal_columns.append(col)
            # If string column has potential date format, try to convert
            elif df[col].dtype == 'object':
                try:
                    pd.to_datetime(df[col], errors='raise')
                    self.temporal_columns.append(col)
                except:
                    # Check if categorical or text
                    if df[col].nunique() < min(20, len(df) * 0.1):  # heuristic for categorical
                        self.categorical_columns.append(col)
                    else:
                        self.text_columns.append(col)
            # Numeric columns
            elif np.issubdtype(df[col].dtype, np.number):
                if df[col].nunique() < min(10, len(df) * 0.05):  # likely categorical
                    self.categorical_columns.append(col)
                else:
                    self.numeric_columns.append(col)
            else:
                self.categorical_columns.append(col)
        
        return {
            "numeric": self.numeric_columns,
            "categorical": self.categorical_columns,
            "temporal": self.temporal_columns,
            "text": self.text_columns
        }
    
    def _identify_key_metrics(self, df: pd.DataFrame) -> List[str]:
        """
        Identify columns that are likely to be key metrics
        """
        metrics = []
        
        # Look for numeric columns that seem like KPIs
        kpi_keywords = ["revenue", "sales", "profit", "income", "cost", "expense", "price", "conversion", 
                       "click", "impression", "view", "visit", "roi", "roas", "ctr", "cpc", "amount", "count"]
        
        for col in self.numeric_columns:
            col_lower = col.lower()
            # Check for keywords in column name
            if any(keyword in col_lower for keyword in kpi_keywords):
                metrics.append(col)
        
        # If no metrics found based on name, use columns with high variance
        if not metrics and len(self.numeric_columns) > 0:
            # Calculate coefficient of variation (normalized standard deviation)
            cv = {}
            for col in self.numeric_columns:
                if df[col].std() > 0 and df[col].mean() != 0:
                    cv[col] = abs(df[col].std() / df[col].mean())
            
            # Sort by coefficient of variation
            sorted_cv = sorted(cv.items(), key=lambda x: x[1], reverse=True)
            metrics = [col for col, _ in sorted_cv[:min(3, len(sorted_cv))]]
        
        return metrics
    
    def _identify_dimensions(self, df: pd.DataFrame) -> List[str]:
        """
        Identify columns that are likely to be dimensions for grouping
        """
        dimensions = []
        
        dimension_keywords = ["name", "category", "type", "campaign", "channel", "region", 
                             "country", "state", "city", "age", "gender", "product", "department"]
        
        for col in self.categorical_columns:
            col_lower = col.lower()
            # Check for keywords in column name
            if any(keyword in col_lower for keyword in dimension_keywords):
                dimensions.append(col)
        
        # If not enough dimensions found, add more based on cardinality
        if len(dimensions) < 2 and len(self.categorical_columns) > 0:
            # Sort by nunique in ascending order to get most useful grouping columns
            cardinality = {col: df[col].nunique() for col in self.categorical_columns if col not in dimensions}
            sorted_cardinality = sorted(cardinality.items(), key=lambda x: x[1])
            
            # Add columns with reasonable cardinality (not too many unique values)
            for col, nunique in sorted_cardinality:
                if nunique <= min(20, len(df) * 0.2):  # heuristic
                    dimensions.append(col)
                if len(dimensions) >= 3:  # limit to 3 dimensions
                    break
        
        return dimensions
    
    def _identify_time_dimension(self, df: pd.DataFrame) -> str:
        """
        Identify the best time dimension for trend analysis
        """
        if not self.temporal_columns:
            return None
            
        # Prefer columns with "date" in the name
        for col in self.temporal_columns:
            if "date" in col.lower():
                return col
        
        # Otherwise just take the first temporal column
        return self.temporal_columns[0]
    
    def _recommend_charts(self, df: pd.DataFrame, dimensions: List[str], 
                         metrics: List[str], time_dimension: str) -> List[Dict[str, Any]]:
        """
        Recommend specific chart types based on data characteristics
        """
        recommendations = []
        
        # Time series charts if we have time dimension
        if time_dimension:
            for metric in metrics[:2]:  # Limit to top 2 metrics
                recommendations.append({
                    "chart_type": "line",
                    "title": f"{metric.replace('_', ' ').title()} Over Time",
                    "x": time_dimension,
                    "y": metric,
                    "priority": 1  # High priority
                })
        
        # Bar charts for categorical comparisons
        if dimensions and metrics:
            recommendations.append({
                "chart_type": "bar",
                "title": f"{metrics[0].replace('_', ' ').title()} by {dimensions[0].replace('_', ' ').title()}",
                "x": dimensions[0],
                "y": metrics[0],
                "priority": 1 if not time_dimension else 2
            })
        
        # Pie chart for categorical distribution if appropriate
        if dimensions and len(df[dimensions[0]].unique()) <= 10:
            recommendations.append({
                "chart_type": "pie",
                "title": f"Distribution by {dimensions[0].replace('_', ' ').title()}",
                "labels": dimensions[0],
                "values": metrics[0] if metrics else "count",
                "priority": 3
            })
        
        # Scatter plot for relationships between metrics
        if len(metrics) >= 2:
            recommendations.append({
                "chart_type": "scatter",
                "title": f"Correlation: {metrics[0].replace('_', ' ').title()} vs {metrics[1].replace('_', ' ').title()}",
                "x": metrics[0],
                "y": metrics[1],
                "color": dimensions[0] if dimensions else None,
                "priority": 4
            })
        
        # Heatmap for correlation matrix if many metrics
        if len(metrics) >= 4:
            recommendations.append({
                "chart_type": "heatmap",
                "title": "Correlation Matrix",
                "columns": metrics,
                "priority": 5
            })
            
        # Sort by priority
        recommendations.sort(key=lambda x: x["priority"])
        
        return recommendations
                
    def analyze_and_recommend(self, df):
        # Dynamic column detection
        numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()
        date_cols = []
        import pandas as pd
        for col in df.columns:
            try:
                pd.to_datetime(df[col].dropna().head(10), errors='raise')
                date_cols.append(col)
            except Exception:
                continue
        categorical_cols = [c for c in categorical_cols if c not in date_cols]

        # Recommend dashboard title and structure
        dashboard_title = "Data Dashboard"
        dashboard_structure = "grid"
        charts = []
        if numeric_cols and categorical_cols:
            charts.append({
                'title': f'Top {categorical_cols[0]} by {numeric_cols[0]}',
                'chart_type': 'bar',
                'x': categorical_cols[0],
                'y': numeric_cols[0]
            })
        if len(numeric_cols) >= 2:
            charts.append({
                'title': f'{numeric_cols[0]} vs {numeric_cols[1]}',
                'chart_type': 'scatter',
                'x': numeric_cols[0],
                'y': numeric_cols[1]
            })
        if date_cols and numeric_cols:
            charts.append({
                'title': f'{numeric_cols[0]} Over Time',
                'chart_type': 'line',
                'x': date_cols[0],
                'y': numeric_cols[0]
            })
        # Insights (dummy for now)
        insights = []
        if numeric_cols:
            for col in numeric_cols:
                if df[col].isnull().sum() > 0:
                    insights.append({'message': f"Column '{col}' has missing values.", 'severity': 'info'})
        return {
            'recommendations': {
                'dashboard_title': dashboard_title,
                'dashboard_structure': dashboard_structure,
                'charts': charts
            },
            'insights': insights
        }

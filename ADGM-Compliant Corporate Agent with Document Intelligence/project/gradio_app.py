#!/usr/bin/env python3
"""
ADGM Corporate Agent - Gradio Web Interface
Provides a user-friendly interface for document upload and analysis
"""

import gradio as gr
import json
import os
import tempfile
from typing import List, Tuple, Dict, Any
from datetime import datetime

from document_processor import DocumentProcessor, DocumentAnalysis, ComplianceIssue

class ADGMCorporateAgentUI:
    """Gradio interface for ADGM Corporate Agent"""
    
    def __init__(self, openai_api_key: str):
        self.processor = DocumentProcessor(openai_api_key)
        self.current_analysis = None
        
    def analyze_documents(self, files: List[str]) -> Tuple[str, str, str]:
        """Process uploaded documents and return analysis results"""
        
        if not files:
            return "No files uploaded", "", ""
        
        try:
            # Filter for .docx files only
            docx_files = [f for f in files if f.name.lower().endswith('.docx')]
            
            if not docx_files:
                return "Please upload .docx files only", "", ""
            
            # Save uploaded files temporarily
            temp_paths = []
            for file in docx_files:
                temp_path = os.path.join(tempfile.gettempdir(), os.path.basename(file.name))
                with open(temp_path, 'wb') as temp_file:
                    temp_file.write(file.read())
                temp_paths.append(temp_path)
            
            # Analyze documents
            self.current_analysis = self.processor.analyze_documents(temp_paths)
            
            # Generate outputs
            summary = self._generate_summary()
            detailed_report = self._generate_detailed_report()
            json_output = self._generate_json_output()
            
            # Clean up temporary files
            for temp_path in temp_paths:
                try:
                    os.remove(temp_path)
                except:
                    pass
            
            return summary, detailed_report, json_output
            
        except Exception as e:
            return f"Error analyzing documents: {str(e)}", "", ""
    
    def _generate_summary(self) -> str:
        """Generate a summary of the analysis results"""
        
        if not self.current_analysis:
            return "No analysis available"
        
        analysis = self.current_analysis
        
        summary = f"""
# ADGM Compliance Analysis Summary

## Process Identified
**{analysis.process}**

## Document Status
- **Uploaded:** {analysis.documents_uploaded} documents
- **Required:** {analysis.required_documents} documents
- **Missing:** {len(analysis.missing_documents)} documents

## Compliance Issues
- **Total Issues Found:** {len(analysis.issues_found)}
- **High Severity:** {sum(1 for issue in analysis.issues_found if issue.severity == 'High')}
- **Medium Severity:** {sum(1 for issue in analysis.issues_found if issue.severity == 'Medium')}
- **Low Severity:** {sum(1 for issue in analysis.issues_found if issue.severity == 'Low')}

## Confidence Score
**{analysis.confidence_score:.2%}**

---

### Missing Documents
"""
        
        if analysis.missing_documents:
            for doc in analysis.missing_documents:
                summary += f"- ❌ {doc}\n"
        else:
            summary += "✅ All required documents uploaded\n"
        
        summary += "\n### Next Steps\n"
        
        if analysis.missing_documents:
            summary += "1. Upload the missing documents listed above\n"
        
        if analysis.issues_found:
            summary += "2. Review and address the compliance issues identified\n"
            summary += "3. Download the reviewed documents with inline comments\n"
        
        if not analysis.missing_documents and not analysis.issues_found:
            summary += "✅ Your documents appear to be compliant with ADGM requirements!\n"
        
        return summary
    
    def _generate_detailed_report(self) -> str:
        """Generate a detailed compliance report"""
        
        if not self.current_analysis:
            return "No analysis available"
        
        analysis = self.current_analysis
        
        report = f"""
# Detailed ADGM Compliance Report

**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Process:** {analysis.process}

## Executive Summary

This report provides a comprehensive analysis of your documents for ADGM compliance. 
The analysis identified {len(analysis.issues_found)} compliance issues across 
{analysis.documents_uploaded} uploaded documents.

## Document Completeness Analysis

### Required Documents for {analysis.process}:
"""
        
        required_docs = self.processor._get_required_documents(analysis.process)
        for i, doc in enumerate(required_docs, 1):
            status = "✅ Uploaded" if doc not in analysis.missing_documents else "❌ Missing"
            report += f"{i}. {doc} - {status}\n"
        
        if analysis.issues_found:
            report += "\n## Compliance Issues Identified\n\n"
            
            for i, issue in enumerate(analysis.issues_found, 1):
                severity_emoji = {"High": "🔴", "Medium": "🟡", "Low": "🔵"}
                emoji = severity_emoji.get(issue.severity, "⚪")
                
                report += f"""
### Issue #{i} {emoji} {issue.severity} Severity

**Document:** {issue.document}
**Section:** {issue.section}
**Issue:** {issue.issue}

**Recommendation:** {issue.suggestion}

**Legal Reference:** {issue.reference}

---
"""
        
        report += f"""
## Compliance Score Breakdown

**Overall Confidence Score:** {analysis.confidence_score:.2%}

This score is calculated based on:
- Number and severity of compliance issues
- Document completeness
- Adherence to ADGM regulations

### Score Interpretation:
- 90-100%: Excellent compliance
- 80-89%: Good compliance with minor issues
- 70-79%: Moderate compliance, review recommended
- Below 70%: Significant compliance issues require attention

## Recommendations

1. **Immediate Actions:**
   - Address all High severity issues
   - Upload any missing required documents

2. **Review Actions:**
   - Review Medium severity issues
   - Consider legal consultation for complex matters

3. **Best Practices:**
   - Regularly review ADGM regulations for updates
   - Maintain proper documentation standards
   - Implement compliance monitoring procedures

---

*This report is generated by the ADGM Corporate Agent AI system and should be reviewed by qualified legal professionals.*
"""
        
        return report
    
    def _generate_json_output(self) -> str:
        """Generate JSON output for programmatic use"""
        
        if not self.current_analysis:
            return "{}"
        
        # Convert analysis to dictionary
        analysis_dict = {
            "process": self.current_analysis.process,
            "documents_uploaded": self.current_analysis.documents_uploaded,
            "required_documents": self.current_analysis.required_documents,
            "missing_documents": self.current_analysis.missing_documents,
            "issues_found": [
                {
                    "document": issue.document,
                    "section": issue.section,
                    "issue": issue.issue,
                    "severity": issue.severity,
                    "suggestion": issue.suggestion,
                    "reference": issue.reference
                }
                for issue in self.current_analysis.issues_found
            ],
            "confidence_score": self.current_analysis.confidence_score,
            "analysis_timestamp": datetime.now().isoformat()
        }
        
        return json.dumps(analysis_dict, indent=2)
    
    def create_interface(self) -> gr.Interface:
        """Create and return the Gradio interface"""
        
        with gr.Blocks(
            title="ADGM Corporate Agent",
            theme=gr.themes.Soft(),
            css="""
            .gradio-container {
                max-width: 1200px !important;
            }
            .header {
                text-align: center;
                margin-bottom: 2rem;
            }
            .upload-section {
                border: 2px dashed #e5e7eb;
                border-radius: 8px;
                padding: 2rem;
                margin: 1rem 0;
            }
            """
        ) as interface:
            
            # Header
            gr.HTML("""
            <div class="header">
                <h1>🏛️ ADGM Corporate Agent</h1>
                <h2>AI-Powered Legal Document Intelligence</h2>
                <p>Upload your ADGM documents for automated compliance analysis and review</p>
            </div>
            """)
            
            with gr.Row():
                with gr.Column(scale=1):
                    # File upload section
                    gr.HTML("<h3>📄 Document Upload</h3>")
                    
                    file_upload = gr.File(
                        label="Upload ADGM Documents (.docx only)",
                        file_count="multiple",
                        file_types=[".docx"],
                        height=200
                    )
                    
                    analyze_btn = gr.Button(
                        "🔍 Analyze Documents",
                        variant="primary",
                        size="lg"
                    )
                    
                    # Information panel
                    gr.HTML("""
                    <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                        <h4>📋 Supported Document Types:</h4>
                        <ul>
                            <li>Articles of Association</li>
                            <li>Memorandum of Association</li>
                            <li>Board Resolutions</li>
                            <li>Employment Contracts</li>
                            <li>License Applications</li>
                            <li>Compliance Policies</li>
                        </ul>
                    </div>
                    """)
                
                with gr.Column(scale=2):
                    # Results section
                    gr.HTML("<h3>📊 Analysis Results</h3>")
                    
                    with gr.Tabs():
                        with gr.Tab("📋 Summary"):
                            summary_output = gr.Markdown(
                                label="Analysis Summary",
                                value="Upload documents to see analysis results..."
                            )
                        
                        with gr.Tab("📄 Detailed Report"):
                            detailed_output = gr.Markdown(
                                label="Detailed Compliance Report",
                                value="Upload documents to see detailed report..."
                            )
                        
                        with gr.Tab("💻 JSON Output"):
                            json_output = gr.Code(
                                label="Structured JSON Output",
                                language="json",
                                value="{}",
                                lines=20
                            )
            
            # Download section
            with gr.Row():
                gr.HTML("<h3>⬇️ Download Results</h3>")
                
                with gr.Column():
                    download_reviewed = gr.File(
                        label="📝 Download Reviewed Documents",
                        visible=False
                    )
                
                with gr.Column():
                    download_report = gr.File(
                        label="📊 Download Analysis Report",
                        visible=False
                    )
            
            # Footer
            gr.HTML("""
            <div style="text-align: center; margin-top: 2rem; padding: 1rem; background: #f9fafb; border-radius: 8px;">
                <p><strong>ADGM Corporate Agent</strong> - Built with RAG technology for accurate ADGM compliance</p>
                <p>
                    <a href="https://www.adgm.com" target="_blank">ADGM Official Website</a> | 
                    <a href="https://www.adgm.com/doing-business/legal-framework" target="_blank">Legal Framework</a> | 
                    <a href="https://www.adgm.com/fsra" target="_blank">FSRA</a>
                </p>
                <p style="font-size: 0.8em; color: #6b7280;">
                    ⚠️ This tool provides automated analysis for reference only. 
                    Always consult with qualified legal professionals for official compliance advice.
                </p>
            </div>
            """)
            
            # Event handlers
            analyze_btn.click(
                fn=self.analyze_documents,
                inputs=[file_upload],
                outputs=[summary_output, detailed_output, json_output]
            )
        
        return interface

def main():
    """Main function to launch the Gradio app"""
    
    # Get OpenAI API key from environment or user input
    openai_api_key = os.getenv("OPENAI_API_KEY")
    
    if not openai_api_key:
        print("Please set your OpenAI API key as an environment variable: OPENAI_API_KEY")
        openai_api_key = input("Or enter your OpenAI API key: ").strip()
    
    if not openai_api_key:
        print("OpenAI API key is required to run the application.")
        return
    
    # Create and launch the application
    app = ADGMCorporateAgentUI(openai_api_key)
    interface = app.create_interface()
    
    # Launch with public sharing disabled by default
    interface.launch(
        server_name="0.0.0.0",
        server_port=7860,
        share=False,  # Set to True for public sharing
        debug=True
    )

if __name__ == "__main__":
    main()
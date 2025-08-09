# ADGM Corporate Agent - AI-Powered Legal Document Intelligence

A comprehensive AI-powered legal assistant for reviewing, validating, and preparing documentation for business incorporation and compliance within the Abu Dhabi Global Market (ADGM) jurisdiction.

## 🏛️ Overview

The ADGM Corporate Agent is an intelligent document analysis system that combines:
- **Document Intelligence**: Automated parsing and analysis of .docx legal documents
- **Compliance Checking**: Real-time validation against ADGM regulations and requirements
- **RAG Technology**: Retrieval-Augmented Generation for accurate legal guidance
- **Interactive Interface**: User-friendly web interface built with React and Gradio

## ✨ Key Features

### 📄 Document Processing
- **Multi-document Upload**: Accept multiple .docx files simultaneously
- **Document Type Recognition**: Automatically identify document types and legal processes
- **Content Extraction**: Parse and analyze document content for compliance review

### 🔍 Compliance Analysis
- **ADGM Rule Validation**: Check documents against official ADGM regulations
- **Red Flag Detection**: Identify legal issues, missing clauses, and non-compliance
- **Severity Assessment**: Categorize issues by High, Medium, and Low severity
- **Contextual Comments**: Insert compliance comments directly into documents

### 📋 Process Management
- **Document Checklists**: Verify completeness against required document lists
- **Process Detection**: Automatically identify legal processes (incorporation, licensing, etc.)
- **Missing Document Alerts**: Notify users of incomplete submissions

### 🤖 AI-Powered Analysis
- **RAG Integration**: Leverage official ADGM documents for accurate guidance
- **Natural Language Processing**: Advanced text analysis and legal interpretation
- **Confidence Scoring**: Provide reliability scores for analysis results

### Screenshots
<img width="1919" height="948" alt="Screenshot 2025-08-09 090725" src="https://github.com/user-attachments/assets/c1af5a1c-97d4-4bd2-8fcf-58aa9eff0fb8" />


## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd adgm-corporate-agent
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   export OPENAI_API_KEY="your-openai-api-key"
   ```

### Running the Application

1. **Start the React frontend**
   ```bash
   npm run dev
   ```

2. **Launch the Gradio backend** (in a separate terminal)
   ```bash
   python gradio_app.py
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Gradio Interface: http://localhost:7860

## 📚 Supported Document Types

### Company Formation
- Articles of Association (AoA)
- Memorandum of Association (MoA)
- Board Resolution Templates
- Shareholder Resolution Templates
- Incorporation Application Form
- UBO Declaration Form
- Register of Members and Directors

### Licensing & Regulatory
- FSRA License Applications
- Business Plans
- Compliance Manuals
- Risk Management Frameworks

### Employment & HR
- Employment Contracts
- Visa Applications
- Educational Certificates
- Medical Certificates

### Commercial Agreements
- Service Agreements
- Partnership Agreements
- Commercial Contracts

## 🔧 Technical Architecture

### Frontend (React + TypeScript)
- **Document Uploader**: File upload and management interface
- **Compliance Analyzer**: Real-time compliance rule display
- **ADGM Checklists**: Reference document requirements
- **RAG System**: Knowledge base management interface

### Backend (Python)
- **Document Processor**: Core document analysis engine
- **Compliance Rules**: ADGM regulation validation logic
- **RAG Integration**: Vector database and retrieval system
- **Gradio Interface**: Web-based document upload and analysis

### AI Components
- **OpenAI GPT**: Natural language processing and analysis
- **LangChain**: RAG implementation and document retrieval
- **ChromaDB**: Vector storage for ADGM knowledge base
- **Document Intelligence**: .docx parsing and comment insertion

## 📊 Analysis Output

### Summary Report
```
Process: Company Incorporation
Documents: 4 of 5 required
Missing: Register of Members and Directors
Issues: 3 (2 High, 1 Medium)
Confidence: 78%
```

### Detailed JSON Output
```json
{
  "process": "Company Incorporation",
  "documents_uploaded": 4,
  "required_documents": 5,
  "missing_documents": ["Register of Members and Directors"],
  "issues_found": [
    {
      "document": "Articles of Association",
      "section": "Clause 3.1",
      "issue": "Jurisdiction clause does not specify ADGM",
      "severity": "High",
      "suggestion": "Update jurisdiction to ADGM Courts",
      "reference": "ADGM Companies Regulations 2020, Art. 6"
    }
  ],
  "confidence_score": 0.78
}
```

## 🛡️ Compliance Features

### ADGM-Specific Validations
- **Jurisdiction Requirements**: Ensure ADGM court jurisdiction is specified
- **UBO Declarations**: Verify Ultimate Beneficial Ownership compliance
- **Registered Office**: Confirm ADGM registered address requirements
- **Director Requirements**: Validate minimum director qualifications
- **Share Capital**: Check minimum capital requirements

### Red Flag Detection
- Invalid or missing legal clauses
- Incorrect jurisdiction references
- Ambiguous or non-binding language
- Missing signatory sections
- Non-compliance with ADGM templates

## 📖 Knowledge Base

The system includes a comprehensive RAG knowledge base covering:
- ADGM Companies Regulations 2020
- ADGM AML Rules 2019
- FSRA Licensing Guidelines
- Employment Regulations
- Official Forms and Templates

## 🔗 Official ADGM Resources

- [ADGM Official Website](https://www.adgm.com)
- [Legal Framework](https://www.adgm.com/doing-business/legal-framework)
- [Company Incorporation](https://www.adgm.com/doing-business/company-incorporation)
- [FSRA Licensing](https://www.adgm.com/fsra/licensing)
- [Employment Regulations](https://www.adgm.com/doing-business/legal-framework/employment-regulations)

## ⚠️ Important Disclaimers

- This tool provides automated analysis for reference purposes only
- Always consult with qualified legal professionals for official compliance advice
- ADGM regulations may change - verify current requirements with official sources
- The AI analysis should supplement, not replace, professional legal review

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For technical support or questions about ADGM compliance, please:
1. Check the documentation and FAQ
2. Review official ADGM resources
3. Consult with qualified legal professionals
4. Submit issues through the project repository

---

**Built with ❤️ for the ADGM business community**

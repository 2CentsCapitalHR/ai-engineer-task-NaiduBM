import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, Download } from 'lucide-react';

interface DocumentAnalysis {
  process: string;
  documents_uploaded: number;
  required_documents: number;
  missing_documents: string[];
  issues_found: Array<{
    document: string;
    section: string;
    issue: string;
    severity: 'High' | 'Medium' | 'Low';
    suggestion: string;
  }>;
}

interface DocumentUploaderProps {
  onAnalysisComplete: (analysis: DocumentAnalysis) => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onAnalysisComplete }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    const docxFiles = uploadedFiles.filter(file => 
      file.name.toLowerCase().endsWith('.docx')
    );
    
    if (docxFiles.length !== uploadedFiles.length) {
      alert('Please upload only .docx files');
      return;
    }
    
    setFiles(docxFiles);
  }, []);

  const analyzeDocuments = async () => {
    if (files.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate document analysis
    setTimeout(() => {
      const mockAnalysis: DocumentAnalysis = {
        process: "Company Incorporation",
        documents_uploaded: files.length,
        required_documents: 5,
        missing_documents: files.length < 5 ? ["Register of Members and Directors"] : [],
        issues_found: [
          {
            document: "Articles of Association",
            section: "Clause 3.1",
            issue: "Jurisdiction clause does not specify ADGM",
            severity: "High",
            suggestion: "Update jurisdiction to ADGM Courts per ADGM Companies Regulations 2020, Art. 6"
          },
          {
            document: "Memorandum of Association",
            section: "Section 2.3",
            issue: "Missing UBO declaration reference",
            severity: "Medium",
            suggestion: "Include reference to UBO Declaration Form as required by ADGM AML regulations"
          }
        ]
      };
      
      setAnalysis(mockAnalysis);
      onAnalysisComplete(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900">Upload ADGM Documents</h3>
          <p className="text-gray-500">Select .docx files for compliance review</p>
          <input
            type="file"
            multiple
            accept=".docx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Choose Files
          </label>
        </div>
      </div>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-3">Uploaded Documents ({files.length})</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
            ))}
          </div>
          
          <button
            onClick={analyzeDocuments}
            disabled={isAnalyzing}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? 'Analyzing Documents...' : 'Analyze for ADGM Compliance'}
          </button>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Analysis Complete</h3>
          </div>

          {/* Process Detection */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Detected Process</h4>
            <p className="text-blue-800">{analysis.process}</p>
            <div className="mt-2 text-sm text-blue-700">
              Documents: {analysis.documents_uploaded} of {analysis.required_documents} required
            </div>
          </div>

          {/* Missing Documents */}
          {analysis.missing_documents.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-900">Missing Documents</h4>
              </div>
              <ul className="list-disc list-inside text-yellow-800 space-y-1">
                {analysis.missing_documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Issues Found */}
          {analysis.issues_found.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Issues Identified</h4>
              <div className="space-y-3">
                {analysis.issues_found.map((issue, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-gray-900">{issue.document}</h5>
                        <p className="text-sm text-gray-600">{issue.section}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{issue.issue}</p>
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                      <p className="text-sm text-green-800">
                        <strong>Suggestion:</strong> {issue.suggestion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Download Section */}
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              <Download className="h-4 w-4" />
              <span>Download Reviewed Documents</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              <FileText className="h-4 w-4" />
              <span>Download Analysis Report</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
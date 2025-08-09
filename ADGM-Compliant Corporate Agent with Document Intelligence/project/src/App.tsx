import React from 'react';
import { useState } from 'react';
import { Scale, FileText, Database, Shield, Menu, X } from 'lucide-react';
import { DocumentUploader } from './components/DocumentUploader';
import { ADGMChecklists } from './components/ADGMChecklists';
import { ComplianceAnalyzer } from './components/ComplianceAnalyzer';
import { RAGSystem } from './components/RAGSystem';

type TabType = 'upload' | 'checklists' | 'compliance' | 'rag';

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

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'upload' as TabType, name: 'Document Upload', icon: FileText },
    { id: 'checklists' as TabType, name: 'ADGM Checklists', icon: FileText },
    { id: 'compliance' as TabType, name: 'Compliance Rules', icon: Shield },
    { id: 'rag' as TabType, name: 'Knowledge Base', icon: Database },
  ];

  const handleAnalysisComplete = (analysisResult: DocumentAnalysis) => {
    setAnalysis(analysisResult);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Scale className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">ADGM Corporate Agent</h1>
                <p className="text-sm text-gray-600">AI-Powered Legal Document Intelligence</p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className={`lg:w-64 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Analysis Summary */}
              {analysis && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-900 mb-2">Latest Analysis</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>Process: {analysis.process}</p>
                    <p>Documents: {analysis.documents_uploaded}/{analysis.required_documents}</p>
                    <p>Issues: {analysis.issues_found.length}</p>
                  </div>
                </div>
              )}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'upload' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <DocumentUploader onAnalysisComplete={handleAnalysisComplete} />
              </div>
            )}
            
            {activeTab === 'checklists' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <ADGMChecklists selectedProcess={analysis?.process} />
              </div>
            )}
            
            {activeTab === 'compliance' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <ComplianceAnalyzer />
              </div>
            )}
            
            {activeTab === 'rag' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <RAGSystem />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">ADGM Corporate Agent - AI-Powered Legal Document Intelligence</p>
            <p className="text-sm">
              Built with RAG technology for accurate ADGM compliance checking
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <a href="https://www.adgm.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                ADGM Official Website
              </a>
              <a href="https://www.adgm.com/doing-business/legal-framework" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                Legal Framework
              </a>
              <a href="https://www.adgm.com/fsra" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                FSRA
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

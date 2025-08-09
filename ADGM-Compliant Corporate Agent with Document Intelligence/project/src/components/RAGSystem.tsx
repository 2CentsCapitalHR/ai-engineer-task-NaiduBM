import React, { useState, useEffect } from 'react';
import { Database, Search, BookOpen, ExternalLink, RefreshCw } from 'lucide-react';

interface KnowledgeSource {
  id: string;
  title: string;
  type: 'regulation' | 'guideline' | 'form' | 'template';
  url: string;
  lastUpdated: string;
  description: string;
  status: 'active' | 'indexed' | 'error';
}

const ADGM_KNOWLEDGE_SOURCES: KnowledgeSource[] = [
  {
    id: 'adgm-companies-reg-2020',
    title: 'ADGM Companies Regulations 2020',
    type: 'regulation',
    url: 'https://www.adgm.com/doing-business/legal-framework/companies-regulations',
    lastUpdated: '2024-01-15',
    description: 'Comprehensive regulations governing company formation and operations in ADGM',
    status: 'indexed'
  },
  {
    id: 'adgm-aml-rules-2019',
    title: 'ADGM AML Rules 2019',
    type: 'regulation',
    url: 'https://www.adgm.com/doing-business/legal-framework/aml-rules',
    lastUpdated: '2023-12-10',
    description: 'Anti-Money Laundering and Counter-Terrorist Financing rules',
    status: 'indexed'
  },
  {
    id: 'fsra-licensing-guide',
    title: 'FSRA Licensing Guidelines',
    type: 'guideline',
    url: 'https://www.adgm.com/fsra/licensing',
    lastUpdated: '2024-02-01',
    description: 'Guidelines for obtaining Financial Services Regulatory Authority licenses',
    status: 'indexed'
  },
  {
    id: 'incorporation-forms',
    title: 'Company Incorporation Forms',
    type: 'form',
    url: 'https://www.adgm.com/doing-business/company-incorporation/forms',
    lastUpdated: '2024-01-20',
    description: 'Official forms required for company incorporation in ADGM',
    status: 'active'
  },
  {
    id: 'employment-regulations',
    title: 'ADGM Employment Regulations',
    type: 'regulation',
    url: 'https://www.adgm.com/doing-business/legal-framework/employment-regulations',
    lastUpdated: '2023-11-30',
    description: 'Regulations governing employment relationships in ADGM',
    status: 'indexed'
  }
];

interface RAGSystemProps {
  onSourceSelect?: (source: KnowledgeSource) => void;
}

export const RAGSystem: React.FC<RAGSystemProps> = ({ onSourceSelect }) => {
  const [sources, setSources] = useState<KnowledgeSource[]>(ADGM_KNOWLEDGE_SOURCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isIndexing, setIsIndexing] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredSources = sources.filter(source => {
    const matchesSearch = source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || source.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'indexed': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'regulation': return '📋';
      case 'guideline': return '📖';
      case 'form': return '📄';
      case 'template': return '📝';
      default: return '📄';
    }
  };

  const handleReindex = async () => {
    setIsIndexing(true);
    // Simulate reindexing process
    setTimeout(() => {
      setSources(prev => prev.map(source => ({
        ...source,
        status: 'indexed',
        lastUpdated: new Date().toISOString().split('T')[0]
      })));
      setIsIndexing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Database className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">RAG Knowledge Base</h2>
        </div>
        <p className="text-gray-600">Retrieval-Augmented Generation system for ADGM legal documents</p>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search knowledge sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="regulation">Regulations</option>
              <option value="guideline">Guidelines</option>
              <option value="form">Forms</option>
              <option value="template">Templates</option>
            </select>
          </div>
          <button
            onClick={handleReindex}
            disabled={isIndexing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isIndexing ? 'animate-spin' : ''}`} />
            <span>{isIndexing ? 'Indexing...' : 'Reindex'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="font-medium text-green-900">Active Sources</div>
            <div className="text-green-700">{sources.filter(s => s.status === 'active').length}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="font-medium text-blue-900">Indexed Sources</div>
            <div className="text-blue-700">{sources.filter(s => s.status === 'indexed').length}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Total Sources</div>
            <div className="text-gray-700">{sources.length}</div>
          </div>
        </div>
      </div>

      {/* Knowledge Sources */}
      <div className="space-y-4">
        {filteredSources.map((source) => (
          <div key={source.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getTypeIcon(source.type)}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{source.title}</h3>
                  <p className="text-sm text-gray-600 capitalize">{source.type} • Last updated: {source.lastUpdated}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(source.status)}`}>
                {source.status}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{source.description}</p>
            
            <div className="flex items-center justify-between">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-4 w-4" />
                <span>View Source</span>
              </a>
              
              {onSourceSelect && (
                <button
                  onClick={() => onSourceSelect(source)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Use in Analysis
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sources found</h3>
          <p className="text-gray-600">Try adjusting your search terms or type filter.</p>
        </div>
      )}
    </div>
  );
};
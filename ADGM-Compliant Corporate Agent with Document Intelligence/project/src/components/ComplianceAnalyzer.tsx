import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, Search } from 'lucide-react';

interface ComplianceRule {
  id: string;
  category: string;
  rule: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  reference: string;
}

const ADGM_COMPLIANCE_RULES: ComplianceRule[] = [
  {
    id: 'COMP-001',
    category: 'Jurisdiction',
    rule: 'ADGM Court Jurisdiction',
    description: 'All legal documents must specify ADGM Courts as the governing jurisdiction',
    severity: 'High',
    reference: 'ADGM Companies Regulations 2020, Article 6'
  },
  {
    id: 'COMP-002',
    category: 'Corporate Governance',
    rule: 'Director Minimum Requirements',
    description: 'At least one director must be a natural person',
    severity: 'High',
    reference: 'ADGM Companies Regulations 2020, Article 155'
  },
  {
    id: 'COMP-003',
    category: 'AML/CFT',
    rule: 'UBO Declaration',
    description: 'Ultimate Beneficial Ownership must be declared for all entities',
    severity: 'High',
    reference: 'ADGM AML Rules 2019, Rule 3.2'
  },
  {
    id: 'COMP-004',
    category: 'Share Capital',
    rule: 'Minimum Share Capital',
    description: 'Companies must maintain minimum authorized share capital as per license type',
    severity: 'Medium',
    reference: 'ADGM Companies Regulations 2020, Article 64'
  },
  {
    id: 'COMP-005',
    category: 'Registered Office',
    rule: 'ADGM Registered Address',
    description: 'Companies must maintain a registered office address within ADGM',
    severity: 'High',
    reference: 'ADGM Companies Regulations 2020, Article 29'
  },
  {
    id: 'COMP-006',
    category: 'Financial Services',
    rule: 'FSRA Authorization',
    description: 'Financial services activities require FSRA authorization',
    severity: 'High',
    reference: 'ADGM FSMR 2015, Article 9'
  }
];

interface ComplianceAnalyzerProps {
  documentType?: string;
}

export const ComplianceAnalyzer: React.FC<ComplianceAnalyzerProps> = ({ documentType }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', ...Array.from(new Set(ADGM_COMPLIANCE_RULES.map(rule => rule.category)))];

  const filteredRules = ADGM_COMPLIANCE_RULES.filter(rule => {
    const matchesCategory = selectedCategory === 'All' || rule.category === selectedCategory;
    const matchesSearch = rule.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'Medium': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'Low': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">ADGM Compliance Analyzer</h2>
        </div>
        <p className="text-gray-600">Real-time compliance checking against ADGM regulations</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search compliance rules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Compliance Rules */}
      <div className="space-y-4">
        {filteredRules.map((rule) => (
          <div key={rule.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getSeverityIcon(rule.severity)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{rule.rule}</h3>
                  <p className="text-sm text-gray-600">{rule.category} • {rule.id}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(rule.severity)}`}>
                {rule.severity}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{rule.description}</p>
            
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Legal Reference</span>
              </div>
              <p className="text-blue-800 text-sm">{rule.reference}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredRules.length === 0 && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No rules found</h3>
          <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
        </div>
      )}
    </div>
  );
};
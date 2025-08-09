import React from 'react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface ChecklistItem {
  name: string;
  required: boolean;
  description: string;
}

interface ProcessChecklist {
  process: string;
  description: string;
  documents: ChecklistItem[];
}

const ADGM_CHECKLISTS: ProcessChecklist[] = [
  {
    process: "Company Incorporation",
    description: "Required documents for incorporating a company in ADGM",
    documents: [
      {
        name: "Articles of Association (AoA)",
        required: true,
        description: "Defines the company's internal rules and regulations"
      },
      {
        name: "Memorandum of Association (MoA)",
        required: true,
        description: "Outlines the company's constitution and scope of activities"
      },
      {
        name: "Incorporation Application Form",
        required: true,
        description: "Official ADGM form for company registration"
      },
      {
        name: "UBO Declaration Form",
        required: true,
        description: "Ultimate Beneficial Ownership declaration as per AML requirements"
      },
      {
        name: "Register of Members and Directors",
        required: true,
        description: "Initial register of company members and directors"
      }
    ]
  },
  {
    process: "Financial Services Licensing",
    description: "Documents required for FSRA licensing in ADGM",
    documents: [
      {
        name: "FSRA License Application",
        required: true,
        description: "Application for Financial Services Regulatory Authority license"
      },
      {
        name: "Business Plan",
        required: true,
        description: "Detailed business plan including financial projections"
      },
      {
        name: "Compliance Manual",
        required: true,
        description: "Internal compliance policies and procedures"
      },
      {
        name: "Risk Management Framework",
        required: true,
        description: "Risk assessment and management policies"
      },
      {
        name: "Key Personnel CVs",
        required: true,
        description: "Curriculum vitae of key management personnel"
      }
    ]
  },
  {
    process: "Employment Visa Application",
    description: "Documents for ADGM employment visa processing",
    documents: [
      {
        name: "Employment Contract",
        required: true,
        description: "ADGM-compliant employment agreement"
      },
      {
        name: "Educational Certificates",
        required: true,
        description: "Attested educational qualifications"
      },
      {
        name: "Experience Certificates",
        required: true,
        description: "Previous employment experience documentation"
      },
      {
        name: "Medical Certificate",
        required: true,
        description: "Health clearance from approved medical center"
      },
      {
        name: "Passport Copy",
        required: true,
        description: "Valid passport with minimum 6 months validity"
      }
    ]
  }
];

interface ADGMChecklistsProps {
  selectedProcess?: string;
}

export const ADGMChecklists: React.FC<ADGMChecklistsProps> = ({ selectedProcess }) => {
  const displayChecklists = selectedProcess 
    ? ADGM_CHECKLISTS.filter(checklist => checklist.process === selectedProcess)
    : ADGM_CHECKLISTS;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ADGM Document Checklists</h2>
        <p className="text-gray-600">Reference checklists for various ADGM processes</p>
      </div>

      {displayChecklists.map((checklist, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-blue-900">{checklist.process}</h3>
            <p className="text-blue-700 text-sm mt-1">{checklist.description}</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {checklist.documents.map((document, docIndex) => (
                <div key={docIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {document.required ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <h4 className="font-medium text-gray-900">{document.name}</h4>
                      {document.required && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{document.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-900">Important Note</h4>
              </div>
              <p className="text-yellow-800 text-sm mt-2">
                All documents must comply with ADGM regulations and be properly attested where required. 
                Consult with ADGM authorities or legal counsel for the most current requirements.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
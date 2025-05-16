import React from 'react';
import { Tool } from '../types';
import * as icons from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  onClick: (id: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  // Dynamically get the icon component
  const LucideIcon = icons[tool.icon as keyof typeof icons] || icons.Code;
  
  const categoryColors = {
    text: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    binary: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    hash: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    image: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    utility: 'bg-gray-50 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300',
    formatter: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    converter: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    generator: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  };
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 
                 overflow-hidden hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700 
                 transition-all duration-200 cursor-pointer animate-fade-in"
      onClick={() => onClick(tool.id)}
    >
      <div className="p-5">
        <div className="flex items-center space-x-3 mb-3">
          <div className={`p-2 rounded-lg ${categoryColors[tool.category]}`}>
            <LucideIcon size={20} />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{tool.description}</p>
      </div>
    </div>
  );
};

export default ToolCard;
import React from 'react';
import ToolCard from './ToolCard';
import { Tool } from '../types';

interface ToolGridProps {
  title: string;
  categoryId: string;
  tools: Tool[];
  onSelectTool: (id: string) => void;
}

const ToolGrid: React.FC<ToolGridProps> = ({ title, categoryId, tools, onSelectTool }) => {
  return (
    <section id={categoryId} className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map(tool => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              onClick={onSelectTool} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolGrid;
import React from 'react';
import Collections from './Collections';

const CollectionsTest: React.FC = () => {
  // Test with a dummy user ID to bypass authentication
  const testUserId = 'test-user-123';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="p-6">
        <div className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700">
            <strong>TEST MODE:</strong> This page bypasses authentication to test the collection system.
            Using test user ID: {testUserId}
          </p>
        </div>
        <Collections userId={testUserId} />
      </div>
    </div>
  );
};

export default CollectionsTest;

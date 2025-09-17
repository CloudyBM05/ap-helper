import React from 'react';
import { useParams } from 'react-router-dom';
import APGovUnit1 from './APGovUnit1';
import APGovUnit2 from './APGovUnit2';
import APGovUnit3 from './APGovUnit3';
import APGovUnit4 from './APGovUnit4';
import APGovUnit5 from './APGovUnit5';

const APGovUnit: React.FC = () => {
    const { unitId } = useParams<{ unitId: string }>();

    switch (unitId) {
        case '1':
            return <APGovUnit1 />;
        case '2':
            return <APGovUnit2 />;
        case '3':
            return <APGovUnit3 />;
        case '4':
            return <APGovUnit4 />;
        case '5':
            return <APGovUnit5 />;
        default:
            return <div>Unit not found</div>;
    }
};

export default APGovUnit;

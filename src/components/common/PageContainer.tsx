import React from 'react';
import {LinearProgress} from '@material-ui/core';

interface PageContainerProps {
    loading?: boolean
}

const PageContainer: React.FunctionComponent<PageContainerProps> = ({children, loading}) => {
    return <div style={{padding: 24}}>
        {loading && <LinearProgress/>}
        {children}
    </div>
};

export default PageContainer;
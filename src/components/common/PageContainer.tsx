import React from 'react';

interface PageContainerProps {

}

const PageContainer: React.FunctionComponent<PageContainerProps> = ({children}) => {
    return <div style={{padding: 24}}>
        {children}
    </div>
};

export default PageContainer;
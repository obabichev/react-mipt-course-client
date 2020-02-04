import React from 'react';

interface UserIconProps {
    name: string
}

export const UserIcon: React.FunctionComponent<UserIconProps> = ({name}) => {
    const abbr = name.split(' ')
        .map(word => word[0]?.toUpperCase() || '')
        .filter((item, index) => index < 2)
        .join('');

    return <span style={{
        width: '24px',
        height: '24px',
        backgroundColor: "#0052cc",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%'
    }}>
            <span style={{color: 'white', fontSize: '12px'}}>{abbr}</span>
        </span>;
};

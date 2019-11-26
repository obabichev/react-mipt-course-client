import React, {FC} from 'react';

interface AuthProps {

}

export const Auth: FC<AuthProps> = (props: AuthProps) => {
    return <div>
        <div>
            <label>Login</label>
            <input/>
        </div>
        <div>
            <label>Password</label>
            <input/>
        </div>
    </div>;
};

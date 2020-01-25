import React, {useState} from 'react';
import {Button} from '@material-ui/core';

export const RedirectGoogleAuth = () => {
    const [redirect, setRedirect] = useState(false);

    const nonce = `${Date.now()}}`;
    const clientId = '416520824005-i7rgnt5fcm7rd12av7p7h70ndvnmjodp.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3000/google';
    const responseType = 'id_token';
    const scope = 'openid profile email';

    const onClick = () => setRedirect(true);

    if (redirect) {
        // @ts-ignore
        window.location = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&nonce=${nonce}`;
    }

    return <Button color="primary" variant="outlined" style={{textTransform: 'capitalize'}} onClick={onClick}>
        <img alt="google-auth" src="/images/google-auth.png" width={32} height={32}/>
        Sign in with Google
    </Button>
};

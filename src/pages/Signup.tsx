import { Grid } from '@mui/material';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LayoutLogicCardCreate from '../components/Form/LayoutLogicCardCreate';

const Signin: React.FC = () => {
    return (
        <Grid container height="100vh" width="100vw" bgcolor=" #6c62b7">
            <LayoutLogicCardCreate
                mode="signup"
                icon={<AccountCircleIcon />}
                titleButton="Criar"
                titleHeader="Crie sua conta"
            />
        </Grid>
    );
};

export default Signin;

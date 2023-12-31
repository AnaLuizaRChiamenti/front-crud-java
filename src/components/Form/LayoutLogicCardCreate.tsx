import { Box, Grid, Paper } from '@mui/material';
import React from 'react';

import Form from './Form';
import HeaderLayout from './HeaderLayout';

interface RegisterCardProps {
    titleHeader: string;
    titleButton: string;
    mode: 'signin' | 'signup';
    icon: React.ReactNode;
}

const RegisterCard: React.FC<RegisterCardProps> = ({ titleHeader, icon, mode, titleButton }) => {
    return (
        <Grid
            container
            sx={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper
                elevation={16}
                sx={{
                    height: '70%',
                    width: '30%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '20px',
                    '@media (max-width:1000px)': {
                        width: '40%',
                        height: '60%'
                    },
                    '@media (max-width:770px)': {
                        width: '50%'
                    },
                    '@media (max-width:600px)': {
                        width: '60%'
                    },
                    '@media (max-width:450px)': {
                        width: '80%'
                    },
                    '@media (max-width:375px)': {
                        width: '80%',
                        height: '80%'
                    }
                }}
            >
                <Box
                    width="80%"
                    component="section"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <HeaderLayout title={titleHeader} colorIcon="#f6e03c" icon={icon} />
                    <Form textButton={titleButton} mode={mode} />
                </Box>
            </Paper>
        </Grid>
    );
};

export default RegisterCard;

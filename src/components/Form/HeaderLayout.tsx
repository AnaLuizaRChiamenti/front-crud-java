import { Avatar, Button, Typography } from '@mui/material';
import React from 'react';

interface HeaderFormsProps {
    title: string;
    icon: React.ReactNode;
    colorIcon: string;
}

const HeaderForms: React.FC<HeaderFormsProps> = ({ title, icon, colorIcon }) => {
    return (
        <>
            <Avatar sx={{ bgcolor: colorIcon, width: '55px', height: '55px', marginBottom: '5px' }}>{icon}</Avatar>
            <Typography variant="h4">{title}</Typography>
        </>
    );
};

export default HeaderForms;

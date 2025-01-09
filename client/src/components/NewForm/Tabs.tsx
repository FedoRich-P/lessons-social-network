import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { AuthForm } from './AuthForm';

export const AuthTabs = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Tabs value={tabValue} onChange={handleChange} centered>
        <Tab label="Вход" />
        <Tab label="Регистрация" />
      </Tabs>
      {tabValue === 0 && <AuthForm type="login" />}
      {tabValue === 1 && <AuthForm type="register" />}
    </Box>
  );
};

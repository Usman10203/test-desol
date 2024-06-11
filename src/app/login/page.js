'use client';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { userLogin } from '../api/user';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState('Amjad@desolint.com');
    const [password, setPassword] = useState('123456abc');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email:', email, 'Password:', password);

        try {

            console.log(`email password`, email, password);
            const response = await userLogin(email, password)
            console.log(`response`, response);
            if (response?.data?.status == 200) {
                console.log(`response`, response.data?.user?._id);
                alert('Logged in successfully')
                setTimeout(() => {
                    router.push('/cars')
                }, 1500);
            } else if (response?.data?.status == 500) {
                alert(`${response?.data?.message}`);
            }
            else if (response?.data?.status == 404) {
                alert(`${response?.data?.message}`);
            }
            else {

            }

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Box sx={{ maxWidth: '600px', mx: 'auto', bgcolor: 'background.paper', p: 3 }}>
            <p style={{ textAlign: 'center', fontSize: '26px', fontWeight: 'bold' }}>Sign In</p>
            <form onSubmit={handleSubmit}>
                <FormControl margin="normal" fullWidth>
                    <FormLabel>Email</FormLabel>
                    <TextField variant="outlined" size="small" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <FormLabel>Password</FormLabel>
                    <TextField variant="outlined" size="small" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </FormControl>
                <Button variant="contained" type="submit" color="primary" sx={{ mt: 3 }} fullWidth>
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default Login

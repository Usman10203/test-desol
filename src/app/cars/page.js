'use client';
import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { saveCar } from '../api/car';

const Page = () => {

    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const cities = ['Lahore', 'Karachi'];
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCopy, setSelectedCopy] = useState(1);
    const [pictures, setPictures] = useState([]);
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };
    const options = [1, 2, 3, 4, 5, 6, 7, 8];
    const handleChange = (event) => {
        setSelectedCopy(event.target.value);
        setPictures([]);
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + pictures.length <= selectedCopy) {
            setPictures(prevPictures => [...prevPictures, ...files]);
        } else {
            alert(`You can only upload up to ${selectedCopy} pictures.`);
        }
    };

    console.log(`pic`, pictures);
    const handleSubmit = async (e) => {
        if (!selectedCity) {
            alert('Please select a city.');
            return;
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append('car_model', model);
        formData.append('price', price);
        formData.append('phone', phone);
        formData.append('city', selectedCity);

        pictures.forEach((picture, index) => {
            formData.append('pictures', picture);
        });

        try {
            const response = await saveCar(formData);
            console.log(`response`, response);
            if (response?.status == 201) {

                alert('Car Data Saved successfully')
                setModel("");
                setPrice("");
                setPhone("");
                setPictures([]);

            } else if (response?.response?.status == 500) {
                alert('Cant add car right now');
            }


        } catch (error) {
            alert('Error submitting');
            console.log(error)
        }
    };

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Car Selling</h1>
            <Box sx={{ maxWidth: '600px', mx: 'auto', bgcolor: 'background.paper', p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Car Model:</FormLabel>
                        <TextField variant="outlined" size="small" type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Price:</FormLabel>
                        <TextField variant="outlined" size="small" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Phone:</FormLabel>
                        <TextField variant="outlined" size="small" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </FormControl>

                    <FormLabel component="legend">City:</FormLabel>
                    <RadioGroup row value={selectedCity} onChange={handleCityChange}>
                        {cities.map((city) => (
                            <FormControlLabel key={city} value={city} control={<Radio />} label={city} />
                        ))}
                    </RadioGroup>

                    <FormControl margin="normal" fullWidth>
                        <FormLabel>No. of copies:</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCopy}
                            onChange={handleChange}
                        >
                            {options.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant="contained" component="label" >
                        Add Pictures
                        <input type="file" hidden multiple onChange={handleFileUpload} />
                    </Button>

                    <div style={{ display: 'flex', marginTop: '10px', flexWrap: 'wrap' }}>
                        {pictures.map((picture, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(picture)}
                                alt={`upload-${index}`}
                                style={{ width: '100px', height: '100px', margin: '5px', objectFit: 'cover' }}
                            />
                        ))}
                    </div>

                    <Button variant="contained" type="submit" color="primary" sx={{ mt: 3 }} fullWidth>
                        Add car
                    </Button>
                </form>
            </Box>
        </>
    )
}

export default Page

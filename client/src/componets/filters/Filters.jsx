import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UrlContext from "../../context/UrlContext";
import { Button, TextField, Autocomplete, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Filters({ setPosts }) {
    const { urlServer } = useContext(UrlContext)
    const [categoriesOptions, setCategoriesOptions] = useState(null)
    const [subjectName, setSubjectName] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null)
    const [subjectInput, setSubjectInput] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(`${urlServer}/category/get-all`);
                const newArr = [];
                result.data.forEach(cat => {
                    cat.subjects.forEach(subCat => {
                        newArr.push({ id: subCat.id, name: subCat.name, category: cat.name })
                    });
                });
                setCategoriesOptions(newArr);

            } catch (err) {
                console.log(err);
            }
        })();
    }, [urlServer]);



    const filter = async () => {
        try {
            const stempDay = date?.$d.getTime() || null
            const stempTime = ((time?.$H * 100) + time?.$m) || null
            const postsList = await axios.post(`${urlServer}/post/filter`, { subject: subjectName, date: stempDay, time: stempTime });
            if (!postsList) {
                throw new Error("posts not dound")
            }
            else {
                if (postsList.data !== [] && postsList.data !== null) {
                    setPosts(postsList.data)
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const clearFilter = () => {
        setSubjectName(null);
        setDate(null);
        setTime(null);
        setSubjectInput("");
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid      
                maxWidth={{ xs: '100%', sm: '80%', md: '65%' }}
                container
                columns={{ xs: 4, sm: 12, md: 12 }}
                spacing={1}>
                <Grid
                    item xs={12} sm={6} md={3}>
                    <Autocomplete
                        sx={{ display: 'inline-block', maxWidth: '262px', width: '100%' }}
                        options={categoriesOptions ? categoriesOptions.sort((a, b) => a.category.localeCompare(b.category)) : []}
                        getOptionLabel={(option) => option.name}
                        groupBy={(option) => option.category}
                        inputValue={subjectInput}
                        onChange={(event, newValue) => {
                            newValue && setSubjectName(newValue.name);
                        }}
                        onInputChange={(event, newInputValue) => {
                            setSubjectInput(newInputValue ? newInputValue : "");
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Category" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DatePicker
                        label="Date"
                        disablePast
                        value={date}
                        inputFormat="DD/MM/YYYY"
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TimePicker
                        label="Time"
                        value={time}
                        onChange={(newValue) => {
                            setTime(newValue);
                        }}
                        ampm={false}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <Button sx={{ mr: 1 }} variant="contained" onClick={filter}>Filter</Button>
                    <Button variant="outlined" onClick={clearFilter}>Clear</Button>
                </Grid>
            </Grid>
        </LocalizationProvider>
    )
}



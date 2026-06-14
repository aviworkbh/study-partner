import React, { useState } from "react";
import CreatePost from "../Post/CreatePost";
import CreatePostButton from "../Post/CreatePostButton";
import Posts from "../Post/Posts";
import { Box, Typography,  } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';


export default function Main() {

  const [openPost, setOpenPost] = useState(false);

  return (
    <Box>
      <Box mt={3} mb={3}>
        <Typography variant="h5">Study Partner</Typography>
        <Typography variant="body1">Find partner to study common interests topics</Typography>
      </Box>
      <Box>
        <Posts />
      </Box>
      <CreatePostButton setOpenPost={setOpenPost} />
      {openPost && <CreatePost open={openPost} setOpen={setOpenPost} />}
    </Box>
  );
}

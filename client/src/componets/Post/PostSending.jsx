import React from "react";
import {
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import OutboxOutlinedIcon from "@mui/icons-material/OutboxOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";

export default function PostSending({ emailSent, emailFailed, handleClose }) {
  return (
    <Box>
      {/* <Box>
        <DialogTitle>
          <IconButton
            onClick={() => {
              handleClose()
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      </Box> */}
      <DialogContent>
        {emailSent === 0 ?
          <Box sx={{ textAlign: 'center' }}>
            <Box>
              <Typography variant="h5">
                Sending email to your partner
              </Typography>
            </Box>
            <Box>
              <CircularProgress />
              {/* <OutboxOutlinedIcon color="primary" fontSize="large" /> */}
            </Box>
          </Box>
          : emailSent === -1 ?
            <Box sx={{textAlign: 'center'}}>
              <Box>
                <Typography variant="h5">
                  Sending email failed.. please try later 
                </Typography>
              </Box>
              <Box>
                <ErrorOutlinedIcon color="error" fontSize="large"/>
              </Box>
            </Box> :
            emailSent ==1 && (
              <Box sx={{ textAlign: 'center'}}>
                <Box>
                  <Typography variant="h5">
                  </Typography>
                    Email sent to the partner.  good luck..
                </Box>
                <Box>
                  <MarkEmailReadOutlinedIcon color="success" fontSize="large" />
                </Box>
              </Box>
            )}
      </DialogContent>
    </Box>
  );
}












// import React from "react";
// import {
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   Box,
//   IconButton,
// } from "@mui/material/";
// import CloseIcon from "@mui/icons-material/Close";
// import OutboxOutlinedIcon from "@mui/icons-material/OutboxOutlined";
// import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
// import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";

// export default function PostSending({ emailSent, emailFailed,handleClose }) {
//   return (
//     <Box>
//       <DialogTitle>
//             <IconButton
//               onClick={() => {
//                 handleClose()
//                 // setIsSendingEmail(false);
//               }}
//               sx={{
//                 position: "absolute",
//                 right: 8,
//                 top: 8,
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//       <DialogContent>
//       {!emailSent && !emailFailed && (
//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <Box>
//             <Typography variant="h5">
//               Sending email to your partner
//             </Typography>
//           </Box>
//           <Box>
//             <OutboxOutlinedIcon color="primary" fontSize="large" />
//           </Box>
//         </Box>
//       )}

//       {emailFailed && (
//         <Box>
//           <Box>
//             <Typography variant="h5">
//               Sending email failed please try later
//             </Typography>
//           </Box>
//           <Box>
//             <ErrorOutlinedIcon />
//           </Box>
//         </Box>
//       )}
//       {emailSent && (
//         // button onClick="window.location.reload();">Refresh Page</button>
//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <Box>
//             <Typography variant="h5">
//               Email sent to the partner good luck
//             </Typography>
//           </Box>
//           <Box>
//             <MarkEmailReadOutlinedIcon color="primary" fontSize="large" />
//           </Box>
//         </Box>
//       )}
//     </DialogContent>
//     </Box>
//   );
// }

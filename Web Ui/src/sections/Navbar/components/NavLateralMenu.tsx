import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { ReactElement,Dispatch,SetStateAction } from "react";
import LoginIcon from '@mui/icons-material/Login';
import { NavLink } from 'react-router-dom'; 
import CloseIcon from "@mui/icons-material/Close"; 


interface NavItem {
  title: string;
  path: string;
  icon: ReactElement;
}
interface NavLateralMenuProps {
  navArrayLinks: NavItem[];
  NavLink: React.ComponentType<any>; 
  setOpen: Dispatch<SetStateAction<boolean>>;

}

export default function NavLateralMenu({ navArrayLinks, NavLink, setOpen }: NavLateralMenuProps) {
  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ListItemIcon>
              <CloseIcon onClick={() => setOpen(false)} sx={{ cursor: "pointer" }} />
            </ListItemIcon>
          </Box>
          <Typography 
          sx={{ marginLeft: "14px" }}>
            TDDLab
          </Typography>
          
          {navArrayLinks.map((item) => (
            <ListItem
              disablePadding
              key={item.title}
            >
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
            
          ))}
           <ListItem
              disablePadding
            >
               <ListItemButton component={NavLink} to="/login" onClick={() => setOpen(false)}>
                <ListItemIcon><LoginIcon/></ListItemIcon>
                <ListItemText>Iniciar sesión</ListItemText>
              </ListItemButton>
            </ListItem>
        </List>
      </nav>
    </Box>
  );
}

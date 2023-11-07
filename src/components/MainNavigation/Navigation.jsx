import React, { useEffect } from "react";
import { Box, Button, Flex, IconButton, Text, useColorMode } from "@chakra-ui/react";

import { FaUserAlt, FaMoon, FaSun } from "react-icons/fa";
import TaskCategory from "./TaskCategory";
import { Outlet } from "react-router-dom";
import NotifyMe from "../TimeFocus/NotificationAlert";
import NotificationAlert from "./NotificationAlert";
import { timeFocusActions } from "../../redux-store/timeFocusSlice";
import { useDispatch } from "react-redux";
let first = true;
const Navigation = () => {
     const { colorMode, toggleColorMode } = useColorMode();
     const dispatch = useDispatch();
     useEffect(() => {
          if (first) {
               first = false;
               return;
          }
          const permission = NotifyMe();
          if (permission) {
               dispatch(timeFocusActions.browserPermissionAlert());
          }
     }, []);
     return (
          <>
               <NotificationAlert />
               <Box
                    as="header"
                    m="auto"
                    w="100vw"
                    // sx={{ boxShadow: " 15px 4px 10px #b1b9b3" }}
               >
                    <Flex   className="d-flex justify-content-between mt-2">
                         <Box className="ps-2">
                                     <Text>App</Text>
                         </Box>
                         <Box fontSize={["2xl", "3xl"]} fontWeight={["bold", "extrabold"]}  textAlign={"center"}
                         >
                              <Text className="text-center d-flex justify-content-center align-item-center" px="5">To-Do Application</Text>
                         </Box>
                         <Box>
                              <IconButton fontSize={["xl", "2xl"]}  bg="none" onClick={toggleColorMode} icon={colorMode === "dark" ? <FaSun /> : <FaMoon />} />
                         </Box>
                    </Flex>
                    <TaskCategory />
               </Box>
               <Outlet />
          </>
     );
};

export default Navigation;

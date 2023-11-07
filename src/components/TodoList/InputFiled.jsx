import { Box, Input, InputGroup, FormLabel, Textarea, FormControl, Center, Button, Flex, useColorMode, Checkbox, Select, Text, VStack, HStack } from "@chakra-ui/react";
import React, { useState } from 'react';
import { v4 as uuid } from "uuid";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { taskAction } from "../../redux-store/todoSlice";
import { Form } from "react-router-dom";

const InputFiled = () => {
     const [searchQuery, setSearchQuery] = useState('');
     const { colorMode, toggleColorMode } = useColorMode();
     const taskValue = useSelector((state) => state.todoReducer.taskValue);
     const taskDesc = useSelector((state) => state.todoReducer.taskDesc);
     const taskPriority = useSelector((state) => state.todoReducer.taskPriority);
     const addTodoListTask = useSelector((state) => state.todoReducer.addTodoListTask);
     const dispatch = useDispatch();

     const handleSearchChange = (event) => {
          setSearchQuery(event.target.value);
     };

     const taskHandler = () => {
          const id = uuid();
          const date = new Date().toDateString();
          dispatch(taskAction.addTask({ id: id, date: date }));
     };

     const timeAlertHandler = (e) => {
          dispatch(taskAction.addTimeAlert(e.target.value));
     };

     const taskPriorityHandler = (e) => {
          dispatch(taskAction.updateTaskPriority(e.target.value));
     };
     const taskValueHandler = (e) => {
          dispatch(taskAction.readTask(e.target.value));
          setSearchQuery(taskAction.readTask(e.target.value));
     };
     const taskDescHandler = (e) => {
          dispatch(taskAction.readDesc(e.target.value));
     };
     const openTodoListTaskHandler = () => {
          dispatch(taskAction.openTodoListTaskBox(false));
     };
     const closeAddTodoTaskHandler = () => {
          dispatch(taskAction.closeTodoListTaskBox());
     };
     return (
          <>
               <Box py="5" className="container" width="100vw">
                    <Center>
                         <Flex flexDir="column">
                              {addTodoListTask === false && (
                                   <Button variant="primary"  onClick={openTodoListTaskHandler}>
                                        ADD TODO LIST
                                   </Button>
                              )}
                              {addTodoListTask === true && (
                                   <Box bgGradient="linear(to-br, #E80A89, #F15B2A)" borderRadius="md" my={3}  className="container" width={[ "sm", "md", "lg", "xl"]}>
                                        <Box
                                             px="3"
                                             my="2"
                                             border="2px solid"
                                             bgGradient="linear(to-br, #E80A89, #F15B2A)"
                                             borderRadius="md"
                                             borderColor="transparent"
                                             bg={colorMode === "dark" ? "black" : "white"}
                                             className="container"
                                             overflowX="hidden"
                                             
                                        >
                                             <Box> 
                                             <FormControl my={2} className="container">
                                                        <FormLabel>Enter Task</FormLabel>
                                                     <Input
                                                           value={taskValue}
                                                            maxLength="35"
                                                            overflowX="hidden"
                                                            onChange={taskValueHandler}
                                                           type="text"
                                                          
                                                            placeholder="Add Your Task"
                                                        _placeholder={{
                                                                color: colorMode === "dark" ? "white" : "black",
                                                                 fontWeight: "semiBold",
                                                             }}
                                                            borderColor={colorMode === "dark" ? "white" : "black"}
                                                        />
                                                  </FormControl>
                                                  <FormControl my={2} className="container">
                                                      <FormLabel>Task Priority</FormLabel>
                                                        <Select value={taskPriority} borderColor={colorMode === "dark" ? "white" : "black"}  onChange={taskPriorityHandler}>
                                                            <option value="low">Low</option>
                                                             <option value="medium">Medium</option>
                                                            <option value="high">High</option>
                                                       </Select>
                                                 </FormControl>  
                                                  <FormControl my={2} className="container">
                                                       <FormLabel>Time Alert</FormLabel>
                                                       <Input onChange={timeAlertHandler}    type="time" borderColor={colorMode === "dark" ? "white" : "black"} />
                                                  </FormControl>
                                                  <HStack my={2}>
                                                       <Button variant="primary" w="50%" onClick={taskHandler}>
                                                            UPDATE
                                                        </Button>
                                                       <Button variant="primary" w="50%" onClick={closeAddTodoTaskHandler}>
                                                             CANCEL
                                                        </Button>
                                                   </HStack>
                                             </Box>
                                             </Box>
                                        </Box> 
                              )}
                         </Flex>
                    </Center>
               </Box>
               
          </>
     );
};

export default InputFiled;

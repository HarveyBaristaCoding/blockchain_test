pragma solidity ^0.5.0;

contract todolist {
    uint public count = 0;

    struct Task{
        uint id;
        string content;
        bool completed;
    }
    mapping (uint => Task) public tasks;

    constructor() public {
        createTask("hello world");
    }

    function createTask(string memory _content) public {
        count++;
        tasks[count]= Task(count, _content, false);
    }
}
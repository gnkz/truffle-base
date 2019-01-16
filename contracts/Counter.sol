pragma solidity 0.5.0;


contract Counter {
    uint256 public count;
    address public owner;

    constructor(uint256 initialCount) public {
        count = initialCount;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function increase() public onlyOwner returns(uint256) {
        assert(count + 1 > count);

        count += 1;

        return count;
    }

    function decrease() public onlyOwner returns(uint256) {
        assert(count - 1 < count);

        count -= 1;

        return count;
    }
}
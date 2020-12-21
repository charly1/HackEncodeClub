pragma solidity >=0.7.0 <0.8.0;

contract license {

    address admin;
    address proprio;
    
    constructor () {
        proprio = msg.sender;
        admin = msg.sender;
    }
    
    modifier onlyBy(address _account) {
        require(
            msg.sender == _account || msg.sender == admin,
            "Sender not authorized."
        );
        // Do not forget the "_;"! It will
        // be replaced by the actual function
        // body when the modifier is used.
        _;
    }
    
    function get_prorio() public view returns (address) {
        return proprio;
    }
    
    function set_proprio(address new_proprio) public onlyBy(proprio) {
        proprio = new_proprio;
    }
}
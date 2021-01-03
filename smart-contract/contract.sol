pragma solidity >=0.7.0 <0.8.0;

interface Util {
    
    modifier onlyBy(address by) {
        require(
            msg.sender == by,
            "Sender not authorized."
        );

        _;
    }
    
    modifier onlyBy2(address by, address by2) {
        require(
            msg.sender == by || msg.sender == by2,
            "Sender not authorized."
        );

        _;
    }
    
    modifier refuseTransaction() {
        require(
            false,
            "This contract do not accept incomming transaction."
        );

        _;
    }
    
    modifier validIndex(uint index, uint array_size) {
        require(
            index < array_size,
            "index is not valid."
        );

        _;
    }
}

contract License is Util {
    
    event adminChanged(address);
    event ownerChanged(address);
    event expirationTimestampChanged(uint);
    event licenseSetForSale(uint);
    event licenseRemovedFromSale();
    event licenseSold(uint, address, address); // price, oldOwner, newOwner
    //event deleted();

    address payable public admin; //administrator of the license, basically, who created it
    address payable public owner; //last owner of the license
    Software public software;
    uint public expiration_timestamp = 0; // 0 for no expiration date
    bool public license_for_sale = false;
    uint public selling_price = 0;
    
    modifier licenseIsForSale() {
        require(
            license_for_sale,
            "License is not for sale"
        );

        _;
    }
    
    modifier priceOk(uint price) {
        require(
                price >= selling_price,
                "Not enough ether to buy this license"
            );

        _;
    }
    
    constructor (address payable _admin, address payable _owner, uint _expiration_timestamp)
    {
        admin = _admin;
        owner = _owner;
        expiration_timestamp = _expiration_timestamp;
        license_for_sale = false;
        selling_price = 0;
        software = Software(msg.sender);
    }
    
    /*function destroy()
        public
        onlyBy(admin)
    {
        emit deleted();
        selfdestruct(admin);
    }*/
    
    // whenever you send a payement to this contract, it automatically goes here
    receive() 
        external
        payable
        licenseIsForSale()
        priceOk(msg.value)
    {
        emit licenseSold(msg.value, owner, msg.sender);
        software.licenseHasChangedOwner(owner, msg.sender);
        
        owner.transfer(msg.value);
        owner = msg.sender;
        emit ownerChanged(owner);
        
        remove_for_sale();
    }
    
    function set_for_sale(uint _selling_price) 
        public
        onlyBy(owner)
    {
        license_for_sale = true;
        selling_price = _selling_price;
        emit licenseSetForSale(_selling_price);
    }
    
    function remove_for_sale()
        public
        onlyBy(owner)
    {
        license_for_sale = false;
        selling_price = 0;
        emit licenseRemovedFromSale();
    }
    
    function set_owner(address payable new_owner)
        public
        onlyBy2(owner, admin)
    {
        software.licenseHasChangedOwner(owner, new_owner);
        owner = new_owner;
        emit ownerChanged(owner);
    }
    
    function set_admin(address payable new_admin)
        public
        onlyBy(admin)
    {
        admin = new_admin;
        emit adminChanged(admin);
    }
    
    function set_expiration_timestamp(uint new_timestamp)
        public
        onlyBy(admin)
    {
        expiration_timestamp = new_timestamp;
        emit expirationTimestampChanged(expiration_timestamp);
    }
    
    function remove_expiration_timestamp()
        public
        onlyBy(admin)
    {
        set_expiration_timestamp(0);
    }
}

contract Software is Util {
    
    event adminChanged(address);
    event companyNameChanged(string);
    event licenseAdded(address);
    //event deleted();
    //event lisenceCouldNotBeDeleted(address);
    
    string public company_name;
    address payable public admin;
    License[] public licenses;
    mapping (address => License) public ownerLicense;
    
    modifier ownerLicenseMatch(address owner, License license) {
        require (
            ownerLicense[owner] == license,
            "Invalid License or owner."
        );
        
        _;
    }
    
    constructor (string memory company, address payable _admin)
    {
        company_name = company;
        admin = _admin;
    }
    
    /*function destroy()
        public
        onlyBy(admin)
    {
        for (uint i=0 ; i < licenses.length ; i++) {
            // if the admin of the license has changed, it won't be able to be deleted.
            try licenses[i].destroy() {
                // successfully deleted
            }
            catch (bytes memory error) {
                // unsuccessfully deleted
                emit lisenceCouldNotBeDeleted(address(licenses[i]));
            }
        }
        
        emit deleted();
        selfdestruct(admin);
    }*/
    
    receive()
        external
        payable
        refuseTransaction
    {}
    
    function licenseHasChangedOwner(address oldOwner, address newOwner) 
        public
        ownerLicenseMatch(oldOwner, License(msg.sender))
    {
        delete ownerLicense[oldOwner];
        ownerLicense[newOwner] = License(msg.sender);
    }
    
    function check_license(address adr)
        public
        view
        returns (bool)
    {
        return ownerLicense[adr] != License(0) && ownerLicense[adr].owner() == adr;
    }
    
    function set_admin(address payable _admin)
        public
        onlyBy(admin) 
    {
        admin = _admin;
        emit adminChanged(admin);
    }
    
    function set_company_name(string calldata _company_name)
        public
        onlyBy(admin)
    {
        company_name = _company_name;
        emit companyNameChanged(company_name);
    }
    
    function add_license() // default value: admin:admin, owner:admin, expiration: 0
        public
        onlyBy(admin) 
        returns (License)
    {
        return add_license(admin, payable(admin), 0);
    }
    
    function add_license(address payable _owner)  // default value: admin:admin, owner:owner, expiration: 0
        public
        onlyBy(admin) 
        returns (License)
    {
        return add_license(admin, _owner, 0);
    }
    
    function add_license(uint _expiration_timestamp)  // default value: admin:admin, owner:admin, expiration: exp
        public
        onlyBy(admin) 
        returns (License)
    {
        return add_license(admin, payable(admin), _expiration_timestamp);
    }
    
    function add_license(address payable _owner, uint _expiration_timestamp) // default value: admin:admin, owner:owner, expiration: exp
        public
        onlyBy(admin) 
        returns (License)
    {
        return add_license(admin, _owner, _expiration_timestamp);
    }
    
    function add_license(address payable _admin, address payable _owner, uint _expiration_timestamp)
        public
        onlyBy(admin) 
        returns (License)
    {
        License newLicense = new License(_admin, _owner, _expiration_timestamp);
        licenses.push(newLicense);
        
        ownerLicense[_owner] = newLicense;
        emit licenseAdded(address(newLicense));
        
        return newLicense;
    }
    
    function get_nb_license()
        public
        view
        returns (uint) 
    {
        return licenses.length;
    }
    
    function get_licenses_with_admin(address _admin)
        public 
        view
        returns (License[] memory)
    {
        uint counter = 0;
        for (uint i = 0 ; i < licenses.length ; i++) {
            if (licenses[i].admin() == _admin) {
                counter++;
            }
        }
        
        
        License[] memory ret = new License[](counter);
        uint j = 0;
        for (uint i = 0; i < licenses.length ; i++) {
            if (licenses[i].admin() == _admin) {
                ret[j] = licenses[i];
                j++;
            }
        }
        
        return ret;
    }
    
    function get_licenses_with_owner(address _owner)
        public 
        view
        returns (License[] memory)
    {
        uint counter = 0;
        for (uint i = 0 ; i < licenses.length ; i++) {
            if (licenses[i].owner() == _owner) {
                counter++;
            }
        }
        
        
        License[] memory ret = new License[](counter);
        uint j = 0;
        for (uint i = 0; i < licenses.length ; i++) {
            if (licenses[i].owner() == _owner) {
                ret[j] = licenses[i];
                j++;
            }
        }
        
        return ret;
    }
}

contract SoftwareHandler is Util
{
    event softwareAdded(address);

    Software[] public softwares;
    
    receive()
        external
        payable
        refuseTransaction
    {}
    
    function addSoftware(string calldata company_name) 
        public 
        returns (Software) 
    {
        return addSoftware(company_name, msg.sender);
    }
    
    function addSoftware(string calldata company_name, address payable software_admin) 
        public
        returns (Software)
    {
        Software newSoftware = new Software(company_name, software_admin);
        softwares.push(newSoftware);

        emit softwareAdded(address(newSoftware));
        
        return newSoftware;
    }
    
    function getNbOfSoftware() 
        public 
        view 
        returns (uint) 
    {
        return softwares.length;
    }
    
    function get_softwares_with_admin(address _admin)
        public 
        view
        returns (Software[] memory)
    {
        uint counter = 0;
        for (uint i = 0 ; i < softwares.length ; i++) {
            if (softwares[i].admin() == _admin) {
                counter++;
            }
        }
        
        
        Software[] memory ret = new Software[](counter);
        uint j = 0;
        for (uint i = 0; i < softwares.length ; i++) {
            if (softwares[i].admin() == _admin) {
                ret[j] = softwares[i];
                j++;
            }
        }
        
        return ret;
    }
    
    /*function removeSoftware(uint index) 
        public
        validIndex(index, softwares.length)
        //onlyBy(softwares[index].admin())
    {
        Software toRemove = softwares[index];
        softwares[index] = softwares[softwares.length-1];
        
        toRemove.destroy();
        softwares.pop();
    }

    function removeSoftware(address softwareAddress) 
        public
    {
        // using an additionnal mapping data structure 
    }*/
}
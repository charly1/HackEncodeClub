pragma solidity >=0.7.0 <0.8.0;

interface Util {
    modifier indexIsFine(uint index, uint array_size) {
        require(
            index < array_size,
            "Index greater than the array length."
        );

        _;
    }
    
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
}

contract License is Util {

    address admin; //administrator of the license, basically, who created it
    address payable owner; //last owner of the license
    uint expiration_timestamp = 0; // 0 for no expiration date
    bool license_for_sale = false;
    uint minimum_price_for_sell = 0;
    
    modifier licenseIsForSale() {
        require(
            license_for_sale,
            "License is not for sale"
        );

        _;
    }
    
    modifier priceOk(uint price) {
        require(
                price >= minimum_price_for_sell,
                "Not enough ether to buy this license"
            );

        _;
    }
    
    constructor (address _admin, address payable _owner, uint _expiration_timestamp)
    {
        admin = _admin;
        owner = _owner;
        expiration_timestamp = _expiration_timestamp;
        license_for_sale = false;
        minimum_price_for_sell = 0;
    }
    
    // whenever you send a payement to this contract, it automatically goes here
    receive() 
        external
        payable
        licenseIsForSale()
        priceOk(msg.value)
    {
        owner.transfer(msg.value);
        owner = msg.sender;
        remove_for_sale();
        
    }
    
    function get_is_for_sell()
        public
        view
        returns (bool)
    {
        return license_for_sale;
    }
    
    function get_selling_price()
        public
        view
        licenseIsForSale()
        returns (uint)
    {
        return minimum_price_for_sell;
    }
    
    function set_for_sale(uint _minimum_price_for_sell) 
        public
        onlyBy(owner)
    {
        license_for_sale = true;
        minimum_price_for_sell = _minimum_price_for_sell;
    }
    
    function remove_for_sale()
        public
        onlyBy(owner)
    {
        license_for_sale = false;
        minimum_price_for_sell = 0;
    }
    
    function get_owner()
        public
        view
        returns (address)
    {
        return owner;
    }
    
    function set_owner(address payable new_owner)
        public
        onlyBy2(owner, admin)
    {
        owner = new_owner;
    }
    
    function get_admin()
        public
        view
        returns (address)
    {
        return admin;
    }
    
    function set_admin(address new_admin)
        public
        onlyBy(admin)
    {
        admin = new_admin;
    }
    
    function get_expiration_timestamp()
        public
        view
        returns (uint)
    {
        return expiration_timestamp;
    }
    
    function set_expiration_timestamp(uint new_timestamp)
        public
        onlyBy(admin)
    {
        expiration_timestamp = new_timestamp;
    }
    
    function remove_expiration_timestamp()
        public
        onlyBy(admin)
    {
        set_expiration_timestamp(0);
    }
}

contract Software is Util {
    
    string company_name;
    address admin;
    License[] licenses;
    
    constructor (string memory company, address _admin)
    {
        company_name = company;
        admin = _admin;
    }
    
    function get_admin()
        public
        view
        returns (address) 
    {
        return admin;
    }
    
    function set_admin(address _admin)
        public
        onlyBy(admin) 
    {
        admin = _admin;
    }
    
    function get_company_name()
        public
        view
        returns (string memory)
    {
        return company_name;
    }
    
    function set_company_name(string calldata _company_name)
        public
        onlyBy(admin)
    {
        company_name = _company_name;
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
    
    function add_license(address _admin, address payable _owner, uint _expiration_timestamp)
        public
        onlyBy(admin) 
        returns (License)
    {
        License newLicense = new License(_admin, _owner, _expiration_timestamp);
        licenses.push(newLicense);
        
        return newLicense;
    }
    
    function get_license(uint index)
        public
        view
        indexIsFine(index, licenses.length) 
        returns (License)
    {
        return licenses[index];
    }
    
    function get_nb_license()
        public
        view
        returns (uint) 
    {
        return licenses.length;
    }
}

contract SoftwareHandler is Util
{
    Software[] softwares;
    
    function addSoftware(string calldata company_name) 
        public 
        returns (Software) 
    {
        return addSoftware(company_name, msg.sender);
    }
    
    function addSoftware(string calldata company_name, address software_admin) 
        public
        returns (Software)
    {
        Software newSoftware = new Software(company_name, software_admin);
        softwares.push(newSoftware);
        
        return newSoftware;
    }
    
    function getSoftware(uint index) 
        public 
        view 
        indexIsFine(index, softwares.length) 
        returns (Software) 
    {
        return softwares[index];
    }
    
    function getNbOfSoftware() 
        public 
        view 
        returns (uint) 
    {
        return softwares.length;
    }
}
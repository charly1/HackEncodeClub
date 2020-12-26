
# Smart contract complete structure:

Compiled using version 0.7.6
Smart contract on ropsten: 

SoftwareHandle:  0x4bAD5F2CA59ceF307c31aE0B70Ec3E9e3349f76b  
https://ropsten.etherscan.io/address/0x4bAD5F2CA59ceF307c31aE0B70Ec3E9e3349f76b

Software (index 0 of previous SoftwareHandle):  0x4D3040C16dDeCfA0c30f760dd28127A0DDBF4cdA  
https://ropsten.etherscan.io/address/0x4D3040C16dDeCfA0c30f760dd28127A0DDBF4cdA

License (index 0 of previous Software):  0xA7f1667576Dd201d4d8C2DD52b6aA4F5D6eCD62A  
https://ropsten.etherscan.io/address/0xA7f1667576Dd201d4d8C2DD52b6aA4F5D6eCD62A

## SoftwareHandler contract:

### Description:
Root Smart-Contract, on which everything is based. This contract holds a list of Software and is able to generate more of them.
Nothing is restricted for anybody in this contract, everybody can create a new Software contract using this contract.

### Functions:
- `addSoftware(string company_name)`

creates a new Software Smart-Contract. This Software will automatically have, as an admin, the sender of this function.
The company_name parameter is here to fill the company_name field of Software.

- `addSoftware(string company_name, address software_admin)`

Same as before but here the admin can be specified to a different address.
Be careful with the admin address, if not specify correctly, you may completely loose access to the software.

- `softwares(uint index)`

Access to the array of Software. Returns the address of the Software smart-contracts

- `getNbOfSoftware()`

Returns the Number of Software in the array.

- `removeSoftware(uint index)`

not implemented yet

- `removeSoftware(address softwareAddress)`

not implemented yet

### Events:
- `softwareAdded(address)`

when a new software is added using the softwareHandle structure. The address is the address of the new Software.

## Software contract:

### Description:
The Software smart-contract, represent a Software, or a Software version. 
It holds an address "admin" which allow any modifications, and should represent a company. A company name is also specified.
A Software contract hold a list of license.

### Functions:

- `admin()`

Return the current admin address.

- `set_admin(address _admin)`

Change the admin address. 
Restricted to the current admin.

- `company_name()`

Return the company name.

- `set_company_name(string new_company_name)`

Change the company name.
Restricted to the current admin.

- `add_license()`

Add a license with the Software admin as the license admin, the Software admin as the license owner, no expiration date.
Restricted to the current admin.

- `add_license(address _owner) `

Add a license with the Software admin as the license admin, `_owner` as the license owner, no expiration date.
Restricted to the current admin.

- `add_license(uint _expiration_timestamp)`

Add a license with the Software admin as the license admin, the Software admin as the license owner, `_expiration_timestamp` as expiration date (unix timestamp).
Restricted to the current admin.

- `add_license(address _owner, uint _expiration_timestamp)`

Add a license with the Software admin as the license admin, `_owner` as the license owner, `_expiration_timestamp` as expiration date (unix timestamp).
Restricted to the current admin.

- `add_license(address _admin, address _owner, uint _expiration_timestamp)`

Add a license with `_admin` as the license admin, `_owner` as the license owner, `_expiration_timestamp` as expiration date (unix timestamp).
Restricted to the current admin.
Be careful with the license admin, if you loose control of this address you might loose complete control of the license (typically keep the same admin for the Software and the License).

- `licenses(uint index)`

Access to the array of License. Returns the address of the Licenses smart-contracts for the specified index.

- `get_nb_license()`

Returns the Number of License registered for the current Software.

- `remove_license(uint index)`

not implemented yet

- `remove_license(address softwareAddress)`

not implemented yet

### Events:

- `adminChanged(address)`

called when a new admin is set. The address is the address of the new admin.

- `companyNameChanged(string)`

called when a new company name is set. The string is the company name.

- `licenseAdded(address)`

called when a license is created. The address is the new license address


## License contract:

### Description:

The License smart-contract, represente one license for one user. It holds an address "admin" which represente the company. It also holds an "owner" address which represent the owner of the license, basically the guy who can use the license on his computer. It is let to local client and local applications to verifiy the license using this smart-contract.
There is also an expiration date (that can be set to 0 for no expiration date of the license) and a price for selling purpose. 
The owner can put up for sale the license for a price he decided for, and if the license is for sale, anybody who send enough ETH to the smart contract will automatically become the new proprietary of the license, and the old-owner will receive the ETH.

### Functions:

 - `license_for_sale()`

Return true or false if the license is for sale.
 
 - `selling_price()`

 Return the selling price, in wei, if the license is for sell. If it isn't return the error "License is not for sale".
 
 - `set_for_sale(uint _minimum_price_for_sell)`

 Put for sale a license, and set a selling price (license can now be bought by anybody).
 Restricted to the owner only (not the admin).
 
 - `remove_for_sale()`

 Remove the for sale status (license can't be bought anymore now)
 Restricted to the owner only (not the admin).
 
 - `owner()`

Return the current owner address.
 
 - `set_owner(address payable new_owner)`

Change the owner. Can be used to give for free a license (by the owner) or deactivate a license (by the admin).
Restricted to the current owner or the admin.
 
 - `admin()`

Return the current admin address.
 
 - `set_admin(address new_admin)`

Change the admin.
Restricted to the admin only.
 
 - `expiration_timestamp()`

Return the expiration date as a unix timestamp. (0 represent no expiration date).
 
 - `set_expiration_timestamp(uint new_timestamp)`

Change the expiration date.
Restricted to the admin only.
 
 - `remove_expiration_timestamp()`

 Remove the expiration date (basically to the same than `set_expiration_timestamp(0)`).
 Restricted to the admin only.

### Events:

- `adminChanged(address)`

called when a new admin is set. The address is the addess of the new admin.

- `ownerChanged(address)`

called when a new owner is set. The address is the addess of the new owner.

- `expirationTimestampChanged(uint)`

called when the expiration date is changed. The number is the new expiration timestamp (unix).

- `licenseSetForSale(uint)`

called when the license is set for sale or the price is changed. The number is the price of the license.

- `licenseRemovedFromSale()`

called when the license is removed from sale (not anymore for sale then).

- `licenseSold(uint, address, address)`

called when the license was sold using a transaction exchange. An event of type ownerChanged(...) should also be emit. The number is the price for which the license was sold, the first address is the old owner (who received the monney) and the second address is the new owner (who paid).

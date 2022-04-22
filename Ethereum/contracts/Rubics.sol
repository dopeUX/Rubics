// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

pragma experimental ABIEncoderV2;
import "node_modules/@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipient.sol";
import "node_modules/@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipientSignature.sol";

contract Factory {
    address[] public sellers;

    function createSeller(
        //address sellerAddress,
        string memory sellerName,
        string memory sellerPhone,
        string memory sellerBuisnessName
    ) public payable {
        require(msg.value == 300000000000000000);
        address newSeller = address(
            (new Seller).value(msg.value)(
                sellerName,
                msg.sender,
                //  sellerAddress,
                sellerPhone,
                sellerBuisnessName
            )
        );
        sellers.push(newSeller);
    }

    function getSellers() public view returns (address[] memory) {
        return sellers;
    }

    // function recieve() public payable {
    //     // this function enables the contract to receive funds
    // }

    // constructor() public payable {
    //     require(msg.value==11);
    // }
}

contract Seller is GSNRecipientUpgradeSafe {
    struct OrderDetails {
        string productName;
        uint256 quantity;
    }

    struct OrdersAdmin {
        address customerAddress;
        string homeAddress;
        string customerPhone;
        string customerName;
        uint256 cartTotal;
        bool isCompleted;
        //OrderDetails[] orderDetails;
        mapping(uint256 => OrderDetails) orderDetails;
    }
    uint256 private x; //0 => create Order, 1 => finalize Order
    // address public seller_contract_address;
    address public seller_address;
    string public seller_name;
    string public seller_phone;
    string public seller_buisnessName;
    uint256 public index;
    //   OrdersAdmin[] public ordersAdmin;
    mapping(address => OrdersAdmin) public ordersAdmin;

    constructor(
        string memory sellerName,
        //  address sellerContractAddress,
        address sellerAddress,
        string memory sellerPhone,
        string memory sellerBuisnessName
    ) public payable {
        //  require(msg.value==1);
        seller_name = sellerName;
        //   seller_contract_address = sellerContractAddress;
        seller_address = sellerAddress;
        seller_phone = sellerPhone;
        seller_buisnessName = sellerBuisnessName;
    }

    function createOrder(
        string memory phone,
        string memory homeAddress,
        string memory name,
        uint256 total,
        OrderDetails[] memory orders
    ) public payable {
        require(msg.value == total);
        x = 0;
        OrdersAdmin storage newOrder = ordersAdmin[msg.sender];
        newOrder.customerAddress = msg.sender;
        newOrder.homeAddress = homeAddress;
        newOrder.customerPhone = phone;
        newOrder.customerName = name;
        newOrder.cartTotal = total;
        newOrder.isCompleted = false;

        // OrdersAdmin storage newOrder = OrdersAdmin({
        //     customerAddress: msg.sender,
        //     homeAddress: homeAddress,
        //     customerPhone: phone,
        //     customerName: name,
        //     cartTotal: total,
        //     isCompleted: false
        // });

        // ordersAdmin[msg.sender] = newOrder;
        OrdersAdmin storage o = ordersAdmin[msg.sender];
        index = orders.length;

        for (uint256 i = 0; i < orders.length; i++) {
            o.orderDetails[i] = orders[i];
        }

        // ordersAdmin.push(newOrder);
    }

    function getOrdersForAdmin() public view returns (uint256) {
        return index;
    }

    function finalizeOrder() public {
        x = 1;
        OrdersAdmin storage currentOrder = ordersAdmin[msg.sender];
        require(!currentOrder.isCompleted);
        payable(seller_address).transfer(currentOrder.cartTotal);
        currentOrder.isCompleted = true;
    }

    function createProduct(
        string memory productName,
        uint256 productPrice,
        string memory productCategory,
        string memory productImage
    ) public {
        ShopProducts shopProducts = ShopProducts(
            0x117623A2EBB93359967c83dE51360b09CdCb0E03
        );
        shopProducts.createProductItem(
            address(this),
            productName,
            productPrice,
            productCategory,
            productImage
        );
    }

    //OpenZeppelin ------------

    function acceptRelayedCall(
        address relay,
        address from,
        bytes calldata encodedFunction,
        uint256 transactionFee,
        uint256 gasPrice,
        uint256 gasLimit,
        uint256 nonce,
        bytes calldata approvalData,
        uint256 maxPossibleCharge
    ) external view override returns (uint256, bytes memory) {
        if (x == 0) {
            return _approveRelayedCall();
        } else {
            return
                _rejectRelayedCall(
                    uint256(
                        GSNRecipientSignatureUpgradeSafe
                            .GSNRecipientSignatureErrorCodes
                            .INVALID_SIGNER
                    )
                );
        }
    }

    // We won't do any pre or post processing, so leave _preRelayedCall and _postRelayedCall empty
    function _preRelayedCall(bytes memory context)
        internal
        override
        returns (bytes32)
    {
        if (x == 0) {
            ///pay fees ------
        } else {
            // dont pay fees -----
        }
    }

    function _postRelayedCall(
        bytes memory context,
        bool,
        uint256 actualCharge,
        bytes32
    ) internal override {}
}

contract ShopProducts {
    struct ProductItem {
        string productName;
        uint256 productPrice;
        string productCategory;
        string productImage;
        address sellerAddress;
        bool inStock;
    }

    //   mapping(uint=>ProductItem) products;
    //   uint index;
    ProductItem[] public products;

    function createProductItem(
        address sellerContractAddress,
        string calldata productName,
        uint256 productPrice,
        string calldata productCategory,
        string calldata productImage
    ) external {
        ProductItem storage newProduct = products.push();
        newProduct.productName = productName;
        newProduct.productPrice = productPrice;
        newProduct.productCategory = productCategory;
        newProduct.productImage = productImage;
        newProduct.sellerAddress = sellerContractAddress;
        newProduct.inStock = true;
        // products[index] = ProductItem(productName, productPrice, productCategory, productImage, sellerAddress, true);
        // index++;
    }

    function getProductsCount() public view returns (uint256) {
        return products.length;
    }
}

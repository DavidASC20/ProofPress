// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NewsStaking{
    IERC20 public pressToken;
    
    uint256 public articleStakeAmount;
    uint256 public verificationStakeAmount;
    uint256 public disputeStakeAmount;

    struct Content {
        address submitter;
        bytes32 contentHash;
        uint256 stake;
        bool resolved;
        uint256 referenceId; // New field to track the related article or verification
    }

    mapping(uint256 => Content) public articles;
    mapping(uint256 => Content) public verifications;
    mapping(uint256 => Content) public disputes;

    uint256 private _nextArticleId;
    uint256 private _nextVerificationId;
    uint256 private _nextDisputeId;

    // Events
    event ArticleSubmitted(uint256 indexed articleId, address indexed submitter, bytes32 contentHash);
    event VerificationSubmitted(uint256 indexed verificationId, address indexed verifier, bytes32 contentHash, uint256 articleId);
    event DisputeSubmitted(uint256 indexed disputeId, address indexed disputant, bytes32 contentHash, uint256 verificationId);

    // Constructor
    constructor(address _tokenAddress, uint256 _articleStake, uint256 _verificationStake, uint256 _disputeStake) {
        pressToken = IERC20(_tokenAddress);
        articleStakeAmount = _articleStake;
        verificationStakeAmount = _verificationStake;
        disputeStakeAmount = _disputeStake;
    }

    // Function to stake and submit an article
    function submitArticle(bytes32 contentHash) external {
        require(pressToken.transferFrom(msg.sender, address(this), articleStakeAmount), "Stake transfer failed");
        
        uint256 articleId = _nextArticleId++;
        articles[articleId] = Content(msg.sender, contentHash, articleStakeAmount, false, articleId);
        
        emit ArticleSubmitted(articleId, msg.sender, contentHash);
    }

   function submitVerification(uint256 articleId, bytes32 contentHash) external {
        require(pressToken.transferFrom(msg.sender, address(this), verificationStakeAmount), "Stake transfer failed");
        
        // Check if the article exists
        require(articleId < _nextArticleId, "Article does not exist");

        uint256 verificationId = _nextVerificationId++;
        verifications[verificationId] = Content({
            submitter: msg.sender,
            contentHash: contentHash,
            stake: verificationStakeAmount,
            resolved: false,
            referenceId: articleId // Linking verification to article
        });
        
        emit VerificationSubmitted(verificationId, msg.sender, contentHash, articleId);
    }

    function submitDispute(uint256 verificationId, bytes32 contentHash) external {
        require(pressToken.transferFrom(msg.sender, address(this), disputeStakeAmount), "Stake transfer failed");

        // Check if the verification exists
        require(verificationId < _nextVerificationId, "Verification does not exist");

        uint256 disputeId = _nextDisputeId++;
        disputes[disputeId] = Content({
            submitter: msg.sender,
            contentHash: contentHash,
            stake: disputeStakeAmount,
            resolved: false,
            referenceId: verificationId // Linking dispute to verification
        });
        
        emit DisputeSubmitted(disputeId, msg.sender, contentHash, verificationId);
    }

    // Additional functions to resolve articles, verifications, disputes, and to distribute rewards or penalties
}

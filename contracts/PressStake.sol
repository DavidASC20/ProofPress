// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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
    address private owner;

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
        owner = msg.sender;
    }

    // Function to stake and submit an article
    function submitArticle(bytes32 contentHash) external {
        require(pressToken.transferFrom(msg.sender, address(this), articleStakeAmount), "Stake transfer failed");
        
        uint256 articleId = _nextArticleId++;
        articles[articleId] = Content(msg.sender, contentHash, articleStakeAmount, false,articleId);
        
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

     // A mapping to keep track of the claimable amount for each address
    mapping(address => uint256) private claimableTokens;

    // Function to set tokens as claimable for a user
    function setClaimable(address user, uint256 amount) internal {
        // Set the amount that can be claimed by the user
        claimableTokens[user] = amount;

        // Emit an event for transparency
        emit TokensClaimable(user, amount);
    }

    // Users call this function to claim their tokens
    function claimTokens() external {
        uint256 amount = claimableTokens[msg.sender];
        require(amount > 0, "No tokens to claim");

        // Before transferring, set the claimable amount to 0 to prevent re-entrancy attacks
        claimableTokens[msg.sender] = 0;

        require(pressToken.transfer(msg.sender, amount), "Token transfer failed");

        // Emit an event that tokens have been claimed
        emit TokensClaimed(msg.sender, amount);
    }

    // Event to announce tokens are claimable
    event TokensClaimable(address indexed user, uint256 amount);

    // Event to announce tokens have been claimed
    event TokensClaimed(address indexed user, uint256 amount);

    // Function to resolve a dispute and apply penalties or rewards
    function resolveDispute(uint256 disputeId, bool isValid) external {
        // Require that the caller is the owner
        require(msg.sender == owner, "Unauthorized");

        // Ensure the dispute exists and is not already resolved
        Content storage dispute = disputes[disputeId];
        require(dispute.stake > 0, "Dispute does not exist");
        require(dispute.resolved != true, "Dispute already resolved");

        if (isValid) {
            setClaimable(dispute.submitter, dispute.stake);
        } else {
            // Logic to confiscate the stake
            // You could transfer the stake to the contract owner, a rewards pool, or burn it
        }

        // Update the dispute state to resolved
        dispute.resolved = true;

        // Emit an event to record the resolution
        emit DisputeResolved(disputeId, isValid);
    }
    // Event for dispute resolution
    event DisputeResolved(uint256 indexed disputeId, bool isValid);

       // Function to resolve a dispute and apply penalties or rewards
    function resolveVerification(uint256 verificationId, bool isValid) external {
        // Require that the caller is the owner
        require(msg.sender == owner, "Unauthorized");

        // Ensure the dispute exists and is not already resolved
        Content storage verification = verifications[verificationId];
        require(verification.stake > 0, "Dispute does not exist");
        require(verification.resolved != true, "Dispute already resolved");

        if (isValid) {
            setClaimable(verification.submitter, verification.stake);
        } else {
            // Logic to confiscate the stake
            // You could transfer the stake to the contract owner, a rewards pool, or burn it
        }

        // Update the dispute state to resolved
        verification.resolved = true;

        // Emit an event to record the resolution
        emit VerificationResolved(verificationId, isValid);
    }
    // Event for dispute resolution
    event VerificationResolved(uint256 indexed verificationId, bool isValid);

    // Function to withdraw the stake for an article
    function withdrawArticleStake(uint256 articleId) external {
        Content storage article = articles[articleId];

        // Ensure that the caller is the submitter of the article
        require(msg.sender == article.submitter, "Only the submitter can withdraw the stake");

        // Check that the article is not in a locked state
        require(article.resolved != false, "Stake is currently locked");

        // Ensure that the stake is greater than 0
        uint256 stakeAmount = article.stake;
        require(stakeAmount > 0, "No stake to withdraw");

        // Update the article's stake to 0 before transferring to prevent re-entrancy attacks
        article.stake = 0;

        // Transfer the stake back to the submitter
        require(pressToken.transfer(msg.sender, stakeAmount), "Stake transfer failed");

        // Emit an event for the withdrawal
        emit ArticleStakeWithdrawn(articleId, msg.sender, stakeAmount);
    }

    // Event for withdrawing article stake
    event ArticleStakeWithdrawn(uint256 indexed articleId, address indexed submitter, uint256 amount);

}

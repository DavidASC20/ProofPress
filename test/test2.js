const { expectRevert } = require('@openzeppelin/test-helpers');
const NewsStaking = artifacts.require('NewsStaking');
const PressToken = artifacts.require('PressToken');

contract('NewsStaking', function ([deployer, author, verifier, disputant, otherAccount]) {
  const articleStakeAmount = web3.utils.toWei('1', 'ether');
  const verificationStakeAmount = web3.utils.toWei('0.5', 'ether');
  const disputeStakeAmount = web3.utils.toWei('0.2', 'ether');
  const initialSupply = web3.utils.toWei('100', 'ether');
  
  let pressToken;
  let newsStaking;

  beforeEach(async function () {
    pressToken = await PressToken.new(initialSupply, { from: deployer });
    newsStaking = await NewsStaking.new(pressToken.address, articleStakeAmount, verificationStakeAmount, disputeStakeAmount, { from: deployer });

    await pressToken.transfer(author, articleStakeAmount, { from: deployer });
    await pressToken.transfer(verifier, verificationStakeAmount, { from: deployer });
    await pressToken.transfer(disputant, disputeStakeAmount, { from: deployer });

    await pressToken.approve(newsStaking.address, articleStakeAmount, { from: author });
    await pressToken.approve(newsStaking.address, verificationStakeAmount, { from: verifier });
    await pressToken.approve(newsStaking.address, disputeStakeAmount, { from: disputant });
  });

  it('allows a user to stake tokens and submit an article', async function () {
    const contentHash = web3.utils.sha3('Article Content');
    await newsStaking.submitArticle(contentHash, { from: author });

    // Retrieve the article details from the contract and verify
    const article = await newsStaking.articles(0);
    assert.equal(article.submitter, author, 'The submitter address is incorrect');
    assert.equal(article.contentHash, contentHash, 'The content hash is incorrect');
    assert.equal(article.stake.toString(), articleStakeAmount, 'The staked amount is incorrect');
  });

  it('allows a user to stake tokens for verifying an article', async function () {
    const contentHash = web3.utils.sha3('Verification Content');
    const articleId = 0; // assuming the first article has ID 0

    // Author has to submit an article first
    await newsStaking.submitArticle(web3.utils.sha3('Article Content'), { from: author });
    
    // Verifier stakes and submits a verification
    await newsStaking.submitVerification(articleId, contentHash, { from: verifier });

    // Retrieve the verification details from the contract and verify
    const verification = await newsStaking.verifications(0);
    assert.equal(verification.submitter, verifier, 'The verifier address is incorrect');
    assert.equal(verification.contentHash, contentHash, 'The content hash is incorrect');
    assert.equal(verification.stake.toString(), verificationStakeAmount, 'The staked amount is incorrect');
    assert.equal(verification.referenceId.toString(), articleId.toString(), 'The article ID reference is incorrect');
  });

  it('allows a user to stake tokens to dispute a verification', async function () {
    const articleContentHash = web3.utils.sha3('Article Content');
    const verificationContentHash = web3.utils.sha3('Verification Content');
    const disputeContentHash = web3.utils.sha3('Dispute Content');

    // Author submits an article and verifier submits a verification
    await newsStaking.submitArticle(articleContentHash, { from: author });
    await newsStaking.submitVerification(0, verificationContentHash, { from: verifier });
    
    // Disputant stakes and submits a dispute
    const verificationId = 0; // assuming the first verification has ID 0
    await newsStaking.submitDispute(verificationId, disputeContentHash, { from: disputant });

    // Retrieve the dispute details from the contract and verify
    const dispute = await newsStaking.disputes(0);
    assert.equal(dispute.submitter, disputant, 'The disputant address is incorrect');
    assert.equal(dispute.contentHash, disputeContentHash, 'The content hash is incorrect');
    assert.equal(dispute.stake.toString(), disputeStakeAmount, 'The staked amount is incorrect');
    assert.equal(dispute.referenceId.toString(), verificationId.toString(), 'The verification ID reference is incorrect');
  });

  // You can add more tests to check for failure cases and other functionality.
});

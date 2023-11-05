const { expectRevert } = require('@openzeppelin/test-helpers');
const PressToken = artifacts.require('PressToken');

contract('PressToken', ([deployer, user1, user2]) => {
  const initialSupply = web3.utils.toWei('1000', 'ether');
  let pressToken;

  beforeEach(async () => {
    pressToken = await PressToken.new(initialSupply, { from: deployer });
  });

  describe('deployment', () => {
    it('should deploy with the correct initial supply', async () => {
      const totalSupply = await pressToken.totalSupply();
      assert.equal(totalSupply.toString(), initialSupply);
    });

    it('should assign the initial supply to the deployer', async () => {
      const deployerBalance = await pressToken.balanceOf(deployer);
      assert.equal(deployerBalance.toString(), initialSupply);
    });
  });

  describe('minting', () => {
    const amountToMint = web3.utils.toWei('100', 'ether');

    it('should mint new tokens when called by the owner', async () => {
      await pressToken.mint(user1, amountToMint, { from: deployer });
      const balance = await pressToken.balanceOf(user1);
      assert.equal(balance.toString(), amountToMint);
    });

    it('should fail when minting from a non-owner account', async () => {
      await expectRevert(
        pressToken.mint(user1, amountToMint, { from: user1 }),
        'Ownable: caller is not the owner'
      );
    });
  });

  describe('burning', () => {
    const amountToBurn = web3.utils.toWei('50', 'ether');

    beforeEach(async () => {
      await pressToken.mint(user1, amountToBurn, { from: deployer });
    });

    it('should allow users to burn their tokens', async () => {
      await pressToken.burn(amountToBurn, { from: user1 });
      const balance = await pressToken.balanceOf(user1);
      assert.equal(balance.toString(), '0');
    });

    it('should allow users to burn their tokens via burnFrom', async () => {
      const allowanceBefore = await pressToken.allowance(user1, deployer);
      assert.equal(allowanceBefore.toString(), '0');

      await pressToken.approve(deployer, amountToBurn, { from: user1 });
      const allowanceAfter = await pressToken.allowance(user1, deployer);
      assert.equal(allowanceAfter.toString(), amountToBurn);

      await pressToken.burnFrom(user1, amountToBurn, { from: deployer });
      const balance = await pressToken.balanceOf(user1);
      assert.equal(balance.toString(), '0');
    });
  });

  // Add more tests as necessary for other contract functions and edge cases
});

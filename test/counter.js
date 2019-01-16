const Counter = artifacts.require("Counter");

contract('Counter', (accounts) => {
  it("should be deployed", async () => {
    const counter = await Counter.deployed();

    assert.isNotNull(counter);
  });

  context("methods", () => {
    let counter;

    beforeEach(async () => {
      counter = await Counter.new(0);
    });

    it("should increase", async () => {
      await counter.increase();

      const count = await counter.count();

      assert.strictEqual("1", count.toString());
    });

    it("should decrease", async () => {
      await counter.increase();

      await counter.decrease();

      const count = await counter.count();

      assert.strictEqual("0", count.toString());
    })
  });

  context("from not owner", () => {
    let counter;

    const owner = accounts[0];
    const notOwner = accounts[1];

    beforeEach(async () => {
      counter = await Counter.new(0, { from: owner });
    });

    it("should fail to call increase", async () => {
      try {
        await counter.increase({ from: notOwner });
      } catch(err) {
        assert.match(err, /Unauthorized/);
      }
    });

    it("should fail to call decrease", async () => {
      try {
        await counter.decrease({ from: notOwner });
      } catch(err) {
        assert.match(err, /Unauthorized/);
      }
    });
  });

  context("overflow - underflow", () => {
    it("should fail to increase", async () => {
      const counter = await Counter.new(
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      );

      try {
        await counter.increase();
      } catch(err) {
        assert.isTrue(true);
        return;
      }

      assert.fail("The increase method didn't fail");
    });

    it("should fail to decrease", async () => {
      const counter = await Counter.new(0);

      try {
        await counter.decrease();
      } catch(err) {
        assert.isTrue(true);
        return;
      }

      assert.fail("The decrease method didn't fail");
    });
  });
});

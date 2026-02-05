// Stake-for-Service Simulator
const eventBus = require('../utils/eventBus');

class SfSSimulator {
  constructor() {
    this.credits = 100;
    this.maxCredits = 500;
    this.baseRewardRate = 0.85;
    this.stakedAmount = 10000; // Simulated staked RIA toknes
    this.totalEarned = 0;
    this.totalSpent = 0;
    this.isActive = true;
  }

  start() {
    // Simulate staking rewards accruing
    setInterval(() => {
      if (this.isActive && this.credits < this.maxCredits) {
        const reward = this.calculateReward();
        this.credits = Math.min(this.credits + reward, this.maxCredits);
        this.totalEarned += reward;

        eventBus.emit('SFS_UPDATE', {
          type: 'REWARD_ACCRUED',
          credits: parseFloat(this.credits.toFixed(2)),
          maxCredits: this.maxCredits,
          reward: parseFloat(reward.toFixed(4)),
          stakedAmount: this.stakedAmount,
          totalEarned: parseFloat(this.totalEarned.toFixed(2)),
          totalSpent: parseFloat(this.totalSpent.toFixed(2)),
          apy: this.calculateAPY()
        });
      }
    }, 1000);
  }

  calculateReward() {
    // Reward scales with staked amount (simplified model)
    const stakingMultiplier = Math.log10(this.stakedAmount) / 4;
    const variance = 0.9 + Math.random() * 0.2;
    return this.baseRewardRate * stakingMultiplier * variance;
  }

  calculateAPY() {
    return ((this.baseRewardRate * 31536000) / this.stakedAmount * 100).toFixed(2);
  }

  deductCredits(amount, reason) {
    if (this.credits >= amount) {
      this.credits -= amount;
      this.totalSpent += amount;

      eventBus.emit('SFS_UPDATE', {
        type: 'CREDITS_DEDUCTED',
        credits: parseFloat(this.credits.toFixed(2)),
        maxCredits: this.maxCredits,
        deducted: amount,
        reason: reason,
        totalSpent: parseFloat(this.totalSpent.toFixed(2))
      });

      return true;
    }
    return false;
  }

  getState() {
    return {
      credits: parseFloat(this.credits.toFixed(2)),
      maxCredits: this.maxCredits,
      stakedAmount: this.stakedAmount,
      totalEarned: parseFloat(this.totalEarned.toFixed(2)),
      totalSpent: parseFloat(this.totalSpent.toFixed(2)),
      apy: this.calculateAPY()
    };
  }

  setStakedAmount(amount) {
    this.stakedAmount = amount;
    eventBus.emit('SFS_UPDATE', {
      type: 'STAKE_UPDATED',
      stakedAmount: amount,
      ...this.getState()
    });
  }
}

module.exports = SfSSimulator;
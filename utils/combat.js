export const calculateDamage = (attacker, defender, isCritical) => {
  const baseDamage = Math.max(1, attacker.attack - defender.defense / 2);
  const variance = Math.floor(baseDamage * 0.2);
  const damage = baseDamage + Math.floor(Math.random() * variance);
  
  return isCritical ? damage * 1.5 : damage;
};

export const calculateExpGain = (monsterLevel, playerLevel) => {
  const levelDifference = monsterLevel - playerLevel;
  let exp = 50 + (monsterLevel * 10);
  
  if (levelDifference > 0) {
    exp *= 1 + (levelDifference * 0.1);
  } else if (levelDifference < 0) {
    exp *= 1 + (levelDifference * 0.05);
  }
  
  return Math.floor(exp);
};

export const calculateLevelUp = (currentExp, currentLevel) => {
  const requiredExp = 100 + (currentLevel * 50);
  if (currentExp >= requiredExp) {
    return {
      levelUp: true,
      remainingExp: currentExp - requiredExp,
      newLevel: currentLevel + 1
    };
  }
  return { levelUp: false };
};

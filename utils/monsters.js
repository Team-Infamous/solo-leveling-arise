export const monsters = {
  // E-Rank Monsters
  goblin: {
    name: "Goblin",
    level: 5,
    health: 50,
    attack: 8,
    defense: 3,
    exp: 20,
    gold: [5, 15],
    image: "monsters/goblin.jpg",
    drops: [
      { item: "goblin_ear", chance: 0.7 },
      { item: "crude_sword", chance: 0.2 }
    ]
  },
  giant_rat: {
    name: "Giant Rat",
    level: 3,
    health: 30,
    attack: 5,
    defense: 2,
    exp: 15,
    gold: [3, 10],
    image: "monsters/giant_rat.jpg",
    drops: [
      { item: "rat_tail", chance: 0.8 }
    ]
  },

  // D-Rank Monsters
  goblin_warrior: {
    name: "Goblin Warrior",
    level: 8,
    health: 80,
    attack: 12,
    defense: 5,
    exp: 35,
    gold: [10, 25],
    image: "monsters/goblin_warrior.jpg",
    drops: [
      { item: "goblin_ear", chance: 0.5 },
      { item: "rusty_sword", chance: 0.3 }
    ]
  },
  skeleton: {
    name: "Skeleton",
    level: 10,
    health: 60,
    attack: 15,
    defense: 4,
    exp: 40,
    gold: [15, 30],
    image: "monsters/skeleton.jpg",
    drops: [
      { item: "bone_fragment", chance: 0.9 },
      { item: "ancient_coin", chance: 0.1 }
    ]
  },

  // C-Rank Monsters
  goblin_shaman: {
    name: "Goblin Shaman",
    level: 12,
    health: 70,
    attack: 18,
    defense: 3,
    exp: 50,
    gold: [20, 40],
    image: "monsters/goblin_shaman.jpg",
    drops: [
      { item: "magic_crystal", chance: 0.4 },
      { item: "healing_potion", chance: 0.3 }
    ]
  },
  wolf: {
    name: "Dire Wolf",
    level: 15,
    health: 120,
    attack: 25,
    defense: 8,
    exp: 70,
    gold: [25, 50],
    image: "monsters/dire_wolf.jpg",
    drops: [
      { item: "wolf_pelt", chance: 0.6 },
      { item: "fang_necklace", chance: 0.2 }
    ]
  },

  // B-Rank Monsters
  orc: {
    name: "Orc Warrior",
    level: 20,
    health: 200,
    attack: 35,
    defense: 15,
    exp: 120,
    gold: [50, 100],
    image: "monsters/orc_warrior.jpg",
    drops: [
      { item: "orc_tusk", chance: 0.5 },
      { item: "steel_axe", chance: 0.2 }
    ]
  },
  necromancer: {
    name: "Necromancer",
    level: 25,
    health: 150,
    attack: 40,
    defense: 10,
    exp: 150,
    gold: [80, 150],
    image: "monsters/necromancer.jpg",
    drops: [
      { item: "dark_tome", chance: 0.3 },
      { item: "soul_shard", chance: 0.4 }
    ]
  },

  // A-Rank Monsters
  troll: {
    name: "Cave Troll",
    level: 35,
    health: 400,
    attack: 50,
    defense: 30,
    exp: 250,
    gold: [150, 300],
    image: "monsters/cave_troll.jpg",
    drops: [
      { item: "troll_blood", chance: 0.7 },
      { item: "troll_hide", chance: 0.4 }
    ]
  },
  demon: {
    name: "Lesser Demon",
    level: 40,
    health: 350,
    attack: 60,
    defense: 25,
    exp: 300,
    gold: [200, 400],
    image: "monsters/lesser_demon.jpg",
    drops: [
      { item: "demon_horn", chance: 0.5 },
      { item: "infernal_essence", chance: 0.2 }
    ]
  },

  // S-Rank Monsters
  dragon: {
    name: "Young Dragon",
    level: 60,
    health: 800,
    attack: 80,
    defense: 50,
    exp: 600,
    gold: [500, 1000],
    image: "monsters/young_dragon.jpg",
    drops: [
      { item: "dragon_scale", chance: 0.8 },
      { item: "dragon_fang", chance: 0.3 }
    ]
  },
  death_knight: {
    name: "Death Knight",
    level: 70,
    health: 1000,
    attack: 90,
    defense: 60,
    exp: 800,
    gold: [700, 1500],
    image: "monsters/death_knight.jpg",
    drops: [
      { item: "cursed_blade", chance: 0.1 },
      { item: "dark_armor", chance: 0.05 }
    ]
  }
};

export const dungeons = [
  {
    id: 1,
    name: "E-Rank Dungeon: Rat Infested Sewers",
    description: "Dark sewers filled with giant rats and other vermin.",
    recommendedRank: "E",
    image: "backgrounds/sewer.jpg",
    rooms: [
      { enemy: "giant_rat" },
      { enemy: "giant_rat" },
      { enemy: "giant_rat" },
      { boss: "giant_rat_king" }
    ]
  },
  {
    id: 2,
    name: "D-Rank Dungeon: Goblin Hideout",
    description: "A cave system serving as home to a goblin tribe.",
    recommendedRank: "D",
    image: "backgrounds/goblin_cave.jpg",
    rooms: [
      { enemy: "goblin" },
      { enemy: "goblin" },
      { enemy: "goblin_warrior" },
      { boss: "goblin_chief" }
    ]
  },
  {
    id: 3,
    name: "C-Rank Dungeon: Haunted Crypt",
    description: "An ancient burial ground now filled with undead.",
    recommendedRank: "C",
    image: "backgrounds/crypt.jpg",
    rooms: [
      { enemy: "skeleton" },
      { enemy: "skeleton" },
      { enemy: "zombie" },
      { boss: "necromancer" }
    ]
  },
  {
    id: 4,
    name: "B-Rank Dungeon: Orc Stronghold",
    description: "A fortified mountain pass controlled by orc tribes.",
    recommendedRank: "B",
    image: "backgrounds/orc_stronghold.jpg",
    rooms: [
      { enemy: "orc" },
      { enemy: "orc_warrior" },
      { enemy: "orc_shaman" },
      { boss: "orc_warlord" }
    ]
  },
  {
    id: 5,
    name: "A-Rank Dungeon: Demon's Maw",
    description: "A portal to the demon realm that occasionally spews forth infernal creatures.",
    recommendedRank: "A",
    image: "backgrounds/demon_realm.jpg",
    rooms: [
      { enemy: "imp" },
      { enemy: "hellhound" },
      { enemy: "succubus" },
      { boss: "lesser_demon" }
    ]
  },
  {
    id: 6,
    name: "S-Rank Dungeon: Dragon's Lair",
    description: "The nesting ground of a young but deadly dragon.",
    recommendedRank: "S",
    image: "backgrounds/dragon_lair.jpg",
    rooms: [
      { enemy: "drake" },
      { enemy: "wyvern" },
      { enemy: "dragonkin" },
      { boss: "young_dragon" }
    ]
  }
];

export const DEBUG = true;

export const USER_STATES = {
  MENU: "v menu",
  LOBBY: "v lobby",
  GAME: "ve hře",
};

export const ROOM_STATES = {
  LOBBY: "lobby",
  GAME: "game",
  ENDED: "ended",
};

export const GAME_STATES = {
  START: "starting",

  REGION_PICK: "region_pick",
  REGION_ATTACK: "region_attack",
  REGION_BATTLE: "region_battle",
  REGION_RESULTS: "region_results",

  QUESTION_GUESS: "question_guess",
  QUESTION_RESULTS: "question_results",
};

export const QUESTION_TYPES = {
  PICK: "pick",
  NUMERIC: "numeric",
  IMAGE: "image",
};

export const GAME_REGION_NEIGHBORS = {
  0: [6, 1, 8, 9],
  1: [6, 0, 8, 13],
  2: [13, 7, 5, 4, 3],
  3: [2, 4, 12],
  4: [5, 2, 3, 12],
  5: [11, 8, 7, 2, 4],
  6: [1, 0, 8],
  7: [8, 13, 2, 5],
  8: [9, 0, 1, 13, 7, 5, 11, 10],
  9: [0, 8, 11],
  10: [8],
  11: [9, 8, 5],
  12: [4, 3],
  13: [1, 8, 7, 2],
};

export const NUMBER_OF_REGIONS = 14;

export const PLAYER_COLORS = ["#FF4545", "#52FF68", "#4EBAFF"];

export const PLAYER_COLORS_DARK = ["#7C2828", "#2BA23B", "#226894"];

export const PLAYER_COLORS_LIGHT = ["#941C1C", "#93FFA1", "#84CFFF"];

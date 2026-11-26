export type Scene = {
  side: string;
  kanji: string;
  reading: string;
};

export const scenes: readonly Scene[] = [
  { side: "もう会えないと知っていた", kanji: "涙", reading: "なみだ" },
  { side: "雨の音だけが残った", kanji: "雨", reading: "あめ" },
  { side: "君のいない季節がまた来る", kanji: "影", reading: "かげ" },
  { side: "目覚めると何もなかった", kanji: "夢", reading: "ゆめ" },
  { side: "誰もいない駅で待っている", kanji: "夜", reading: "よる" },
];

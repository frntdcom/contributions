export type DailyContribution = {
  date: string | null,
  amount: number,
}

export type WeeklyContributionsGrid = DailyContribution[][];


export type Contributions = {
  year: number;

  // i.e. '2015-02-02': 3
  [key: string]: number;
};

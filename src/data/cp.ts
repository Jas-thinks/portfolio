// All figures below were read from the public profile APIs/pages on 2026-11-20:
//  - Codeforces: official API (user.info, user.rating)
//  - LeetCode: public GraphQL (matchedUser, userContestRanking)
//  - CodeChef: public profile page
export const codeforcesHistory = [
  358, 610, 738, 780, 865, 895, 803, 753, 742, 868, 773, 838, 777, 834, 864, 911, 912, 921, 1009, 982, 1065, 1068,
  1189, 1140, 1095, 1242, 1332, 1406, 1365, 1440, 1382, 1382, 1338, 1279, 1234, 1247, 1300, 1296, 1357, 1434, 1352,
  1400, 1406, 1448, 1307, 1176, 1065,
]

export const platforms = [
  {
    id: 'codeforces',
    name: 'Codeforces',
    handle: 'jas.thinks',
    url: 'https://codeforces.com/profile/jas.thinks',
    stats: [
      { k: 'Peak rating', v: '1448', note: 'Specialist' },
      { k: 'Current', v: '1065', note: 'Newbie' },
      { k: 'Rated contests', v: '47', note: '' },
    ],
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    handle: 'jasthinks',
    url: 'https://www.codechef.com/users/jasthinks',
    stats: [
      { k: 'Rating', v: '1476', note: '2★ · Div 3' },
      { k: 'Highest', v: '1497', note: '' },
      { k: 'Problems solved', v: '145', note: '' },
    ],
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    handle: 'Jas_thinks',
    url: 'https://leetcode.com/u/Jas_thinks/',
    stats: [
      { k: 'Solved', v: '121', note: '62 E · 52 M · 7 H' },
      { k: 'Contest rating', v: '1446', note: '3 contests' },
    ],
  },
] as const

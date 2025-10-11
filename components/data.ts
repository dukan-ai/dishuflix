export interface Movie {
  id: number;
  title: string;
  type: 'movie' | 'series';
  posterPath: string;
  backdropPath?: string;
  genres: string[];
  rating: number; // A number between 0 and 10
  year: number;
  description: string;
  cast: string[];
  progress?: number; // Optional progress for 'Continue Watching'
  trailerUrl?: string;
  isNew?: boolean;
}

export interface Category {
  title: string;
  movies: Movie[];
}

export const mockData: Category[] = [
  {
    title: 'Trending Now',
    movies: [
      {
        id: 1,
        title: 'Dune: Part Two',
        type: 'movie',
        posterPath: 'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
        backdropPath: 'https://i.pinimg.com/1200x/55/3c/40/553c40e3345e0cf684f58f717661a6cc.jpg',
        genres: ['Sci-Fi', 'Adventure'],
        rating: 9.4,
        year: 2024,
        description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
        cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
        trailerUrl: 'https://youtu.be/Way9Dexny3w',
      },
      {
        id: 11,
        title: 'Jawan',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/1200x/59/27/50/5927501eeb30666518c6b9fa309fc4be.jpg',
        backdropPath: 'https://i.pinimg.com/1200x/98/42/37/98423769d41c28fc69dbcf3b953c0896.jpg',
        genres: ['Action', 'Thriller'],
        rating: 8.5,
        year: 2023,
        description: "A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in society.",
        cast: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi"],
        trailerUrl: 'https://youtu.be/MWOlnZSnXJo',
      },
      {
        id: 14,
        title: 'Stranger Things',
        type: 'series',
        posterPath: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
        backdropPath: 'https://i.pinimg.com/1200x/cd/99/52/cd99520b7b2928cc28642f472e4c6fe2.jpg',
        genres: ['Sci-Fi', 'Horror', 'Mystery'],
        rating: 9.3,
        year: 2016,
        description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
        cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
        trailerUrl: 'https://youtu.be/iKZyYdwS3Wg',
      },
      {
        id: 4,
        title: 'The Boys',
        type: 'series',
        posterPath: 'https://i.pinimg.com/736x/7a/f8/8d/7af88dcabc0deb8e53f8bcf641b8ca9a.jpg',
        backdropPath: 'https://i.pinimg.com/1200x/97/6c/9f/976c9f28572614f6975d1609f5590a28.jpg',
        genres: ['Action', 'Comedy', 'Crime'],
        rating: 8.7,
        year: 2019,
        description: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
        cast: ["Karl Urban", "Jack Quaid", "Antony Starr"],
        trailerUrl: 'https://youtu.be/elTgqUW-NYE',
      },
      {
        id: 12,
        title: 'Pathaan',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/736x/f9/01/fc/f901fc3730051a2a789c96cccdc05f17.jpg',
        backdropPath: 'https://i.pinimg.com/736x/f9/01/fc/f901fc3730051a2a789c96cccdc05f17.jpg',
        genres: ['Action', 'Spy', 'Thriller'],
        rating: 8.2,
        year: 2023,
        description: "An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.",
        cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"],
        trailerUrl: 'https://youtu.be/vqu4z34wENw',
      },
      {
        id: 5,
        title: 'Panchayat',
        type: 'series',
        posterPath: 'https://i.pinimg.com/736x/31/83/55/31835529cb1f29fe9eae4dd81ed11e34.jpg',
        backdropPath: 'https://i.pinimg.com/736x/31/83/55/31835529cb1f29fe9eae4dd81ed11e34.jpg',
        genres: ['Comedy', 'Drama'],
        rating: 9.1,
        year: 2020,
        description: "A comedy-drama, which captures the journey of an engineering graduate Abhishek, who for lack of a better job option joins as secretary of a Panchayat office in a remote village of Uttar Pradesh.",
        cast: ["Jitendra Kumar", "Raghubir Yadav", "Neena Gupta"],
        trailerUrl: 'https://youtu.be/AHMEtNAZTP4',
      },
      {
        id: 13,
        title: 'Oppenheimer',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/1200x/77/9d/a3/779da30964fb69b47c4f03138d482f9d.jpg',
        backdropPath: 'https://i.pinimg.com/1200x/d9/ac/02/d9ac024c7b39b7d38dc4e97054b63e73.jpg',
        genres: ['Biography', 'Drama', 'History'],
        rating: 8.8,
        year: 2023,
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
        trailerUrl: 'https://youtu.be/bK6ldnjE3Y0?t=8',
      },
    ],
  },
  {
    title: 'Continue Watching',
    movies: [
      {
        id: 21,
        title: 'Mirzapur',
        type: 'series',
        posterPath: 'https://image.tmdb.org/t/p/w500/sgxawbJ1qr92c2vD9n2ugBC3a6o.jpg',
        genres: ['Crime', 'Drama'],
        rating: 8.5,
        progress: 60,
        year: 2018,
        description: "A shocking incident at a wedding procession ignites a series of events entangling the lives of two families in the lawless city of Mirzapur.",
        cast: ["Pankaj Tripathi", "Ali Fazal", "Divyendu Sharma"]
      },
      {
        id: 22,
        title: 'Sacred Games',
        type: 'series',
        posterPath: 'https://image.tmdb.org/t/p/w500/yvKrycViRMQcIgdnjsM5Jgn2aD.jpg',
        genres: ['Crime', 'Thriller'],
        rating: 8.9,
        progress: 25,
        year: 2018,
        description: "A link in their pasts leads an honest cop to a fugitive gang boss, whose cryptic warning spurs the officer on a quest to save Mumbai from cataclysm.",
        cast: ["Saif Ali Khan", "Nawazuddin Siddiqui", "Radhika Apte"]
      },
      {
        id: 23,
        title: 'Money Heist',
        type: 'series',
        posterPath: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
        genres: ['Crime', 'Heist'],
        rating: 8.3,
        progress: 80,
        year: 2017,
        description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
        cast: ["Úrsula Corberó", "Álvaro Morte", "Itziar Ituño"]
      },
      {
        id: 24,
        title: 'Dark',
        type: 'series',
        posterPath: 'https://image.tmdb.org/t/p/w500/apbrb6EVteHPfms4oFy7v21S9g9.jpg',
        genres: ['Sci-Fi', 'Mystery'],
        rating: 8.8,
        progress: 40,
        year: 2017,
        description: "A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.",
        cast: ["Louis Hofmann", "Karoline Eichhorn", "Lisa Vicari"]
      },
    ]
  },
  {
    title: 'Top 10 Series in Dishuflix Today',
    movies: [
      {
        id: 21,
        title: 'Mirzapur',
        type: 'series',
        isNew: true,
        posterPath: 'https://i.pinimg.com/736x/5a/0d/c7/5a0dc754a76af3000a1497dcdcc17c67.jpg',
        genres: ['Crime', 'Drama'],
        rating: 8.5,
        year: 2018,
        description: "A shocking incident at a wedding procession ignites a series of events entangling the lives of two families in the lawless city of Mirzapur.",
        cast: ["Pankaj Tripathi", "Ali Fazal", "Divyendu Sharma"]
      },
      {
        id: 4,
        title: 'The Boys',
        type: 'series',
        isNew: true,
        posterPath: 'https://i.pinimg.com/736x/7a/f8/8d/7af88dcabc0deb8e53f8bcf641b8ca9a.jpg',
        genres: ['Action', 'Comedy', 'Crime'],
        rating: 8.7,
        year: 2019,
        description: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
        cast: ["Karl Urban", "Jack Quaid", "Antony Starr"],
        trailerUrl: 'https://youtu.be/elTgqUW-NYE',
      },
      {
        id: 5,
        title: 'Panchayat',
        type: 'series',
        isNew: true,
        posterPath: 'https://i.pinimg.com/736x/31/83/55/31835529cb1f29fe9eae4dd81ed11e34.jpg',
        genres: ['Comedy', 'Drama'],
        rating: 9.1,
        year: 2020,
        description: "A comedy-drama, which captures the journey of an engineering graduate Abhishek, who for lack of a better job option joins as secretary of a Panchayat office in a remote village of Uttar Pradesh.",
        cast: ["Jitendra Kumar", "Raghubir Yadav", "Neena Gupta"],
        trailerUrl: 'https://youtu.be/AHMEtNAZTP4',
      },
      {
        id: 22,
        title: 'Sacred Games',
        type: 'series',
        posterPath: 'https://i.pinimg.com/736x/9f/f1/c3/9ff1c3b1ac636f56083e7c707c3bc899.jpg',
        genres: ['Crime', 'Thriller'],
        rating: 8.9,
        year: 2018,
        description: "A link in their pasts leads an honest cop to a fugitive gang boss, whose cryptic warning spurs the officer on a quest to save Mumbai from cataclysm.",
        cast: ["Saif Ali Khan", "Nawazuddin Siddiqui", "Radhika Apte"]
      },
      {
        id: 34,
        title: 'Scam 1992',
        type: 'series',
        posterPath: 'https://i.pinimg.com/1200x/cd/5a/a4/cd5aa481fea1dbcbc621cdaa2f699034.jpg',
        genres: ['Biography', 'Crime'],
        rating: 9.5,
        year: 2020,
        description: "Set in 1980s and 90s Bombay, it follows the life of Harshad Mehta, a stockbroker who took the stock market to dizzying heights and his catastrophic downfall.",
        cast: ["Pratik Gandhi", "Shreya Dhanwanthary", "Hemant Kher"]
      },
      {
        id: 31,
        title: 'The Family Man',
        type: 'series',
        posterPath: 'https://i.pinimg.com/736x/b0/9e/ed/b09eed29918448b073261c54d33df4ee.jpg',
        genres: ['Action', 'Spy'],
        rating: 8.8,
        year: 2019,
        description: "A working man from the National Investigation Agency tries to protect the nation from terrorism, but he also has to protect his family from the impact of his secretive, high-pressure, and low-paying job.",
        cast: ["Manoj Bajpayee", "Samantha Ruth Prabhu", "Priyamani"]
      },
       {
        id: 14,
        title: 'Stranger Things',
        type: 'series',
        posterPath: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
        genres: ['Sci-Fi', 'Horror', 'Mystery'],
        rating: 9.3,
        year: 2016,
        description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
        cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
        trailerUrl: 'https://youtu.be/iKZyYdwS3Wg',
      },
       {
        id: 2,
        title: 'Breaking Bad',
        type: 'series',
        posterPath: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
        genres: ['Crime', 'Drama', 'Thriller'],
        rating: 9.5,
        year: 2008,
        description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
        cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"]
      },
      {
        id: 23,
        title: 'Money Heist',
        type: 'series',
        posterPath: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
        genres: ['Crime', 'Heist'],
        rating: 8.3,
        year: 2017,
        description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
        cast: ["Úrsula Corberó", "Álvaro Morte", "Itziar Ituño"]
      },
       {
        id: 35,
        title: 'Asur',
        type: 'series',
        posterPath: 'https://i.pinimg.com/1200x/7a/bb/22/7abb22bbcafffc810641828f74aa5355.jpg',
        genres: ['Thriller', 'Crime'],
        rating: 9.0,
        year: 2020,
        description: "A unique crime thriller that pits two opposing worlds against each other. The less explored, intricate world of forensic science and the deep mysticism of ancient Indian Mythology.",
        cast: ["Arshad Warsi", "Barun Sobti", "Anupriya Goenka"]
      },
    ]
  },
  {
    title: 'Top 10 Movies in Dishuflix Today',
    movies: [
      {
        id: 1,
        title: 'Dune: Part Two',
        type: 'movie',
        isNew: true,
        posterPath: 'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
        genres: ['Sci-Fi', 'Adventure'],
        rating: 9.4,
        year: 2024,
        description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
        cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
        trailerUrl: 'https://youtu.be/Way9Dexny3w',
      },
      {
        id: 13,
        title: 'Oppenheimer',
        type: 'movie',
        isNew: true,
        posterPath: 'https://i.pinimg.com/1200x/77/9d/a3/779da30964fb69b47c4f03138d482f9d.jpg',
        genres: ['Biography', 'Drama', 'History'],
        rating: 8.8,
        year: 2023,
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
        trailerUrl: 'https://youtu.be/bK6ldnjE3Y0?t=8',
      },
      {
        id: 11,
        title: 'Jawan',
        type: 'movie',
        isNew: true,
        posterPath: 'https://i.pinimg.com/1200x/59/27/50/5927501eeb30666518c6b9fa309fc4be.jpg',
        genres: ['Action', 'Thriller'],
        rating: 8.5,
        year: 2023,
        description: "A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in society.",
        cast: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi"],
        trailerUrl: 'https://youtu.be/MWOlnZSnXJo',
      },
      {
        id: 10,
        title: 'Animal',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/1200x/84/5b/f5/845bf5b0210c5e0358dd0c06596da4f2.jpg',
        genres: ['Crime', 'Drama'],
        rating: 7.9,
        year: 2023,
        description: "The son of a wealthy businessman returns home after a long absence and must confront the ghosts of his past.",
        cast: ["Ranbir Kapoor", "Anil Kapoor", "Bobby Deol"]
      },
      {
        id: 6,
        title: 'Kalki 2898 AD',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/1200x/e7/c9/b2/e7c9b243526feb237724693a7157ac13.jpg',
        genres: ['Sci-Fi', 'Action'],
        rating: 8.1,
        year: 2024,
        description: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to Earth to protect the world from evil forces.",
        cast: ["Prabhas", "Amitabh Bachchan", "Deepika Padukone"]
      },
      {
        id: 12,
        title: 'Pathaan',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/736x/f9/01/fc/f901fc3730051a2a789c96cccdc05f17.jpg',
        genres: ['Action', 'Spy', 'Thriller'],
        rating: 8.2,
        year: 2023,
        description: "An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.",
        cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"],
        trailerUrl: 'https://youtu.be/vqu4z34wENw',
      },
      {
        id: 32,
        title: 'Gangs of Wasseypur',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/1200x/d3/65/c6/d365c673fc4c9a7b09994477117e17a6.jpg',
        genres: ['Crime', 'Action'],
        rating: 8.2,
        year: 2012,
        description: "A clash between Sultan and Shahid Khan leads to the expulsion of Khan from Wasseypur, and ignites a deadly blood feud spanning three generations.",
        cast: ["Manoj Bajpayee", "Nawazuddin Siddiqui", "Richa Chadha"]
      },
      {
        id: 33,
        title: 'Andhadhun',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/736x/99/f7/3d/99f73d2b7b089d2dadde2fed74bd19b6.jpg',
        genres: ['Thriller', 'Comedy'],
        rating: 8.3,
        year: 2018,
        description: "A series of mysterious events change the life of a blind pianist, who must now report a crime that he should technically know nothing of.",
        cast: ["Ayushmann Khurrana", "Tabu", "Radhika Apte"]
      },
       {
        id: 9,
        title: 'Godzilla x Kong',
        type: 'movie',
        posterPath: 'https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg',
        genres: ['Action', 'Sci-Fi'],
        rating: 8.0,
        year: 2024,
        description: "Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island's mysteries.",
        cast: ["Rebecca Hall", "Brian Tyree Henry", "Dan Stevens"]
      },
      {
        id: 36,
        title: 'Do Patti',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/1200x/06/db/09/06db09a2b9e659e2b173d1e6f768a2a2.jpg',
        genres: ['Thriller', 'Crime'],
        rating: 9.0,
        year: 2024,
        description: "A gripping thriller set in the hills of north India, where a police officer is entangled in a web of deceit and hidden secrets.",
        cast: ["Kajol", "Kriti Sanon", "Shaheer Sheikh"]
      },
    ]
  },
  {
    title: 'Top Picks for You',
    movies: [
      {
        id: 31,
        title: 'The Family Man',
        type: 'series',
        posterPath: 'https://i.pinimg.com/736x/b0/9e/ed/b09eed29918448b073261c54d33df4ee.jpg',
        genres: ['Action', 'Spy'],
        rating: 8.8,
        year: 2019,
        description: "A working man from the National Investigation Agency tries to protect the nation from terrorism, but he also has to protect his family from the impact of his secretive, high-pressure, and low-paying job.",
        cast: ["Manoj Bajpayee", "Samantha Ruth Prabhu", "Priyamani"]
      },
      {
        id: 32,
        title: 'Gangs of Wasseypur',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/1200x/d3/65/c6/d365c673fc4c9a7b09994477117e17a6.jpg',
        genres: ['Crime', 'Action'],
        rating: 8.2,
        year: 2012,
        description: "A clash between Sultan and Shahid Khan leads to the expulsion of Khan from Wasseypur, and ignites a deadly blood feud spanning three generations.",
        cast: ["Manoj Bajpayee", "Nawazuddin Siddiqui", "Richa Chadha"]
      },
      {
        id: 33,
        title: 'Andhadhun',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/736x/99/f7/3d/99f73d2b7b089d2dadde2fed74bd19b6.jpg',
        genres: ['Thriller', 'Comedy'],
        rating: 8.3,
        year: 2018,
        description: "A series of mysterious events change the life of a blind pianist, who must now report a crime that he should technically know nothing of.",
        cast: ["Ayushmann Khurrana", "Tabu", "Radhika Apte"]
      },
      {
        id: 34,
        title: 'Scam 1992',
        type: 'series',
        posterPath: 'https://i.pinimg.com/1200x/cd/5a/a4/cd5aa481fea1dbcbc621cdaa2f699034.jpg',
        genres: ['Biography', 'Crime'],
        rating: 9.5,
        year: 2020,
        description: "Set in 1980s and 90s Bombay, it follows the life of Harshad Mehta, a stockbroker who took the stock market to dizzying heights and his catastrophic downfall.",
        cast: ["Pratik Gandhi", "Shreya Dhanwanthary", "Hemant Kher"]
      },
      {
        id: 35,
        title: 'Asur',
        type: 'series',
        posterPath: 'https://i.pinimg.com/1200x/7a/bb/22/7abb22bbcafffc810641828f74aa5355.jpg',
        genres: ['Thriller', 'Crime'],
        rating: 9.0,
        year: 2020,
        description: "A unique crime thriller that pits two opposing worlds against each other. The less explored, intricate world of forensic science and the deep mysticism of ancient Indian Mythology.",
        cast: ["Arshad Warsi", "Barun Sobti", "Anupriya Goenka"]
      },
      {
        id: 36,
        title: 'Do Patti',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/1200x/06/db/09/06db09a2b9e659e2b173d1e6f768a2a2.jpg',
        genres: ['Thriller', 'Crime'],
        rating: 9.0,
        year: 2024,
        description: "A gripping thriller set in the hills of north India, where a police officer is entangled in a web of deceit and hidden secrets.",
        cast: ["Kajol", "Kriti Sanon", "Shaheer Sheikh"]
      },
    ]
  },
  {
    title: 'New Releases',
    movies: [
      {
        id: 6,
        title: 'Kalki 2898 AD',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/1200x/e7/c9/b2/e7c9b243526feb237724693a7157ac13.jpg',
        genres: ['Sci-Fi', 'Action'],
        rating: 8.1,
        year: 2024,
        description: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to Earth to protect the world from evil forces.",
        cast: ["Prabhas", "Amitabh Bachchan", "Deepika Padukone"]
      },
      {
        id: 7,
        title: 'Inside Out 2',
        type: 'movie',
        posterPath: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
        genres: ['Animation', 'Family'],
        rating: 7.8,
        year: 2024,
        description: "Follows Riley, in her teenage years, encountering new emotions.",
        cast: ["Amy Poehler", "Phyllis Smith", "Lewis Black"]
      },
      {
        id: 8,
        title: 'A Quiet Place: Day One',
        type: 'movie',
        posterPath: 'https://i.pinimg.com/736x/65/4b/61/654b618a57982f129994af1657819f53.jpg',
        genres: ['Horror', 'Sci-Fi'],
        rating: 7.3,
        year: 2024,
        description: "As New York City is invaded by alien creatures who hunt by sound, a woman named Sam must fight to survive.",
        cast: ["Lupita Nyong'o", "Joseph Quinn", "Alex Wolff"]
      },
      {
        id: 9,
        title: 'Godzilla x Kong',
        type: 'movie',
        posterPath: 'https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg',
        genres: ['Action', 'Sci-Fi'],
        rating: 8.0,
        year: 2024,
        description: "Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island's mysteries.",
        cast: ["Rebecca Hall", "Brian Tyree Henry", "Dan Stevens"]
      },
    ],
  },
  {
    title: 'My List',
    movies: [
       {
        id: 10,
        title: 'Animal',
        type: 'movie',
        posterPath: 'https://image.tmdb.org/t/p/w500/hr9rjR3J0xBBK0aG6egF3h5b303.jpg',
        genres: ['Crime', 'Drama'],
        rating: 7.9,
        year: 2023,
        description: "The son of a wealthy businessman returns home after a long absence and must confront the ghosts of his past.",
        cast: ["Ranbir Kapoor", "Anil Kapoor", "Bobby Deol"]
      },
      {
        id: 2,
        title: 'Breaking Bad',
        type: 'series',
        posterPath: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
        genres: ['Crime', 'Drama', 'Thriller'],
        rating: 9.5,
        year: 2008,
        description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
        cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"]
      },
      {
        id: 3,
        title: 'Demon Slayer',
        type: 'series',
        posterPath: 'https://i.pinimg.com/736x/39/9b/83/399b83aa72375e3e8aad65b57656f646.jpg',
        genres: ['Anime', 'Action', 'Fantasy'],
        rating: 9.2,
        year: 2019,
        description: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
        cast: ["Natsuki Hanae", "Akari Kito", "Hiro Shimono"]
      },
    ]
  }
];
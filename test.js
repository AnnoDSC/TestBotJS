const choices = [
  { name: 'Funny', value: 'gif_funny' },
  { name: 'Meme', value: 'gif_meme' },
  { name: 'Movie', value: 'gif_movie' },
];

const json = JSON.stringify(choices, null, 2); // pretty print with indentation
console.log(json);

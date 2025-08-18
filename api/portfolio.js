// api/portfolio.js

const portfolioData = {
  profile: {
    name: 'Muthukaruppan KN M',
    tagline: 'A passionate Computer Science and Engineering student.',
    // ...rest of your data
  },
  // ...other data: projects, skills, etc.
};

export default function handler(req, res) {
  res.status(200).json(portfolioData);
}

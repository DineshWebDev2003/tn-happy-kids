export type Alphabet = {
  letter: string;
  word: string;
  imageUrl: string;
  imageHint: string;
  gifUrl: string;
  // soundUrl: string; // Placeholder for future sound feature
};

export const alphabets: Alphabet[] = [
  { letter: 'A', word: 'A is for Apple', imageUrl: '/alphabets/apple.gif', imageHint: 'red apple', gifUrl: '/alphabets/apple.gif' },
  { letter: 'B', word: 'B is for Ball', imageUrl: '/alphabets/ball.gif', imageHint: 'colorful ball', gifUrl: '/alphabets/ball.gif' },
  { letter: 'C', word: 'C is for Cat', imageUrl: '/alphabets/cat.gif', imageHint: 'cute cat', gifUrl: '/alphabets/cat.gif' },
  { letter: 'D', word: 'D is for Dog', imageUrl: '/alphabets/dog.gif', imageHint: 'happy dog', gifUrl: '/alphabets/dog.gif' },
  { letter: 'E', word: 'E is for Elephant', imageUrl: '/alphabets/elephant.gif', imageHint: 'grey elephant', gifUrl: '/alphabets/elephant.gif' },
  { letter: 'F', word: 'F is for Fish', imageUrl: '/alphabets/fish.gif', imageHint: 'blue fish', gifUrl: '/alphabets/fish.gif' },
  { letter: 'G', word: 'G is for Goat', imageUrl: '/alphabets/goat.gif', imageHint: 'white goat', gifUrl: '/alphabets/goat.gif' },
  { letter: 'H', word: 'H is for Hat', imageUrl: '/alphabets/hat.gif', imageHint: 'straw hat', gifUrl: '/alphabets/hat.gif' },
  { letter: 'I', word: 'I is for Ice Cream', imageUrl: '/alphabets/ice.gif', imageHint: 'vanilla icecream', gifUrl: '/alphabets/ice.gif' },
  { letter: 'J', word: 'J is for Jam', imageUrl: '/alphabets/jug.gif', imageHint: 'strawberry jam', gifUrl: '/alphabets/jug.gif' },
  { letter: 'K', word: 'K is for Kite', imageUrl: '/alphabets/kite.gif', imageHint: 'flying kite', gifUrl: '/alphabets/kite.gif' },
  { letter: 'L', word: 'L is for Lion', imageUrl: '/alphabets/lion.gif', imageHint: 'mane lion', gifUrl: '/alphabets/lion.gif' },
  { letter: 'M', word: 'M is for Monkey', imageUrl: '/alphabets/monkey.gif', imageHint: 'brown monkey', gifUrl: '/alphabets/monkey.gif' },
  { letter: 'N', word: 'N is for Nest', imageUrl: '/alphabets/nest.gif', imageHint: 'bird nest', gifUrl: '/alphabets/nest.gif' },
  { letter: 'O', word: 'O is for Orange', imageUrl: '/alphabets/orange.gif', imageHint: 'juicy orange', gifUrl: '/alphabets/orange.gif' },
  { letter: 'P', word: 'P is for Penguin', imageUrl: '/alphabets/penguin.gif', imageHint: 'yellow pencil', gifUrl: '/alphabets/penguin.gif' },
  { letter: 'Q', word: 'Q is for Queen', imageUrl: '/alphabets/queen.gif', imageHint: 'royal queen', gifUrl: '/alphabets/queen.gif' },
  { letter: 'R', word: 'R is for Rabbit', imageUrl: '/alphabets/rabbit.gif', imageHint: 'vibrant rainbow', gifUrl: '/alphabets/rabbit.gif' },
  { letter: 'S', word: 'S is for Sun', imageUrl: '/alphabets/sun.gif', imageHint: 'shining sun', gifUrl: '/alphabets/sun.gif' },
  { letter: 'T', word: 'T is for Tiger', imageUrl: '/alphabets/tiger.gif', imageHint: 'green tree', gifUrl: '/alphabets/tiger.gif' },
  { letter: 'U', word: 'U is for Umbrella', imageUrl: '/alphabets/umbrella.gif', imageHint: 'open umbrella', gifUrl: '/alphabets/umbrella.gif' },
  { letter: 'V', word: 'V is for Violin', imageUrl: '/alphabets/violin.gif', imageHint: 'wooden violin', gifUrl: '/alphabets/violin.gif' },
  { letter: 'W', word: 'W is for Whale', imageUrl: '/alphabets/whale.gif', imageHint: 'wrist watch', gifUrl: '/alphabets/whale.gif' },
  { letter: 'X', word: 'X is for Xylophone', imageUrl: '/alphabets/xylophone.gif', imageHint: 'musical xylophone', gifUrl: '/alphabets/xylophone.gif' },
  { letter: 'Y', word: 'Y is for Yarn', imageUrl: '/alphabets/yarn.gif', imageHint: 'furry yak', gifUrl: '/alphabets/yarn.gif' },
  { letter: 'Z', word: 'Z is for Zebra', imageUrl: '/alphabets/zebra.gif', imageHint: 'striped zebra', gifUrl: '/alphabets/zebra.gif' },
];

export type Game = {
  id: string;
  title: string;
  description: string;
  IconName: string; // Corresponds to Lucide icon names
  href: string;
  imageHint: string;
};

export const games: Game[] = [
  { id: '1', title: 'Number Ninjas', description: 'Master numbers with fun counting games.', IconName: 'Hash', href: '/learn/games/numbers', imageHint: 'colorful numbers' },
  { id: '2', title: 'Color Champions', description: 'Explore the vibrant world of colors.', IconName: 'Palette', href: '/learn/games/colors', imageHint: 'paint palette' },
  { id: '3', title: 'Shape Shifters', description: 'Identify and match different shapes.', IconName: 'Shapes', href: '/learn/games/shapes', imageHint: 'geometric shapes' },
  { id: '4', title: 'Memory Masters', description: 'Boost your memory with exciting challenges.', IconName: 'Brain', href: '/learn/games/memory', imageHint: 'brain puzzle' },
  { id: '5', title: 'Pattern Pals', description: 'Complete the sequence by finding the missing pattern!', IconName: 'ListChecks', href: '/learn/games/patterns', imageHint: 'pattern sequence' },
  { id: '6', title: 'Traffic Rules', description: 'Learn and test your knowledge of traffic rules!', IconName: 'Car', href: '/learn/games/traffic', imageHint: 'traffic light and car' },
  { id: '7', title: 'Escape the Dog', description: 'Use your voice to help the human escape the dog!', IconName: 'Running', href: '/learn/games/escape', imageHint: 'human running from dog' },
  { id: '8', title: 'Bubble Blaster IO', description: 'Control your bubble and shoot colorful enemies in this .io style game!', IconName: 'CircleDot', href: '/learn/games/io-game', imageHint: 'colorful bubbles' },
];

export type Story = {
  id: string;
  title: string;
  category: string;
  content: string; // Full story text for quiz generation
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  // audioUrl: string; // Placeholder
};

export const stories: Story[] = [
  { 
    id: '1', 
    title: 'The Brave Little Squirrel', 
    category: 'Animals', 
    excerpt: 'Follow Squeaky on an adventure to find the legendary Golden Acorn!',
    content: "Once upon a time, in a lush green forest, lived a little squirrel named Squeaky. Squeaky was known for his fluffy tail and adventurous spirit. One day, an old owl told him about the legendary Golden Acorn, hidden deep within the Whispering Woods. The acorn was said to grant a wish to whoever found it. Squeaky, dreaming of an endless supply of nuts, decided to embark on this perilous journey. He faced roaring rivers, climbed towering trees, and outsmarted a grumpy badger. Finally, after many days, he found the Golden Acorn shimmering under a waterfall. But instead of wishing for nuts, Squeaky wished for the forest to always be a safe and happy home for all its creatures. His selfless wish made him the true hero of the Whispering Woods.",
    imageUrl: 'https://picsum.photos/seed/squirrel/300/200',
    imageHint: 'brave squirrel'
  },
  { 
    id: '2', 
    title: 'The Magical Paintbrush', 
    category: 'Fantasy', 
    excerpt: 'Lily discovers a paintbrush that brings her drawings to life!',
    content: "Lily loved to draw. She drew colourful birds, sparkling stars, and friendly dragons. One sunny afternoon, while exploring her grandmother's attic, she found an old wooden box. Inside, lay a single paintbrush with bristles that shimmered like a rainbow. Curious, Lily dipped it in her paints and drew a blue butterfly. To her amazement, the butterfly fluttered off the page and danced around her room! The paintbrush was magical! Lily used her new gift wisely, painting beautiful flowers for her garden, creating playful puppies for lonely children, and even painting a bridge to help lost ducklings cross a stream. She learned that with great power comes great responsibility, and used her magical paintbrush to spread joy and kindness.",
    imageUrl: 'https://picsum.photos/seed/paintbrush/300/200',
    imageHint: 'magical paintbrush'
  },
];

export type SafetyScenario = {
  id: string;
  title: string;
  scenario: string;
  isGoodTouch: boolean; // Simplified for now
  explanation: string;
  imageHint: string;
};

export const safetyScenarios: SafetyScenario[] = [
  { 
    id: '1', 
    title: 'A Hug from Mom', 
    scenario: 'Mommy gives you a warm hug when you wake up.', 
    isGoodTouch: true, 
    explanation: 'Hugs from family members who love you are usually good touches. They make you feel safe and loved.',
    imageHint: 'mother child hug'
  },
  { 
    id: '2', 
    title: 'Stranger Offers Candy', 
    scenario: 'Someone you don\'t know offers you candy at the park and asks you to go with them.', 
    isGoodTouch: false, 
    explanation: 'It\'s not safe to take things from strangers or go anywhere with them. Always tell a trusted adult if this happens. This is a tricky situation and a "No, Go, Tell" moment.',
    imageHint: 'stranger child park'
  },
  { 
    id: '3', 
    title: 'Doctor\'s Check-up', 
    scenario: 'A doctor needs to check your tummy when you are sick, and your parent is with you.', 
    isGoodTouch: true, // Context dependent, but generally okay for medical reasons with parent present
    explanation: 'Sometimes doctors or nurses need to touch you to help you stay healthy. It\'s okay if your parent or a trusted adult is there and explains it to you.',
    imageHint: 'doctor child patient'
  }
];

export type VideoLesson = {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  description: string;
};

export const videoLessons: VideoLesson[] = [
  {
    id: 'professions',
    title: 'Profession Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1BzvvYvw9JbH6uGtsGZgCqKYIj4cpArQu/preview',
    thumbnailUrl: '/thumbnails/professions.jpg',
    category: 'Careers',
    description: 'Discover different professions and what they do!'
  },
  {
    id: 'numbers',
    title: 'Numbers for Kids',
    videoUrl: 'https://drive.google.com/file/d/1k_c7KtAx0D1570SLfuBHhJ2oq9mNNP82/preview',
    thumbnailUrl: '/thumbnails/numbers.jpg',
    category: 'Math',
    description: 'Count and learn numbers in a fun way!'
  },
  {
    id: 'fruits',
    title: 'Fruits Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1WId_Oq5-XfiRcs-7hbl4XPv3TYP44bRR/preview',
    thumbnailUrl: '/thumbnails/fruits.jpg',
    category: 'Food',
    description: 'Learn about different fruits and their names!'
  },
  {
    id: 'colors',
    title: 'Colours For Kids',
    videoUrl: 'https://drive.google.com/file/d/1jLJIYul5CTvZK8aT8wBNuUOFCz-subT9/preview',
    thumbnailUrl: '/thumbnails/colors.jpg',
    category: 'Colors',
    description: 'Explore the wonderful world of colors!'
  },
  {
    id: 'animals',
    title: 'Animal Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1GKfhSnT_vWMapzefZx46sHQgwtpcyloS/preview',
    thumbnailUrl: '/thumbnails/animals.jpg',
    category: 'Animals',
    description: 'Discover different animals and their names!'
  },
  {
    id: 'alphabets',
    title: 'Alphabets for Kids',
    videoUrl: 'https://drive.google.com/file/d/1PbSh_h1fJB-PUYRad0RBJNgXVZrsc3oH/preview',
    thumbnailUrl: '/thumbnails/alphabets.jpg',
    category: 'Language',
    description: 'Learn the alphabet with fun animations and sounds!'
  },
  {
    id: 'body-parts',
    title: 'Body Parts Names For Kids',
    videoUrl: 'https://drive.google.com/file/d/1TNGONqC5Tbv0S7iXQtINWIwLHt8hV4BT/view?usp=sharing',
    thumbnailUrl: '/thumbnails/body-parts.jpg',
    category: 'Body',
    description: 'Learn about different parts of the body!'
  },
  {
    id: 'relationships',
    title: 'Relationships Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1Nj2x6APd_DFKQSmua-ptE4o-z0EOLSvV/preview',
    thumbnailUrl: '/thumbnails/relationships.jpg',
    category: 'Family',
    description: 'Learn about family relationships and names!'
  },
  {
    id: 'shapes',
    title: 'Shapes for Kids',
    videoUrl: 'https://drive.google.com/file/d/1QMYVE0-oQBZgVC8cvRrU1yg3atj3WobW/preview',
    thumbnailUrl: '/thumbnails/shapes.jpg',
    category: 'Math',
    description: 'Explore different shapes and their properties!'
  },
  {
    id: 'sports',
    title: 'Sports Names For Kids',
    videoUrl: 'https://drive.google.com/file/d/1rcafYWFhELOZXyTVP5OJU07Cn5RKW_G4/preview',
    thumbnailUrl: '/thumbnails/sports.jpg',
    category: 'Sports',
    description: 'Learn about different sports and activities!'
  },
  {
    id: 'stationary',
    title: 'Stationary Items for Kids',
    videoUrl: 'https://drive.google.com/file/d/1bd3IrFj0-2UarfFHZD90gIKoWg-z2AFi/preview',
    thumbnailUrl: '/thumbnails/stationary.jpg',
    category: 'School',
    description: 'Discover different school supplies and their uses!'
  },
  {
    id: 'things',
    title: 'Things Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1GQPXaqBOhx3cF6FxQlPXVJ6mR6e4b8eu/preview',
    thumbnailUrl: '/thumbnails/things.jpg',
    category: 'Objects',
    description: 'Learn about everyday objects and their names!'
  },
  {
    id: 'vegetables',
    title: 'Vegetables Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1giTyahbq7leWFbQF5vxPS92lqwIGKObN/preview',
    thumbnailUrl: '/thumbnails/vegetables.jpg',
    category: 'Food',
    description: 'Explore different vegetables and their names!'
  },
  {
    id: 'vehicles',
    title: 'Vehicles Names',
    videoUrl: 'https://drive.google.com/file/d/10GnaOS3iYoviEoYncCyog1C1ExDhTbsn/preview',
    thumbnailUrl: '/thumbnails/vehicles.jpg',
    category: 'Transportation',
    description: 'Learn about different vehicles and their uses!'
  }
];

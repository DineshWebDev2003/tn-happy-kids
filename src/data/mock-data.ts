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
  { id: '6', title: 'Traffic Safety Heroes', description: 'Navigate roads safely! Learn traffic signs, road rules, and become a safety champion!', IconName: 'Car', href: '/learn/games/traffic', imageHint: 'traffic light and car' },
  { id: '7', title: 'Word Explorer', description: 'Learn new words and build vocabulary through fun word games!', IconName: 'BookOpen', href: '/learn/games/words', imageHint: 'book and letters' }
];

export type Story = {
  id: string;
  title: string;
  titleTamil?: string; // Tamil title
  category: string;
  content: string; // Full story text for quiz generation
  contentTamil?: string; // Tamil version of the story
  excerpt: string;
  excerptTamil?: string; // Tamil excerpt
  imageUrl: string;
  imageHint: string;
  moral?: string; // The moral of the story
  moralTamil?: string; // Tamil version of the moral
  // audioUrl: string; // Placeholder
};

export const stories: Story[] = [
  // Honesty Category
  { 
    id: '1', 
    title: 'The Boy Who Cried Wolf', 
    titleTamil: 'ஓநாய் வருகிறது என்று பொய் சொன்ன சிறுவன்',
    category: 'Honesty',
    excerpt: 'A shepherd boy learns why telling lies is harmful.',
    excerptTamil: 'பொய் சொல்வது ஏன் தீங்கு என்பதை ஒரு இடையன் சிறுவன் கற்றுக்கொள்கிறான்.',
    content: "Once upon a time, there was a shepherd boy who watched his flock of sheep near a village. He would often get bored while watching the sheep. One day, he thought of a plan to get some excitement. He cried out loudly, 'Wolf! Wolf! A wolf is chasing the sheep!' The villagers heard his cries and rushed to help him. But when they arrived, they found no wolf, only the boy laughing at them. The boy played this trick several times, and each time the villagers came running to help him. One day, a real wolf actually came. The boy cried out, 'Wolf! Wolf!' But the villagers thought he was playing the same trick again and didn't come to help. The wolf attacked the flock and ate many sheep. The boy learned a valuable lesson that day about the importance of telling the truth.",
    contentTamil: "ஒரு காலத்தில், ஒரு கிராமத்திற்கு அருகில் தனது ஆடுகளை மேய்த்துக் கொண்டிருந்த ஒரு இடையன் சிறுவன் இருந்தான். ஆடுகளைப் பார்த்துக்கொண்டிருக்கும்போது அவனுக்கு அடிக்கடி சலிப்பு ஏற்படும். ஒரு நாள், சற்று உற்சாகம் பெற ஒரு திட்டம் நினைத்தான். அவன் உரக்க கத்தினான், 'ஓநாய்! ஓநாய்! ஓநாய் ஆடுகளைத் துரத்துகிறது!' கிராமத்தினர் அவனது அலறலைக் கேட்டு அவனுக்கு உதவ ஓடி வந்தனர். ஆனால் அவர்கள் வந்தபோது, ஓநாய் எதுவும் இல்லை, அவர்களைப் பார்த்து சிரித்துக்கொண்டிருந்த சிறுவனை மட்டுமே கண்டனர். சிறுவன் இந்த விளையாட்டை பல முறை விளையாடினான், ஒவ்வொரு முறையும் கிராமத்தினர் அவனுக்கு உதவ ஓடி வந்தனர். ஒரு நாள், உண்மையிலேயே ஒரு ஓநாய் வந்தது. சிறுவன், 'ஓநாய்! ஓநாய்!' என்று கத்தினான். ஆனால் கிராமத்தினர் அவன் மீண்டும் அதே விளையாட்டை விளையாடுகிறான் என்று நினைத்து உதவ வரவில்லை. ஓநாய் மந்தையைத் தாக்கி பல ஆடுகளை தின்றது. உண்மையைச் சொல்வதன் முக்கியத்துவத்தைப் பற்றி அன்று சிறுவன் ஒரு மதிப்புமிக்க பாடத்தைக் கற்றுக்கொண்டான்.",
    imageUrl: '/stories/wolf_scene1.jpg',
    imageHint: 'shepherd boy crying wolf',
    moral: "Honesty is the best policy. Nobody believes a liar, even when they tell the truth.",
    moralTamil: "நேர்மையே சிறந்த கொள்கை. பொய்யர் உண்மையைச் சொன்னாலும் யாரும் நம்ப மாட்டார்கள்."
  },
  
  // Kindness Category
  { 
    id: '2', 
    title: 'The Lion and the Mouse', 
    titleTamil: 'சிங்கமும் எலியும்',
    category: 'Kindness',
    excerpt: 'A tiny mouse helps a mighty lion, proving that kindness comes back in unexpected ways.',
    excerptTamil: 'ஒரு சிறிய எலி வலிமையான சிங்கத்திற்கு உதவி, கருணை எதிர்பாராத வழிகளில் திரும்பி வரும் என்பதை நிரூபிக்கிறது.',
    content: "In a dense forest, a mighty lion was sleeping peacefully when a tiny mouse accidentally scurried across his paw. The lion woke up with a loud roar and caught the mouse with his paw. 'How dare you disturb my sleep!' the lion growled. 'Please spare my life, Your Majesty,' pleaded the mouse. 'I didn't mean to wake you. If you let me go, I promise to help you someday.' The lion laughed at the thought of such a tiny creature helping him, but he was feeling generous, so he released the mouse. A few days later, the lion was captured by hunters who tied him to a tree with strong ropes while they went to get their wagon. The mouse heard the lion's roars and came running. Using its sharp teeth, the mouse gnawed through the ropes and set the lion free. 'You see,' said the mouse, 'even a little friend can be a great friend.' The lion learned that kindness given is kindness returned, regardless of size or strength.",
    contentTamil: "அடர்ந்த காட்டில், ஒரு வலிமையான சிங்கம் அமைதியாக தூங்கிக்கொண்டிருந்தபோது, ஒரு சிறிய எலி தற்செயலாக அதன் கால்மேல் ஓடியது. சிங்கம் உரத்த கர்ஜனையுடன் எழுந்து, எலியை தன் கால்களால் பிடித்தது. 'என் தூக்கத்தைக் கலைக்க எப்படி துணிந்தாய்!' என்று சிங்கம் முணுமுணுத்தது. 'என் உயிரை மன்னிக்கவும், மன்னரே,' என்று எலி வேண்டியது. 'நான் உங்களை எழுப்ப விரும்பவில்லை. நீங்கள் என்னை விட்டுவிட்டால், ஒரு நாள் உங்களுக்கு உதவுவேன் என்று உறுதியளிக்கிறேன்.' இத்தகைய சிறிய உயிரினம் தனக்கு உதவும் என்ற எண்ணத்தில் சிங்கம் சிரித்தது, ஆனால் அது தாராள மனதுடன் இருந்ததால், எலியை விடுவித்தது. சில நாட்களுக்குப் பிறகு, வேட்டைக்காரர்கள் சிங்கத்தைப் பிடித்து, தங்கள் வண்டியைக் கொண்டு வரச் சென்றபோது வலுவான கயிறுகளால் ஒரு மரத்தில் கட்டி வைத்தனர். சிங்கத்தின் கர்ஜனைகளைக் கேட்ட எலி ஓடி வந்தது. தனது கூர்மையான பற்களைப் பயன்படுத்தி, எலி கயிறுகளை கடித்து சிங்கத்தை விடுவித்தது. 'பாருங்கள்,' என்றது எலி, 'ஒரு சிறிய நண்பர் கூட ஒரு பெரிய நண்பராக இருக்கலாம்.' அளவு அல்லது வலிமையைப் பொருட்படுத்தாமல், கருணை கொடுப்பது கருணை திரும்புவது என்பதை சிங்கம் கற்றுக்கொண்டது.",
    imageUrl: 'https://picsum.photos/seed/lionmouse/300/200',
    imageHint: 'lion and mouse friends',
    moral: "No act of kindness, no matter how small, is ever wasted. Even the strongest can sometimes need help from the weakest.",
    moralTamil: "எவ்வளவு சிறியதாக இருந்தாலும், கருணையின் செயல் எப்போதும் வீணாகாது. மிகவும் வலிமையானவர்களுக்கும் கூட சில நேரங்களில் பலவீனமானவர்களிடமிருந்து உதவி தேவைப்படலாம்."
  },
  
  // Wisdom Category
  { 
    id: '3', 
    title: 'The Wise Old Turtle', 
    titleTamil: 'ஞானமுள்ள முதிய ஆமை',
    category: 'Wisdom',
    excerpt: 'A village learns an important lesson about patience and wisdom from an old turtle.',
    excerptTamil: 'ஒரு கிராமம் ஒரு வயதான ஆமையிடமிருந்து பொறுமை மற்றும் ஞானம் பற்றிய முக்கியமான பாடத்தைக் கற்றுக்கொள்கிறது.',
    content: "There was once a village suffering from a long drought. The crops were failing, and the villagers were worried. They decided to seek advice from the Wise Old Turtle who lived on a distant hill. Three young villagers volunteered for the journey. The first one was impatient and ran all the way, but got exhausted and returned without reaching the turtle. The second was distracted by berries and flowers along the path and also failed to reach the destination. The third walked steadily, observing the path, resting when needed, and eventually reached the turtle's home. The Wise Old Turtle told him, 'The solution to your drought is beneath your village. Dig deep wells, and you will find water.' When the young man returned with this advice, the villagers worked together to dig wells and indeed found water. They learned that wisdom comes to those who approach challenges with patience and steady determination.",
    contentTamil: "ஒரு முறை, நீண்ட வறட்சியால் ஒரு கிராமம் அவதிப்பட்டது. பயிர்கள் தோல்வியடைந்தன, கிராமத்தினர் கவலைப்பட்டனர். தொலைதூர மலையில் வசித்த ஞானமுள்ள முதிய ஆமையிடம் ஆலோசனை தேட அவர்கள் முடிவு செய்தனர். மூன்று இளம் கிராமவாசிகள் பயணத்திற்கு தன்னார்வலர்களாக முன்வந்தனர். முதலாமவர் பொறுமையற்றவராக இருந்தார், முழு வழியும் ஓடினார், ஆனால் களைப்படைந்து ஆமையை அடையாமலேயே திரும்பினார். இரண்டாவது நபர் பாதையில் உள்ள பழங்கள் மற்றும் பூக்களால் கவனம் சிதறி, இலக்கை அடைய தவறினார். மூன்றாமவர் நிதானமாக நடந்து, பாதையை கவனித்து, தேவைப்படும்போது ஓய்வெடுத்து, இறுதியில் ஆமையின் வீட்டை அடைந்தார். ஞானமுள்ள முதிய ஆமை அவரிடம், 'உங்கள் வறட்சிக்கான தீர்வு உங்கள் கிராமத்தின் கீழே உள்ளது. ஆழமான கிணறுகளை தோண்டுங்கள், நீங்கள் தண்ணீரைக் காண்பீர்கள்' என்றது. இந்த ஆலோசனையுடன் இளைஞர் திரும்பி வந்தபோது, கிராமத்தினர் ஒன்றிணைந்து கிணறுகளைத் தோண்டி உண்மையிலேயே தண்ணீரைக் கண்டனர். அவர்கள் ஞானம் என்பது சவால்களை பொறுமையுடனும் நிலையான உறுதியுடனும் அணுகுபவர்களுக்கு வரும் என்பதைக் கற்றுக்கொண்டனர்.",
    imageUrl: 'https://picsum.photos/seed/wiseturtle/300/200',
    imageHint: 'wise old turtle',
    moral: "Patience and perseverance lead to wisdom and success. Rushing or getting distracted can prevent us from finding solutions.",
    moralTamil: "பொறுமையும் விடாமுயற்சியும் ஞானத்திற்கும் வெற்றிக்கும் வழிவகுக்கும். அவசரப்படுவது அல்லது கவனம் சிதறுவது தீர்வுகளைக் கண்டுபிடிப்பதைத் தடுக்கலாம்."
  },
  
  // Friendship Category
  { 
    id: '4', 
    title: 'The Two Friends and the Bear', 
    titleTamil: 'இரண்டு நண்பர்களும் கரடியும்',
    category: 'Friendship',
    excerpt: 'A story about true friendship and loyalty during times of danger.',
    excerptTamil: 'ஆபத்து நேரத்தில் உண்மையான நட்பு மற்றும் விசுவாசம் பற்றிய கதை.',
    content: "Two friends, Ravi and Kumar, were walking through a forest when they suddenly saw a huge bear approaching them. Terrified, Kumar quickly climbed a nearby tree, completely forgetting about his friend. Ravi knew he couldn't outrun the bear, so he lay down on the ground, held his breath, and played dead. The bear came near him, sniffed around his face, and whispered something in his ear before walking away. When the bear was gone, Kumar climbed down and asked, 'What did the bear whisper in your ear?' Ravi replied, 'The bear told me to be careful of friends who abandon you in times of danger.' From that day, Ravi was more careful about who he considered a true friend. He understood that real friendship is tested in times of adversity.",
    contentTamil: "ரவி மற்றும் குமார் என்ற இரண்டு நண்பர்கள் ஒரு காட்டில் நடந்து கொண்டிருந்தபோது, திடீரென்று ஒரு பெரிய கரடி தங்களை நோக்கி வருவதைப் பார்த்தனர். பயந்துபோன குமார், தனது நண்பரை முற்றிலும் மறந்து, விரைவாக அருகிலுள்ள மரத்தில் ஏறினார். ரவிக்கு தான் கரடியை விட வேகமாக ஓட முடியாது என்பது தெரியும், எனவே அவர் தரையில் படுத்து, மூச்சை நிறுத்தி, இறந்தவர் போல் நடித்தார். கரடி அவருக்கு அருகில் வந்து, அவரது முகத்தைச் சுற்றி மோந்து பார்த்து, விலகிச் செல்வதற்கு முன்பு அவரது காதில் ஏதோ கிசுகிசுத்தது. கரடி சென்றபிறகு, குமார் கீழே இறங்கி, 'கரடி உன் காதில் என்ன கிசுகிசுத்தது?' என்று கேட்டார். ரவி பதிலளித்தார், 'ஆபத்து நேரத்தில் உன்னைக் கைவிடும் நண்பர்களைப் பற்றி எச்சரிக்கையாக இருக்குமாறு கரடி என்னிடம் கூறியது.' அன்று முதல், ரவி தன்னை உண்மையான நண்பராகக் கருதியவர்களைப் பற்றி மிகவும் எச்சரிக்கையாக இருந்தார். அவர் புரிந்துகொண்டார், உண்மையான நட்பு என்பது கடினமான நேரங்களில் சோதிக்கப்படுகிறது.",
    imageUrl: 'https://picsum.photos/seed/bearfriends/300/200',
    imageHint: 'bear and man in forest',
    moral: "True friends stand by each other in times of need. Fair-weather friends disappear when difficulties arise.",
    moralTamil: "உண்மையான நண்பர்கள் தேவைப்படும் நேரத்தில் ஒருவருக்கொருவர் ஆதரவாக இருப்பார்கள். வெயில் நேர நண்பர்கள் கஷ்டம் வரும்போது மறைந்து விடுவார்கள்."
  },
  
  // Perseverance Category
  { 
    id: '5', 
    title: 'The Persistent Spider', 
    titleTamil: 'விடாமுயற்சியுடைய சிலந்தி',
    category: 'Perseverance',
    excerpt: 'A spider teaches a king about never giving up, despite repeated failures.',
    excerptTamil: 'தொடர்ந்து தோல்விகள் இருந்தபோதிலும், ஒருபோதும் விட்டுக்கொடுக்காதது பற்றி ஒரு சிலந்தி ஒரு அரசருக்குக் கற்பிக்கிறது.',
    content: "King Anand was feeling discouraged after losing an important battle. While resting in a cave, he noticed a tiny spider trying to build its web. Each time the spider would climb up, it would fall, but it kept trying again and again. The king counted - the spider fell seven times but on the eighth attempt, it successfully reached its destination and began weaving its web. Watching this persistent little creature, the king felt inspired. He thought, 'If this tiny spider doesn't give up despite failing seven times, why should I?' He returned to his kingdom with renewed determination, gathered his forces, and strategized more carefully. In the next battle, he emerged victorious, always remembering the lesson of the persistent spider that taught him to never give up.",
    contentTamil: "அனந்த் ராஜா ஒரு முக்கியமான போரில் தோற்றபின் மனச்சோர்வடைந்தார். ஒரு குகையில் ஓய்வெடுக்கும்போது, தனது வலையை உருவாக்க முயற்சிக்கும் ஒரு சிறிய சிலந்தியைக் கவனித்தார். சிலந்தி ஒவ்வொரு முறை மேலே ஏறும்போதும், அது கீழே விழும், ஆனால் அது மீண்டும் மீண்டும் முயற்சித்துக் கொண்டே இருந்தது. ராஜா எண்ணினார் - சிலந்தி ஏழு முறை விழுந்தது, ஆனால் எட்டாவது முயற்சியில், அது வெற்றிகரமாக தனது இலக்கை அடைந்து, வலையை நெய்யத் தொடங்கியது. இந்த விடாமுயற்சியுடைய சிறிய உயிரினத்தைப் பார்த்து, ராஜா ஊக்கமடைந்தார். அவர் நினைத்தார், 'இந்த சிறிய சிலந்தி ஏழு முறை தோல்வியடைந்தும் கூட விட்டுக்கொடுக்கவில்லை என்றால், நான் ஏன் விட்டுக்கொடுக்க வேண்டும்?' அவர் புதுப்பித்த உறுதியுடன் தனது அரசாட்சிக்குத் திரும்பி, தனது படைகளைத் திரட்டி, மிகக் கவனமாக திட்டமிட்டார். அடுத்த போரில், அவர் வெற்றி பெற்றார், ஒருபோதும் விட்டுக்கொடுக்கக்கூடாது என்று கற்பித்த விடாமுயற்சியுடைய சிலந்தியின் பாடத்தை எப்போதும் நினைவில் கொண்டார்.",
    imageUrl: 'https://picsum.photos/seed/persistentspider/300/200',
    imageHint: 'spider weaving web',
    moral: "Success comes to those who keep trying. Failure is not falling down but refusing to get up.",
    moralTamil: "தொடர்ந்து முயற்சிப்பவர்களுக்கே வெற்றி வரும். தோல்வி என்பது விழுவது அல்ல, எழ மறுப்பது."
  },
  
  // Sharing Category
  { 
    id: '6', 
    title: 'The Rainbow Fish', 
    titleTamil: 'வானவில் மீன்',
    category: 'Sharing',
    excerpt: 'A beautiful fish learns that sharing brings more happiness than possessions.',
    excerptTamil: 'அழகான மீன் ஒன்று பகிர்தல் உடைமைகளை விட அதிக மகிழ்ச்சியைக் கொண்டுவரும் என்பதைக் கற்றுக்கொள்கிறது.',
    content: "In the deep blue ocean lived a fish whose scales were every shade of blue, green, and purple with sparkling silver scales scattered among them. The other fish called him Rainbow Fish and admired his beautiful scales. But Rainbow Fish was proud and would not play with the other fish. One day, a small blue fish asked if he could have one of his sparkling scales. 'Give you one of my special scales? Never!' said Rainbow Fish and swam away. Soon, all the other fish avoided him. Feeling lonely, Rainbow Fish sought advice from the wise octopus. 'The only way to be happy is to share your beauty with others,' the octopus advised. At first, Rainbow Fish hesitated, but then he gave away one shining scale to the small blue fish, who was delighted. Soon, other fish came asking for scales, and Rainbow Fish shared them until he had only one sparkling scale left. As he shared, he found that the joy of friendship and seeing others happy made him feel much better than having all his scales to himself.",
    contentTamil: "ஆழமான நீல கடலில் ஒரு மீன் வாழ்ந்தது, அதன் செதில்கள் நீலம், பச்சை மற்றும் ஊதா நிறத்தின் ஒவ்வொரு நிழலாகவும், அவற்றுக்கிடையே பளபளக்கும் வெள்ளி செதில்கள் சிதறியிருந்தன. மற்ற மீன்கள் அதை வானவில் மீன் என்று அழைத்து, அதன் அழகிய செதில்களை வியந்தன. ஆனால் வானவில் மீன் கர்வமாக இருந்தது மற்றும் மற்ற மீன்களுடன் விளையாட மாட்டேன் என்றது. ஒரு நாள், ஒரு சிறிய நீல மீன் அதன் பளபளக்கும் செதில்களில் ஒன்றை தனக்குத் தர முடியுமா என்று கேட்டது. 'எனது சிறப்பு செதில்களில் ஒன்றை உனக்குத் தர வேண்டுமா? ஒருபோதும் இல்லை!' என்று வானவில் மீன் கூறி நீந்திச் சென்றது. விரைவில், மற்ற மீன்கள் அனைத்தும் அதைத் தவிர்த்தன. தனிமையாக உணர்ந்த வானவில் மீன் ஞானமான ஆக்டோபஸிடம் ஆலோசனை தேடியது. 'மகிழ்ச்சியாக இருப்பதற்கான ஒரே வழி உங்கள் அழகை மற்றவர்களுடன் பகிர்ந்து கொள்வதுதான்,' என்று ஆக்டோபஸ் அறிவுறுத்தியது. முதலில், வானவில் மீன் தயங்கியது, ஆனால் பின்னர் அது தனது ஒளிரும் செதில்களில் ஒன்றை சிறிய நீல மீனுக்கு கொடுத்தது, அது மகிழ்ச்சியாக இருந்தது. விரைவில், மற்ற மீன்கள் செதில்களைக் கேட்டு வந்தன, மற்றும் வானவில் மீன் அவற்றை பகிர்ந்து கொண்டது, இறுதியில் அதனிடம் ஒரு பளபளக்கும் செதில் மட்டுமே இருந்தது. அது பகிர்ந்து கொண்டபோது, நட்பின் மகிழ்ச்சி மற்றும் மற்றவர்கள் மகிழ்ச்சியாக இருப்பதைக் காண்பது அதன் அனைத்து செதில்களையும் தனக்காக வைத்திருப்பதை விட அதிக மகிழ்ச்சியைத் தருவதை அது கண்டது.",
    imageUrl: 'https://picsum.photos/seed/rainbowfish/300/200',
    imageHint: 'colorful fish sharing scales',
    moral: "Sharing brings more happiness than possessing things for yourself. True joy comes from making others happy.",
    moralTamil: "உங்களுக்காக பொருட்களை வைத்திருப்பதை விட பகிர்வது அதிக மகிழ்ச்சியைத் தருகிறது. உண்மையான மகிழ்ச்சி மற்றவர்களை மகிழ்ச்சியாக்குவதில் இருந்து வருகிறது."
  },
  
  // Gratitude Category
  { 
    id: '7', 
    title: 'The Magic Thank You', 
    titleTamil: 'மாய நன்றி',
    category: 'Gratitude',
    excerpt: 'A young girl discovers the transformative power of expressing gratitude to everyone around her.',
    excerptTamil: 'ஒரு சிறுமி தன்னைச் சுற்றியுள்ள அனைவருக்கும் நன்றி தெரிவிப்பதன் மாற்றும் சக்தியைக் கண்டுபிடிக்கிறாள்.',
    content: "Meera was always grumpy and complained about everything. Her grandmother noticed this and gave her a special gift - a small notebook with a sparkling cover. 'This is a magic gratitude journal,' she explained. 'Every day, write down three things you're thankful for.' Meera was skeptical but decided to try. On the first day, she struggled to find even one thing, but wrote: 'I'm thankful for my favorite blue dress.' The next day, she wrote: 'I'm thankful for the delicious lunch and the rain that cooled the day.' As days passed, Meera began noticing more and more things to be grateful for - the smile of the bus driver, the help from her classmate, the beautiful flowers on her way to school. She also started saying 'thank you' to people more often. Gradually, something magical happened. People smiled at her more, offered help willingly, and seemed happier around her. Meera realized that gratitude wasn't just about writing in a journal - it was changing how she saw the world and how the world responded to her. Her life felt more joyful, and her grandmother smiled knowingly, for the real magic wasn't in the notebook but in Meera's changed heart.",
    contentTamil: "மீரா எப்போதும் சிடுசிடுப்பாக இருப்பாள் மற்றும் எல்லாவற்றையும் குறித்து புகார் செய்வாள். அவளது பாட்டி இதைக் கவனித்து அவளுக்கு ஒரு சிறப்பு பரிசு - பளபளக்கும் அட்டை கொண்ட ஒரு சிறிய நோட்புக்கை கொடுத்தார். 'இது ஒரு மந்திர நன்றி நாட்குறிப்பு,' என்று அவர் விளக்கினார். 'ஒவ்வொரு நாளும், நீ நன்றி சொல்லும் மூன்று விஷயங்களை எழுது.' மீரா சந்தேகமாக இருந்தாள் ஆனால் முயற்சிக்க முடிவு செய்தாள். முதல் நாளில், அவள் ஒரு விஷயத்தைக் கூட கண்டுபிடிக்க போராடினாள், ஆனால் எழுதினாள்: 'எனது விருப்பமான நீல ஆடைக்காக நான் நன்றியுள்ளவனாக இருக்கிறேன்.' அடுத்த நாள், அவள் எழுதினாள்: 'சுவையான மதிய உணவுக்கும், நாளைக் குளிர்வித்த மழைக்கும் நான் நன்றியுள்ளவனாக இருக்கிறேன்.' நாட்கள் சென்றதும், மீரா நன்றி தெரிவிக்க இன்னும் பல விஷயங்களைக் கவனிக்கத் தொடங்கினாள் - பேருந்து ஓட்டுநரின் புன்னகை, அவளது வகுப்பு தோழியின் உதவி, பள்ளிக்குச் செல்லும் வழியில் உள்ள அழகான பூக்கள். அவள் மக்களுக்கு அடிக்கடி 'நன்றி' சொல்லத் தொடங்கினாள். படிப்படியாக, ஏதோ மாயம் நடந்தது. மக்கள் அவளுக்கு அதிகமாக புன்னகைத்தனர், விருப்பத்துடன் உதவியை வழங்கினர், மற்றும் அவளைச் சுற்றி மகிழ்ச்சியாக இருப்பதாகத் தோன்றினர். மீரா உணர்ந்தாள், நன்றி என்பது வெறும் நாட்குறிப்பில் எழுதுவது மட்டுமல்ல - அது அவள் உலகைப் பார்க்கும் விதத்தையும், உலகம் அவளுக்கு பதிலளிக்கும் விதத்தையும் மாற்றிக்கொண்டிருந்தது. அவளது வாழ்க்கை மகிழ்ச்சியாக இருந்தது, மற்றும் அவளது பாட்டி அறிந்து புன்னகைத்தார், ஏனெனில் உண்மையான மாயம் நோட்புக்கில் இல்லை, மாறாக மீராவின் மாறிய இதயத்தில் இருந்தது.",
    imageUrl: 'https://picsum.photos/seed/gratitude/300/200',
    imageHint: 'girl writing in gratitude journal',
    moral: "Expressing gratitude can transform your perspective and relationships. Being thankful for what you have brings more joy into your life.",
    moralTamil: "நன்றி தெரிவிப்பது உங்கள் கண்ணோட்டத்தையும் உறவுகளையும் மாற்றக்கூடும். உங்களிடம் இருப்பதற்கு நன்றியுள்ளவராக இருப்பது உங்கள் வாழ்க்கையில் அதிக மகிழ்ச்சியைக் கொண்டு வரும்."
  },
  
  // Respect Category
  { 
    id: '8', 
    title: 'The Elephant and the Ant Colony', 
    titleTamil: 'யானையும் எறும்பு குடியும்',
    category: 'Respect',
    excerpt: 'An elephant learns to respect all creatures, regardless of their size.',
    excerptTamil: 'ஒரு யானை அனைத்து உயிரினங்களையும், அவற்றின் அளவைப் பொருட்படுத்தாமல் மதிக்கக் கற்றுக்கொள்கிறது.',
    content: "Gaja was a young elephant who was proud of his size and strength. One day, while strolling through the forest, he noticed a busy ant colony. 'Look at these tiny insects, so insignificant and small!' he laughed, deliberately stomping near their anthill. The ants scattered in fear, but their wise queen remained calm. That night, as Gaja slept, the ant queen led her colony to gather around the elephant. When Gaja woke the next morning, he found himself surrounded by thousands of ants, each carrying a tiny leaf. The queen spoke: 'Mighty elephant, you may crush one of us easily, but together we are strong. Just as you care for your herd, we care for ours. Size doesn't determine worth.' Impressed by their unity and courage, Gaja apologized. In the following days, when hunters came to the forest, it was the ant colony that warned Gaja, allowing him to escape. From that day forward, Gaja treated all creatures with respect, understanding that every being, no matter how small, plays an important role in the world.",
    contentTamil: "கஜா என்னும் இளம் யானை தனது அளவு மற்றும் வலிமையைப் பற்றி பெருமைப்பட்டது. ஒரு நாள், காட்டில் உலாவும்போது, அவன் ஒரு பரபரப்பான எறும்பு குடியைக் கவனித்தான். 'இந்த சிறிய பூச்சிகளைப் பாருங்கள், அற்பமானவை, சிறியவை!' என்று அவன் சிரித்தான், வேண்டுமென்றே அவர்களின் புற்றுக்கு அருகில் காலடியெடுத்து வைத்தான். எறும்புகள் பயத்தில் சிதறின, ஆனால் அவற்றின் ஞானமுள்ள ராணி அமைதியாக இருந்தாள். அன்று இரவு, கஜா தூங்கும்போது, எறும்பு ராணி தனது குடியை யானையைச் சுற்றி கூட வழிநடத்தினாள். கஜா மறுநாள் காலை எழுந்தபோது, தன்னைச் சுற்றி ஆயிரக்கணக்கான எறும்புகள், ஒவ்வொன்றும் ஒரு சிறிய இலையைச் சுமந்து கொண்டிருப்பதைக் கண்டான். ராணி பேசினாள்: 'சக்திவாய்ந்த யானையே, நீ எங்களில் ஒருவரை எளிதாக நசுக்கலாம், ஆனால் ஒன்றாக நாங்கள் வலிமையானவர்கள். நீ உன் மந்தையைப் பற்றி கவலைப்படுவது போல, நாங்கள் எங்கள் மந்தையைப் பற்றி கவலைப்படுகிறோம். அளவு மதிப்பை தீர்மானிக்காது.' அவர்களின் ஒற்றுமை மற்றும் தைரியத்தால் மனம் வெற்றிகொண்ட கஜா, மன்னிப்பு கேட்டான். அடுத்த நாட்களில், வேட்டைக்காரர்கள் காட்டிற்கு வந்தபோது, கஜாவை எச்சரித்தது எறும்பு குடிதான், அவன் தப்பிக்க அனுமதித்தது. அந்த நாள் முதல், கஜா அனைத்து உயிரினங்களையும் மரியாதையுடன் நடத்தினான், ஒவ்வொரு உயிரினமும், எவ்வளவு சிறியதாக இருந்தாலும், உலகில் ஒரு முக்கிய பங்கு வகிக்கிறது என்பதை புரிந்துகொண்டான்.",
    imageUrl: 'https://picsum.photos/seed/elephantants/300/200',
    imageHint: 'elephant near ant hill',
    moral: "Respect all beings, regardless of their size or appearance. Every creature has value and plays an important role in the world.",
    moralTamil: "அனைத்து உயிரினங்களையும், அவற்றின் அளவு அல்லது தோற்றத்தைப் பொருட்படுத்தாமல் மதிக்கவும். ஒவ்வொரு உயிரினமும் மதிப்புடையது மற்றும் உலகில் ஒரு முக்கிய பங்கு வகிக்கிறது."
  }
];

export type SafetyScenario = {
  id: string;
  title: string;
  scenario: string;
  isGoodTouch: boolean; // Simplified for now
  explanation: string;
  imageHint: string;
  imageUrl: string; // Local image path
};

export const safetyScenarios: SafetyScenario[] = [
  { 
    id: '1', 
    title: 'A Hug from Mom', 
    scenario: 'Mommy gives you a warm hug when you wake up.', 
    isGoodTouch: true, 
    explanation: 'Hugs from family members who love you are usually good touches. They make you feel safe and loved.',
    imageHint: 'mother child hug',
    imageUrl: '/images/safety/safe_hug.jpg'
  },
  { 
    id: '2', 
    title: 'Stranger Offers Candy', 
    scenario: 'Someone you don\'t know offers you candy at the park and asks you to go with them.', 
    isGoodTouch: false, 
    explanation: 'It\'s not safe to take things from strangers or go anywhere with them. Always tell a trusted adult if this happens. This is a tricky situation and a "No, Go, Tell" moment.',
    imageHint: 'stranger child park',
    imageUrl: '/images/safety/unsafe_stranger.jpg'
  },
  { 
    id: '3', 
    title: 'Doctor\'s Check-up', 
    scenario: 'A doctor needs to check your tummy when you are sick, and your parent is with you.', 
    isGoodTouch: true, // Context dependent, but generally okay for medical reasons with parent present
    explanation: 'Sometimes doctors or nurses need to touch you to help you stay healthy. It\'s okay if your parent or a trusted adult is there and explains it to you.',
    imageHint: 'doctor child patient',
    imageUrl: '/images/safety/safe_doctor.jpg'
  },
  {
    id: '4',
    title: 'High Five with Friend',
    scenario: 'Your friend gives you a high five after you score a goal in a game.',
    isGoodTouch: true,
    explanation: 'High fives, handshakes, and gentle pats on the back from friends are good touches that show friendship and celebration.',
    imageHint: 'children high five',
    imageUrl: '/images/safety/safe_highfive.jpg'
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
    thumbnailUrl: '/video-lessons/Profession Names for kids.png',
    category: 'Careers',
    description: 'Discover different professions and what they do!'
  },
  {
    id: 'numbers',
    title: 'Numbers for Kids',
    videoUrl: 'https://drive.google.com/file/d/1k_c7KtAx0D1570SLfuBHhJ2oq9mNNP82/preview',
    thumbnailUrl: '/video-lessons/Numbers for kids.png',
    category: 'Math',
    description: 'Count and learn numbers in a fun way!'
  },
  {
    id: 'fruits',
    title: 'Fruits Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1WId_Oq5-XfiRcs-7hbl4XPv3TYP44bRR/preview',
    thumbnailUrl: '/video-lessons/fruits names for kids.png',
    category: 'Food',
    description: 'Learn about different fruits and their names!'
  },
  {
    id: 'colors',
    title: 'Colours For Kids',
    videoUrl: 'https://drive.google.com/file/d/1jLJIYul5CTvZK8aT8wBNuUOFCz-subT9/preview',
    thumbnailUrl: '/video-lessons/colours for kids.png',
    category: 'Colors',
    description: 'Explore the wonderful world of colors!'
  },
  {
    id: 'animals',
    title: 'Animal Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1GKfhSnT_vWMapzefZx46sHQgwtpcyloS/preview',
    thumbnailUrl: '/video-lessons/animal names for kids.png',
    category: 'Animals',
    description: 'Discover different animals and their names!'
  },
  {
    id: 'alphabets',
    title: 'Alphabets for Kids',
    videoUrl: 'https://drive.google.com/file/d/1PbSh_h1fJB-PUYRad0RBJNgXVZrsc3oH/preview',
    thumbnailUrl: '/video-lessons/alphabets for kids.png',
    category: 'Language',
    description: 'Learn the alphabet with fun animations and sounds!'
  },
  {
    id: 'body-parts',
    title: 'Body Parts Names For Kids',
    videoUrl: 'https://drive.google.com/file/d/1TNGONqC5Tbv0S7iXQtINWIwLHt8hV4BT/view?usp=sharing',
    thumbnailUrl: '/video-lessons/body parts names for kids.png',
    category: 'Body',
    description: 'Learn about different parts of the body!'
  },
  {
    id: 'relationships',
    title: 'Relationships Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1Nj2x6APd_DFKQSmua-ptE4o-z0EOLSvV/preview',
    thumbnailUrl: '/video-lessons/relationships.png',
    category: 'Family',
    description: 'Learn about family relationships and names!'
  },
  {
    id: 'shapes',
    title: 'Shapes for Kids',
    videoUrl: 'https://drive.google.com/file/d/1QMYVE0-oQBZgVC8cvRrU1yg3atj3WobW/preview',
    thumbnailUrl: '/video-lessons/shapes for kids.png',
    category: 'Math',
    description: 'Explore different shapes and their properties!'
  },
  {
    id: 'sports',
    title: 'Sports Names For Kids',
    videoUrl: 'https://drive.google.com/file/d/1rcafYWFhELOZXyTVP5OJU07Cn5RKW_G4/preview',
    thumbnailUrl: '/video-lessons/sports names for kids.png',
    category: 'Sports',
    description: 'Learn about different sports and activities!'
  },
  {
    id: 'stationary',
    title: 'Stationary Items for Kids',
    videoUrl: 'https://drive.google.com/file/d/1bd3IrFj0-2UarfFHZD90gIKoWg-z2AFi/preview',
    thumbnailUrl: '/video-lessons/stationary itemes for kids.png',
    category: 'School',
    description: 'Discover different school supplies and their uses!'
  },
  {
    id: 'things',
    title: 'Things Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1GQPXaqBOhx3cF6FxQlPXVJ6mR6e4b8eu/preview',
    thumbnailUrl: '/video-lessons/objects names.png',
    category: 'Objects',
    description: 'Learn about everyday objects and their names!'
  },
  {
    id: 'vegetables',
    title: 'Vegetables Names for Kids',
    videoUrl: 'https://drive.google.com/file/d/1giTyahbq7leWFbQF5vxPS92lqwIGKObN/preview',
    thumbnailUrl: '/video-lessons/vegitable names.png',
    category: 'Food',
    description: 'Explore different vegetables and their names!'
  },
  {
    id: 'vehicles',
    title: 'Vehicles Names',
    videoUrl: 'https://drive.google.com/file/d/10GnaOS3iYoviEoYncCyog1C1ExDhTbsn/preview',
    thumbnailUrl: '/video-lessons/vehicles names.png',
    category: 'Transportation',
    description: 'Learn about different vehicles and their uses!'
  }
];

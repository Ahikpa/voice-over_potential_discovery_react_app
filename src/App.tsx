import React, { useState, createContext, useContext } from 'react';
import Question from './components/Question';
import Result from './components/Result';
import { Heart, Club, Diamond, Music, Sun, Moon } from 'lucide-react';

const questions = [
  {
    text: 'Vous avez envie d’être voix-off',
    answers: [
      { text: 'Pour le fun', type: 'club' },
      { text: 'Par passion', type: 'music' },
      { text: 'Pour en vivre', type: 'club diamond' },
      { text: 'Pour faire fortune', type: 'club' },
      { text: 'Pour ajouter une corde à votre arc', type: 'club' },
    ],
  },
  {
    text: 'Lorsque vous téléphonez à une administration pour demander quelque chose',
    answers: [
      { text: 'Vous êtes naturellement aimable et parvenez généralement à vos fins', type: 'diamond' },
      { text: 'Vous n’arrivez pas toujours à faire passer le message', type: 'club' },
      { text: 'Vous vous énervez et parfois ça marche', type: 'club' },
      { text: 'Vous prenez votre voix la plus séduisante et obtenez toujours ce que vous voulez', type: 'music' },
      { text: 'Vous bafouillez, vous cherchez vos mots ?', type: 'club club' },
    ],
  },
  {
    text: 'Vous arrive-t-il de vous amuser à « faire des voix »?',
    answers: [
      { text: 'En lisant les textes de vos shampooings sous la douche', type: 'music' },
      { text: 'En inventant des personnages rigolos pour vos enfants', type: 'music music' },
      { text: 'En faisant des canulars au téléphone', type: 'diamond music' },
      { text: 'En lisant votre journal', type: 'music' },
      { text: 'En répétant les pubs que vous entendez', type: 'music music' },
      { text: 'Vous ne le faites presque jamais, ça vous paraît un peu ridicule', type: 'club club' },
    ],
  },
  {
    text: 'Question imitation,',
    answers: [
      { text: 'Vous êtes un « guignol-né »', type: 'music' },
      { text: 'Vous êtes doué pour les accents', type: 'diamond music' },
      { text: 'Vous pouvez reproduire le son que vous voulez', type: 'music music' },
      { text: 'Ce n’est pas du tout votre truc', type: 'diamond' },
    ],
  },
  {
    text: 'On vous a dit que vous aviez une belle voix',
    answers: [
      { text: 'Souvent', type: 'music' },
      { text: 'Parfois', type: 'diamond' },
      { text: 'Jamais', type: 'club' },
    ],
  },
  {
    text: 'Vous pensez que vous avez plutôt une belle voix ?',
    answers: [
      { text: 'Oui', type: 'music' },
      { text: 'Non', type: 'club club' },
      { text: 'Vous ne savez pas', type: 'club diamond' },
      { text: 'On vous le dit souvent', type: 'music music' },
    ],
  },
  {
    text: 'Vous connaissez votre voix',
    answers: [
      { text: 'Car vous maîtrisez les techniques vocales', type: 'music' },
      { text: 'Car vous avez déjà l’habitude de vous écouter', type: 'diamond' },
      { text: 'Non, vous ne la connaissez pas très bien', type: 'club club' },
    ],
  },
  {
    text: 'Votre voix sur le répondeur,',
    answers: [
      { text: 'C’est l’horreur', type: 'club' },
      { text: 'Claire et efficace', type: 'diamond' },
      { text: 'Charmeuse et drôle', type: 'music' },
    ],
  },
  {
    text: 'Au téléphone,',
    answers: [
      { text: 'Vous vous amusez à faire des blagues', type: 'diamond diamond' },
      { text: 'Vous avez déjà réussi à séduire quelqu’un', type: 'music music' },
      { text: 'Vous détestez rester longtemps en ligne', type: 'club' },
    ],
  },
  {
    text: 'Vous avez déjà parlé dans un micro ?',
    answers: [
      { text: 'Comme animateur radio', type: 'music music' },
      { text: 'Comme présentateur ou comédien sur scène', type: 'music music' },
      { text: 'Comme chanteur', type: 'music diamond' },
      { text: 'En karaoké', type: 'diamond diamond' },
      { text: 'Presque jamais', type: 'club club' },
    ],
  },
  {
    text: 'Vous avez déjà fait des voix dans des conditions professionnelles ?',
    answers: [
      { text: 'Oui, de temps en temps', type: 'diamond diamond' },
      { text: 'Non, jamais', type: 'club' },
      { text: 'Vous ne connaissez rien au métier de voix-off', type: 'club club club' },
    ],
  },
  {
    text: 'Pourquoi pensez-vous que vous pouvez réussir dans la voix-off ?',
    answers: [
      { text: 'C’est un métier fait pour vous', type: 'diamond diamond' },
      { text: 'Vous êtes sûr de pouvoir y arriver', type: 'music diamond' },
      { text: 'Vous connaissez du monde dans ce métier', type: 'diamond music' },
      { text: 'Vous avez déjà des gens qui attendent votre maquette', type: 'music music' },
      { text: 'Vous êtes super motivé', type: 'diamond' },
    ],
  },
  {
    text: 'Vous pensez avoir un don',
    answers: [
      { text: 'Vous avez une « belle voix », pourquoi ne pas la vendre', type: 'music music' },
      { text: 'Vous ne savez pas', type: 'club' },
      { text: 'Vous n’êtes pas sûr du tout de réussir', type: 'club' },
      { text: 'Vous ne savez pas vraiment, mais ça vous tente', type: 'diamond' },
    ],
  },
  {
    text: 'Qu’est-ce qu’une voix-off pour vous ?',
    answers: [
      { text: 'C’est la grosse voix qu’on entend sur les pubs cinéma', type: 'club' },
      { text: 'C’est un comédien célèbre commentant un documentaire', type: 'diamond club' },
      { text: 'Ce sont les voix de doublage', type: 'club diamond' },
      { text: 'Il y en a partout, d’ailleurs vous pouvez reconnaître certaines voix', type: 'music music' },
      { text: 'C’est vague dans votre esprit, mais ça vous intéresse d’en savoir plus', type: 'diamond' },
    ],
  },
  {
    text: 'Dans le monde de la voix-off, vous vous définiriez comme :',
    answers: [
      { text: 'Un speaker', type: 'diamond' },
      { text: 'Un comédien voix-off', type: 'music' },
      { text: 'Un caméléon', type: 'music music' },
      { text: 'Vous n’en avez aucune idée', type: 'club' },
    ],
  },
  {
    text: 'Être voix-off, pour vous c’est :',
    answers: [
      { text: 'Être son propre patron', type: 'music music' },
      { text: 'Être toujours dirigé par un réalisateur ou producteur', type: 'diamond' },
      { text: 'Juste faire des voix', type: 'club diamond' },
      { text: 'Surtout ne jamais parler marketing, comptabilité ou administration', type: 'club club' },
    ],
  },
  {
    text: 'Une maquette c’est :',
    answers: [
      { text: 'Pour présenter un projet immobilier', type: 'club' },
      { text: 'Pour les chanteurs', type: 'diamond diamond' },
      { text: 'L’outil indispensable des voix-off', type: 'music' },
    ],
  },
  {
    text: 'Pour devenir voix-off, êtes-vous prêt à travailler :',
    answers: [
      { text: '1 heure par jour', type: 'diamond' },
      { text: '2 heures par semaine', type: 'club' },
      { text: 'Plusieurs heures par jour', type: 'music' },
      { text: 'Pas la peine, j’ai une super voix', type: 'club' },
    ],
  },
  {
    text: 'Pour être voix-off :',
    answers: [
      { text: 'Il faut investir du temps et de l’argent', type: 'music music' },
      { text: 'C’est facile, il suffit d’avoir une belle voix', type: 'club diamond' },
      { text: 'Il suffit qu’on vienne vous chercher', type: 'club' },
    ],
  },
  {
    text: 'Si on vous disait : « Demain, rendez-vous au studio à 10 h pour une séance de bande- annonce télé » :',
    answers: [
      { text: 'Vous vous coucheriez tôt', type: 'diamond diamond' },
      { text: 'Vous écouteriez plein de bandes-annonces à la télé', type: 'music' },
      { text: 'Vous feriez la fête', type: 'club' },
    ],
  },
  {
    text: 'Pour vous, parler en public c’est :',
    answers: [
      { text: 'L’enfer', type: 'club' },
      { text: 'Le purgatoire', type: 'diamond' },
      { text: 'Le paradis', type: 'music' },
    ],
  },
  {
    text: 'Est-ce que vous chantez ?',
    answers: [
      { text: 'Tous les jours', type: 'music' },
      { text: 'A l’annonce d’une bonne nouvelle', type: 'diamond' },
      { text: 'Seul, sous la douche', type: 'diamond' },
      { text: 'Jamais', type: 'club' },
    ],
  },
  {
    text: 'Est-ce que vous adorez :',
    answers: [
      { text: 'Le karaoké', type: 'diamond' },
      { text: 'Jouer la comédie', type: 'music' },
      { text: 'Écrire votre journal', type: 'club' },
    ],
  },
  {
    text: 'Aimez-vous lire des histoires aux enfants ?',
    answers: [
      { text: 'Oui, s’ils insistent et que ça les calme', type: 'club' },
      { text: 'Vous adorez ça, et vous mimez tous les personnages', type: 'music' },
      { text: 'Vous aimez bien lire les textes que vous préférez', type: 'diamond' },
    ],
  },
  {
    text: 'Lorsque vous entrez dans une boutique :',
    answers: [
      { text: 'Vous lancez un bonjour jovial', type: 'diamond' },
      { text: 'Vous marmonnez « B’jour » entre vos dents', type: 'club' },
      { text: 'Vous êtes tout simplement poli', type: 'club' },
    ],
  },
  {
    text: 'On dit de vous plutôt :',
    answers: [
      { text: 'Que vous êtes enjoué et aimable', type: 'music' },
      { text: 'Que vous êtes timide mais sympa', type: 'diamond' },
      { text: 'Que l’on ne vous entend pas assez ou jamais', type: 'club' },
    ],
  },
  {
    text: 'Petit déjà, vous amusiez la galerie :',
    answers: [
      { text: 'En imitant l’oncle Fred', type: 'diamond' },
      { text: 'En faisant des grimaces', type: 'club' },
      { text: 'En montant des sketches', type: 'music' },
    ],
  },
  {
    text: 'En société, si vous faites une gaffe :',
    answers: [
      { text: 'Vous avez le mot pour vous rattraper et faire rire', type: 'music' },
      { text: 'Vous aimeriez disparaître', type: 'club' },
      { text: 'Vous trouvez ce que vous auriez dû dire quand il est déjà trop tard', type: 'diamond' },
    ],
  },
  {
    text: 'Parler d’argent pour vous :',
    answers: [
      { text: 'C’est obscène', type: 'club' },
      { text: 'C’est sans problème', type: 'music' },
      { text: 'Oui, si c’est nécessaire', type: 'diamond' },
    ],
  },
  {
    text: 'Question rendez-vous :',
    answers: [
      { text: 'Vous êtes toujours en retard', type: 'club' },
      { text: 'Vous êtes ponctuel comme une horloge', type: 'music' },
      { text: 'Ça dépend du métro', type: 'diamond' },
    ],
  },
  {
    text: 'Question emploi du temps :',
    answers: [
      { text: 'Vous aimez savoir à l’avance ce que vous ferez le mois prochain', type: 'club' },
      { text: 'C’est le bordel', type: 'diamond' },
      { text: 'Vous êtes toujours prêt pour de nouvelles aventures', type: 'music' },
    ],
  },
  {
    text: 'A la veille d’un oral d’examen ou d’un entretien d’embauche :',
    answers: [
      { text: 'Vous comptez sur vos connaissances et vos compétences', type: 'diamond' },
      { text: 'Vous vous fiez à votre irrésistible charme pour vous en sortir', type: 'music' },
      { text: 'Vous angoissez à mort', type: 'club' },
    ],
  },
  {
    text: 'Question médias, vous connaissez :',
    answers: [
      { text: 'Le monde de la radio et les animateurs', type: 'music' },
      { text: 'Le cinéma et les acteurs', type: 'diamond' },
      { text: 'La télé et ses coulisses', type: 'diamond' },
      { text: 'La publicité et le monde des médias', type: 'music' },
    ],
  },
  {
    text: 'La culture générale :',
    answers: [
      { text: 'Ça ne sert à rien pour être voix-off', type: 'club' },
      { text: 'Je m’en sers pour épater la galerie', type: 'diamond' },
      { text: 'C’est essentiel pour ce métier', type: 'music' },
    ],
  },
  {
    text: 'Votre carnet d’adresses :',
    answers: [
      { text: 'C’est le désert', type: 'club' },
      { text: 'Il est plein à craquer', type: 'music' },
      { text: 'La famille, les amis et quelques contacts utiles', type: 'diamond' },
    ],
  },
  {
    text: 'S’il faut faire la conversation à un inconnu :',
    answers: [
      { text: 'Vous êtes un as pour parler de tout et de rien', type: 'music' },
      { text: 'Vive la météo', type: 'diamond' },
      { text: 'Bonjour, bonsoir…', type: 'club' },
    ],
  },
  {
    text: 'Pour vous un métier artistique c’est :',
    answers: [
      { text: 'On verra bien', type: 'diamond' },
      { text: 'Beaucoup de travail', type: 'music' },
      { text: 'De la chance', type: 'club' },
      { text: 'C’est l’aventure', type: 'diamond' },
      { text: 'Du talent et beaucoup de travail', type: 'music' },
    ],
  },
  {
    text: 'La motivation :',
    answers: [
      { text: 'C’est un truc inventé par les psy', type: 'club' },
      { text: 'Depuis tout petit, vous vous montrez très déterminé', type: 'music' },
      { text: 'A vos yeux, tout est possible avec beaucoup d’efforts', type: 'diamond' },
    ],
  },
];

interface ThemeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  darkMode: false,
  toggleDarkMode: () => {},
});

function useTheme() {
  return useContext(ThemeContext);
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [result, setResult] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = type;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const answerCounts = { club: 0, diamond: 0, music: 0 };
    answers.forEach((answer) => {
      if (answer) {
        answerCounts[answer] = (answerCounts[answer] || 0) + 1;
      }
    });

    const { club, diamond, music } = answerCounts;

    if (club > diamond && club > music) {
      setResult(
        'De prime abord, on pourrait penser que l’idée de devenir voix-off vous a traversé l’esprit, disons plutôt par hasard. Dans ce métier, il faut certes une belle voix et/ou une voix singulière, un minimum de talent et de facilité à «créer des voix », mais surtout un maximum de travail. Donc tout est possible si vous vous montrez très motivés. Votre conviction vous apportera une aide décisive, surtout si vous y ajoutez de la lucidité. Sachez cependant que vous allez devoir travailler intensivement. Pour commencer, je vous invite à faire le programme d’entraînement sur trois semaines (complet) à la fin de ce guide. Entraînez-vous à la lecture et à l’enregistrement de votre voix, apprenez à optimiser vos qualités vocales – et notamment à poser votre voix. Écoutez des voix-off à la télé, à la radio ou sur les sites Internet spécialisés. Informez-vous sur le métier en lisant et relisant ce guide. Cultivez votre sens relationnel. Ensuite, refaites ce même test dans un mois. Je suis certain que vous constaterez déjà de nombreuses améliorations. Surtout, vous saurez si votre souhait peut devenir réalité et si ce métier est fait pour vous. Vous avez tout à apprendre, mais l’effort en vaut peut-être la chandelle pour vous ! Essayez, tout simplement. Seuls ceux qui essayent peuvent progresser jusqu’à réaliser leur rêve…'
      );
    } else if (diamond > club && diamond > music) {
      setResult(
        'Pour vous, la voix-off, c’est plus qu’un hobby, c’est un métier que vous avez vraiment envie de pratiquer. Vous êtes déjà conscient de vos qualités vocales et vous ne demandez qu’à perfectionner votre instrument. En travaillant très régulièrement, vous allez faire de très nets progrès. Appuyez-vous sur votre force de motivation et vos nombreuses capacités. Suivez le guide ! Analysez vos qualités et vos lacunes, définissez vos objectifs réels et faites les exercices que je vous propose. Votre réussite ne dépend que de vous.'
      );
    } else {
      setResult(
        'D’ores et déjà, vous avez fait des voix, ou vous connaissez le monde de la voix-off et vous semblez d’ores et déjà posséder « l’état d’esprit voix-off » ! Vous avez toutes les qualités requises pour devenir un véritable pro. Alors ne laissez pas passer votre chance ! Vous ne devez plus avoir qu’un seul but : travailler pour être le meilleur. Le succès vous attend'
      );
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(''));
    setResult(null);
  };

  const theme = darkMode ? 'dark' : 'light';

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} py-6 flex flex-col justify-center sm:py-12 transition-colors duration-300`}>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-purple-500 to-purple-800' : 'bg-gradient-to-r from-blue-300 to-blue-600'} shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl transition-colors duration-300`}></div>
          <div className={`relative px-4 py-10 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} shadow-lg sm:rounded-3xl sm:p-20 transition-colors duration-300`}>
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Découverte de la Voix-Off</h1>
                <button onClick={toggleDarkMode} className="focus:outline-none">
                  {darkMode ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-gray-500" />}
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {result ? (
                  <Result resultText={result} onReset={resetQuiz} />
                ) : (
                  <>
                    <Question
                      question={questions[currentQuestion]}
                      onAnswer={handleAnswer}
                      questionNumber={currentQuestion + 1}
                      totalQuestions={questions.length}
                      selectedAnswer={answers[currentQuestion]}
                    />
                    {currentQuestion > 0 && (
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                        onClick={goToPreviousQuestion}
                      >
                        Précédent
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

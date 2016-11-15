var program = require('commander');

var chance = require('chance').Chance();

var wrap = require('word-wrap');

//some words, which seemed 'unnatural', were excluded from the list, and a few more words and categories were added in order to phrase the sentences better

const first = ['DEAREST','BELOVED','SWEETEST','ETERNAL'];

const sweet = ['MOON','SUN','STAR','HONEY','SUNSHINE','SNOWFLAKE','LOVE','WORLD' , 'UNIVERSE' ,'LIFE','DOVE','LITTLE BIRD'];

const time = ['WHEN','WHENEVER','EVERYTIME','AS SOON AS','EACH TIME','ALWAYS WHEN','ANYTIME'];

const adjectives = ['ADORABLE', 'DEAR', 'CHARMING', 'LOVEABLE',  'LOVING', 'PASSIONATE', 'PRECIOUS', 'SWEET', 'TENDER'];

const gerunds = ['ADORATION',  'DEVOTION',  'LONGING',  'YEARNING'];

const nouns = ['CHARM', 'DESIRE','HEART' ,'LOVE', 'LUST', 'PASSION', 'WISH','BEAUTY'];

const adverbs = ['AFFECTIONATELY', 'ANXIOUSLY', 'BREATHLESSLY', 'BURNINGLY', 'EAGERLY',  'FONDLY', 'IMPATIENTLY', 'LOVINGLY', 'PASSIONATELY', 'SEDUCTIVELY', 'TENDERLY'];

const verbs = ['ADORES', 'ATTRACTS', 'CHERISHES', 'CLINGS TO', 'DESIRES', 'HOPES FOR', 'HUNGERS FOR',  'LONGS FOR', 'LOVES', 'LUSTS AFTER', 'SIGHS FOR', 'TEMPTS', 'THIRSTS FOR', 'TREASURES', 'WANTS', 'WISHES',  'YEARNS FOR'];

const infinitive = ['SEE', 'TOUCH', 'REMEMBER', 'DREAM OF'];

const bodyparts = ['EYES','ARMS','WORDS','KISSES','WHISPERS','SMILES'];

const plurals = ['ROSES','STARS','FLOWERS','CANDY'];

const superlative = ['SWEETEST','LOVELIEST','PRETTIEST','MOST BEAUTIFUL','MOST ENCHANTING','MOST MESMERIZING','RAREST','MOST PRECIOUS','MOST WONDERFUL','DEAREST'];

const end = ['FOREVER', 'ONLY', 'TRULY', 'JUST', 'ALWAYS'];

//if the user didn't input any values, the defaults are set to 4 sentences and a width of 60 characters

var s=4,w=60;

program
  .version('0.0.1')
  .option('-w, --width [value]', 'Width of the letter in characters')
  .option('-s, --sentences [value]', 'Number of sentences')
  .parse(process.argv);
  
// if user inputed values, they are assigned  
  
if(program.width)
    w = program.width;
if(program.sentences)
    s = program.sentences;
  

function choice(array){
        var txt;
	var index = chance.natural({'min':0,'max':array.length-1});
        txt=array[index]+' ';
        //in order to avoid repetition, when a word is used it is deleted from the array, but only if there are more options then sentences
        if(s<=array.length-1){
            array[index]=array[array.length-1];  
            array.length--;
        }
        return txt;
}


//a simple function which returns short phrases
function short(){
	return maybe(adjectives)+choice(sweet);
}

//the function for chance, if you sometimes want to include and sometimes omit a word, usually adverbs or adjectives, like we did in class
function maybe(array){
	if(chance.bool()){
		return choice(array);
	}
	else{
		return "";
	}
}

//this function returns sentences with the same synthax as the function we used in class
function long(){
	return 'MY '+choice(gerunds)+maybe(adverbs)+choice(verbs)+'YOUR '+maybe(adjectives) + choice(nouns).trim()+'. ';
}

//this function is for 'timed' sentences - which have a time reference in the begining
function timed(){
    return choice(time)+'I '+choice(infinitive)+'YOUR '+choice(superlative)+choice(bodyparts)+ ' MY '+ choice(nouns)+ choice(verbs)+'YOU'+'. ';
}

//this function returns sentences that create comparison
function comparison(){
    return "YOUR " + choice(adjectives) + choice(bodyparts)  +"ARE LIKE THE "+choice(superlative)+maybe(adjectives)+choice(plurals).trim()+". ";
}

//and this one is for short sentences which express belonging
function belonging(){
    return "YOU ARE MY " + maybe(superlative)+short().trim()+". ";
}

var text='';

if(chance.bool())
        text='MY ';

var i;

//this is the opening of the letter
text+= choice(first) + choice(sweet).trim() + ',\n'; 


//this loop adds as many sentences as necessary to the letter,picking them randomly

for(i=0;i<s-1;i++){
    switch(chance.natural({'min':0,'max':3})){
        case 0:
            text+=timed();
            break;
        case 1:
            text+=long();
            break;
        case 2:
            text+=comparison();
        case 3:
            text+=belonging();
    }
}
    
text+= '\n' + choice(end) + 'YOURS, LENKA'; // this is the end of the letter


console.log(wrap(text,{'width':w})); // this is printing and formatting

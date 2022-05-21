const lyrics = {0:`Lucifer, we are here
For your praise, evil one
Our conjuration sings infernal salms
And smear the smudge in bleeding palms
Siamo con clavi, siamo con Dio
Siamo con il nostro Dio scuro
Demigod, our task
Behind mask, chosen son
Oh, you rebel chief, destroyer of the earth
Rise from precipice through birth
Satanas, we are one
Out of three, trinity
Siamo con clavi, siamo con Dio
Siamo con il nostro Dio scuro
Siamo con clavi, siamo con Dio
Siamo con il nostro Dio scuro
Siamo con clavi, siamo con Dio
Siamo con il nostro Dio scuro
Siamo con clavi, siamo con Dio
Siamo con il nostro Dio scuro`,
'1':`The Devil's power is the greatest one
When his' and hers' holiest shun the sun
A temptress smitten by the blackest force
A vicar bitten blind in intercourse
The witch hammer struck her down
On our Sabbath she's unbound
'Tis the night of the witch, 'tis the night of the witch tonight
And the vengeance is hers for as long as she stands by him
'Tis the night of the witch, 'tis the night of the witch tonight
And the vengeance is hers for as long as she stands by him
"All witchcraft comes
From carnal lust
Which is in women insatiable"
A moon shone bright above her trial
As flames ate through her body defiled
The witch hammer struck her down
On our Sabbath she's unbound
'Tis the night of the witch, 'tis night of the witch tonight
And the vengeance is hers for as long as she stands by him
'Tis the night of the witch, 'tis the night of the witch tonight
And the vengeance is hers for as long as she stands by him`,
'2':`Underneath the moonlight of old Hungarian skies
Buried in the blood drenched Earth
These barren lands of ice
She was an evil woman with an evil old soul
Piercing eyes emotionless
A heart so black and cold
Elizabeth, in the chasm where was my soul
Forever young, Elizabeth Bathorii in the castle of your death
You're still alive, Elizabeth
Her pact with Satan
Her disposal of mankind
Her acts of cruelty and her lust for blood
Makes her one of us!
Our ancient countess was refused her desires will
To bathe in pure fresh blood
She'd peasant virgins killed
Elizabeth, in the chasm where was my soul
Forever young, Elizabeth Bathorii in the castle of your death
You're still alive, Elizabeth
Elizabeth, in the chasm where was my soul
Forever young, Elizabeth Bathorii in the castle of your death
You're still alive, Elizabeth`,
'3':
`Tonight we're summoned for a divine cause
Remembrance, no
But for their future loss
This chapel of ritual
Smells of dead human sacrifices
From the altar
Beduins and nomads
Carried through the times
Through pestilences and famines
These ancient scrolls of rhymes
Our fallen angel vexed was banished from the sky
Recite now from the text pray for all to die
This chapel of ritual
Smells of dead human sacrifices from the altar bed
On this night of ritual, yeah, invoking our master
To procreate the unholy bastard
Our father
Who art in hell unhallowed be thy name
Cursed be the sons and daughters
Of thine nemesis whom are to blame
Thy kingdom come nema
Tonight we summoned for his unholy being
Now celebrate the end
This chapel of ritual
Smells of dead human sacrifices from the altar bed
And on this night of ritual invoking our master
To procreate the unholy bastard`,
'4':`Say, can you see the cross?
Inverted solemnly
Symbol for the goat
Of a thousand young
Six six six
Evoke the king of hell
Strike the death knell
Death knell
Say, can you hear the chimes?
Tolls now for the end
Bells call out their doom
As victor reaches womb
Sex sex sex
Recieve the beast of evil
Of evil...
Can you say his name?
Carrier of the light
Legions of this seed
A child a spouce will feed
S-A-T-A-N
Under spell
of death knell
Death knell`,
'5':`Clad in cloak
A secretive nun
Bearing the old ones' bastard son
Varucose phallos
Obsessed and poised her
Cast a veil of dusk upon the cloister
Prime mover
Maternal slave
With child of her grave
Mother
Filth in her womb
Father
Waiting in tomb
Sathanas
AntiChrist
Spiritus Non Sancti
Selected heir
Machinary insect
Bloodline of the dark architect
Toxic blood
Of not known birth
Antichrist will walk the earth
Prime mover
Maternal slave
With child of her grave`,
'6':`Believe in one God do we
Satan almighty
The uncreator of heaven and soil
And the invisible and the visible
And in his son begotten of father
By whom all things will be unmade
Who for man and his damnation
Incarnated rise up from hell
From sitteth on the left hand of his father
From thence he shall come to judge
Out of one substance with Satan
Whose kingdom shall haveth no end
Hear our Satan prayer, our anti-Nicene creed
Hear our Satan prayer, for the coming of seed
Hear our Satan prayer, our anti-Nicene creed
Hear our Satan prayer, for the cumming of seed
Unholy ghost, overlord
And taker of life
Hear our Satan prayer, our anti-Nicene creed
Hear our Satan prayer, for the coming of seed
Hear our Satan prayer, our anti-Nicene creed
Hear our Satan prayer, for the coming of seed
Hear our Satan prayer, our anti-Nicene creed
Hear our Satan prayer, for the coming of seed
Hear our Satan prayer, our anti-Nicene creed
Hear our Satan prayer`};




function getRandomWord(lyric)
{
    const randNum = Math.floor(Math.random() * Object.keys(lyric).length)
    let song = lyric[randNum];
    
    song =  song.replaceAll(',', '').split(/\n|\s/);
   return song[Math.floor(Math.random() * song.length)];
    
}

function getRandomIpsum(lyric)
{
    const outputContainer = document.querySelector('.sentences');
    outputContainer.innerHTML = '';
    const option = document.querySelector('#select').value;
    let phrases = '';
    const breakPointNum = parseInt(document.querySelector('input#quantity').value);
    if(option === 'words')
    {
      phrases = getLine(lyric, breakPointNum)
    }
    else 
    {
        let paragraph = '';
        let linehWordQuantity = Math.floor(Math.random() * (56 - 40)) + 40;
        for(let i = 0; i < breakPointNum; i++)
        {
            paragraph = getLine(lyrics, linehWordQuantity);
            phrases =  phrases+ paragraph;

        }
       
    }
    const p = document.createElement('p');
    p.innerText = phrases;
    outputContainer.appendChild(p);
}


function getLine(lyric, wordsNum)
{
    let phrases = '';
     for(let i = 0; i < wordsNum; i++)
         {
             if(phrases.length % 20 === 0)
             {
                phrases+='\n';
             } 
        let word = getRandomWord(lyric);
        phrases = phrases + word + ' ';
         }

         return phrases;
}

const btn  = document.querySelector('.btn');
getRandomIpsum(lyrics);
btn.addEventListener('click', getRandomIpsum.bind(null, lyrics));
